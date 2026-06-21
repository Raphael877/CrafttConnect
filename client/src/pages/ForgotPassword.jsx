import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import API_URL from "../config";

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
  font-family: ${({ theme }) => theme.fonts.heading || "inherit"};
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

const DevBlock = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  text-align: left;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  box-sizing: border-box;

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 0.25rem 0;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0 0 0.75rem 0;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    word-break: break-all;
    text-decoration: underline;
    font-weight: 500;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devLink, setDevLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email,
      });
      setSubmitted(true);
      if (data.resetUrl) {
        setDevLink(data.resetUrl);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
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
            <Title>Forgot Password</Title>
            <Subtitle>
              Enter the email address associated with your account, and we will
              help you reset your password.
            </Subtitle>

            {error && (
              <ErrorMsg>
                <AlertCircle size={18} />
                {error}
              </ErrorMsg>
            )}

            <Form onSubmit={handleSubmit}>
              <InputWrapper>
                <Label>Email Address</Label>
                <InputField>
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputField>
              </InputWrapper>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Sending link..." : "Send Reset Link"}
              </SubmitButton>
            </Form>
          </>
        ) : (
          <SuccessCard>
            <SuccessIconWrapper>
              <CheckCircle size={36} />
            </SuccessIconWrapper>
            <Title>Check Your Email</Title>
            <Subtitle>
              If an account exists for <strong>{email}</strong>, we have sent a
              link to reset your password.
            </Subtitle>

            {devLink && (
              <DevBlock>
                <h4>Dev Mode Helper</h4>
                <p>
                  Since we are in development and SMTP mailing is simulated,
                  here is your generated reset link:
                </p>
                <a href={devLink}>{devLink}</a>
              </DevBlock>
            )}
          </SuccessCard>
        )}

        <BackToLogin to="/login">
          <ArrowLeft size={16} />
          Back to Sign In
        </BackToLogin>
      </AuthCard>
    </AuthContainer>
  );
};

export default ForgotPassword;
