import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import API_URL from '../config';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

const AuthCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.heading || 'inherit'};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0 1rem;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  input {
    background: transparent;
    border: none;
    color: white;
    padding: 0.8rem;
    width: 100%;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: ${({ theme }) => theme.colors.error};
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const SuccessCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SuccessIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.1);
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const BackToLogin = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/auth/reset-password/${token}`, { password });
      setSubmitted(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!submitted ? (
          <>
            <Title>Reset Password</Title>
            <Subtitle>Enter your new password below to secure your account.</Subtitle>

            {error && (
              <ErrorMsg>
                <AlertCircle size={18} />
                {error}
              </ErrorMsg>
            )}

            <Form onSubmit={handleSubmit}>
              <InputWrapper>
                <Label>New Password</Label>
                <InputField>
                  <Lock size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputField>
              </InputWrapper>

              <InputWrapper>
                <Label>Confirm New Password</Label>
                <InputField>
                  <Lock size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </InputField>
              </InputWrapper>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Resetting password...' : 'Reset Password'}
              </SubmitButton>
            </Form>
          </>
        ) : (
          <SuccessCard>
            <SuccessIconWrapper>
              <CheckCircle size={36} />
            </SuccessIconWrapper>
            <Title>Password Reset Successful</Title>
            <Subtitle>
              Your password has been successfully updated. Redirecting you to the sign-in page in a few seconds...
            </Subtitle>
            <BackToLogin to="/login">
              <ArrowLeft size={16} />
              Go to Sign In now
            </BackToLogin>
          </SuccessCard>
        )}

        {!submitted && (
          <BackToLogin to="/login">
            <ArrowLeft size={16} />
            Back to Sign In
          </BackToLogin>
        )}
      </AuthCard>
    </AuthContainer>
  );
};

export default ResetPassword;
