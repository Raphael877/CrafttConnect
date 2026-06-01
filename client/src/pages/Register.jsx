import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, AlertCircle, Hammer, Users } from 'lucide-react';
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
  max-width: 500px;
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const RoleSelection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RoleCard = styled.div`
  padding: 1rem;
  border: 2px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: ${({ active, theme }) => active ? 'rgba(99, 102, 241, 0.1)' : 'transparent'};
  transition: all 0.2s ease;

  svg {
    color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textMuted};
  }

  span {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ active, theme }) => active ? theme.colors.text : theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0 1rem;

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
  &:hover { background: ${({ theme }) => theme.colors.primaryHover}; transform: translateY(-2px); }
  &:disabled { opacity: 0.7; }
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  a { color: ${({ theme }) => theme.colors.primary}; font-weight: 600; }
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

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (role) => setFormData({ ...formData, role });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Create Account</Title>
        <Subtitle>Join CraftConnect and bridge the gap</Subtitle>

        {error && <ErrorMsg><AlertCircle size={18} />{error}</ErrorMsg>}

        <Form onSubmit={handleSubmit}>
          <RoleSelection>
            <RoleCard active={formData.role === 'customer'} onClick={() => handleRoleChange('customer')}>
              <Users size={24} />
              <span>Customer</span>
            </RoleCard>
            <RoleCard active={formData.role === 'artisan'} onClick={() => handleRoleChange('artisan')}>
              <Hammer size={24} />
              <span>Artisan</span>
            </RoleCard>
          </RoleSelection>

          <InputWrapper>
            <InputField>
              <User size={18} />
              <input name="name" placeholder="Full Name" onChange={handleChange} required />
            </InputField>
          </InputWrapper>

          <InputWrapper>
            <InputField>
              <Mail size={18} />
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
            </InputField>
          </InputWrapper>

          <InputWrapper>
            <InputField>
              <Lock size={18} />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </InputField>
          </InputWrapper>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </SubmitButton>
        </Form>

        <SwitchText>
          Already have an account? <Link to="/login">Log in</Link>
        </SwitchText>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;
