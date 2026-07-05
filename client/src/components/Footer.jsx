import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom inline SVG icons for brands to avoid lucide-react brand icons dependency issues
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FooterContainer = styled.footer`
  background: #090d16;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6rem 2rem 2rem;
  position: relative;
  z-index: 5;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1.2fr 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    &.newsletter-col {
      grid-column: span 3;
    }
  }

  @media (max-width: 768px) {
    &.newsletter-col {
      grid-column: span 2;
    }
  }

  @media (max-width: 480px) {
    &.newsletter-col {
      grid-column: span 1;
    }
  }
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 700;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const SocialsList = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: all 0.3s ease;

  &:hover {
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Heading = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  display: flex;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.3rem;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 0.6rem 1rem;
  flex: 1;
  font-size: 0.95rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SubmitBtn = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 42px;
  height: 42px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SuccessText = styled(motion.p)`
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  margin-top: 0.25rem;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  width: 100%;
  margin-bottom: 2rem;
  opacity: 0.5;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    transition: color 0.2s ease;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');

      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <FooterContainer>
      <Container>
        <Column>
          <Logo to="/">
            Craft<span>Connect</span>
          </Logo>
          <Description>
            Connecting elite, certified Nigerian artisans with quality-oriented homeowners and businesses. Safe payments, reliable results, and expert execution guaranteed.
          </Description>
          <SocialsList>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
              <LinkedinIcon />
            </SocialIcon>
          </SocialsList>
        </Column>

        <Column>
          <Heading>Platform</Heading>
          <LinkList>
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/discovery">Find Artisans</FooterLink></li>
            <li><FooterLink to="/#about">About Us</FooterLink></li>
            <li><FooterLink to="/#how-it-works">How It Works</FooterLink></li>
            <li><FooterLink to="/dashboard">Artisan Portal</FooterLink></li>
          </LinkList>
        </Column>

        <Column>
          <Heading>Popular Services</Heading>
          <LinkList>
            <li><FooterLink style={{transform: "none", transition: "none", color: "#94A3B8"}}>Electrical Repairs</FooterLink></li>
            <li><FooterLink style={{transform: "none", transition: "none", color: "#94A3B8"}}>Carpentry & Joinery</FooterLink></li>
            <li><FooterLink style={{transform: "none", transition: "none", color: "#94A3B8"}}>Bespoke Tailoring</FooterLink></li>
            <li><FooterLink style={{transform: "none", transition: "none", color: "#94A3B8"}}>Plumbing Installation</FooterLink></li>
          </LinkList>
        </Column>

        <Column className="newsletter-col">
          <Heading>Subscribe to newsletter</Heading>
          <Description>
            Join our mailing list to receive verified artisan updates, seasonal discounts, and smart maintenance tips.
          </Description>
          <NewsletterForm onSubmit={handleSubscribe}>
            <InputWrapper>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              <SubmitBtn
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
              >
                {isSubscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </SubmitBtn>
            </InputWrapper>
            <AnimatePresence>
              {isSubscribed && (
                <SuccessText
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <Check size={14} /> Subscribed successfully!
                </SuccessText>
              )}
            </AnimatePresence>
          </NewsletterForm>
        </Column>
      </Container>

      <Divider />

      <BottomRow>
        <p>© 2026 CraftConnect. All rights reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          Designed with ❤️ in Nigeria.
        </p>
        <LegalLinks>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </LegalLinks>
      </BottomRow>
    </FooterContainer>
  );
};

export default Footer;
