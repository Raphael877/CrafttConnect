import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(
    180deg, 
    ${({ theme }) => theme.colors.background} 0%, 
    rgba(30, 41, 59, 0.4) 100%
  );
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: flex-start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const InfoColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Badge = styled.span`
  align-self: flex-start;
  background: rgba(236, 72, 153, 0.1);
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0.5rem 1.2rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(236, 72, 153, 0.2);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  
  span {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.1rem;
  line-height: 1.7;
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(8px);
  }

  .icon-box {
    width: 52px;
    height: 52px;
    background: rgba(99, 102, 241, 0.1);
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }

  .details {
    span {
      display: block;
      color: ${({ theme }) => theme.colors.textMuted};
      font-size: 0.85rem;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 0.25rem;
    }
    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.05rem;
      font-weight: 500;
    }
  }
`;

const FormColumn = styled(motion.div)`
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 28px;
  padding: 3rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 1.2rem;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
    background: rgba(15, 23, 42, 0.8);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Textarea = styled.textarea`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 1.2rem;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
    background: rgba(15, 23, 42, 0.8);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  color: white;
  padding: 1.1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessMsg = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: ${({ theme }) => theme.colors.success};
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  
  .icon {
    background: rgba(16, 185, 129, 0.15);
    padding: 0.4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success banner after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1800);
  };

  return (
    <Section id="contact">
      <Container>
        <InfoColumn
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Badge>Contacts</Badge>
          <Title>
            Let's Talk About Your <span>Service Needs</span>
          </Title>
          <Description>
            Have feedback for us? Professional partnership requests? Or looking to recruit massive teams of reliable artisans for commercial and industrial projects? Our help desk is ready 24/7.
          </Description>

          <ContactInfoList>
            <ContactCard whileHover={{ scale: 1.01 }}>
              <div className="icon-box">
                <Mail />
              </div>
              <div className="details">
                <span>Direct Mailbox</span>
                <p>support@craftconnect.ng</p>
              </div>
            </ContactCard>

            <ContactCard whileHover={{ scale: 1.01 }}>
              <div className="icon-box">
                <Phone />
              </div>
              <div className="details">
                <span>Phone</span>
                <p>+234 916 1816 216</p>
              </div>
            </ContactCard>

            <ContactCard whileHover={{ scale: 1.01 }}>
              <div className="icon-box">
                <MapPin />
              </div>
              <div className="details">
                <span>Corporate HQ</span>
                <p>Ajegunle, Lagos State</p>
              </div>
            </ContactCard>
          </ContactInfoList>
        </InfoColumn>

        <FormColumn
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence>
            {isSuccess && (
              <SuccessMsg
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="icon">
                  <Check size={20} />
                </div>
                <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
              </SuccessMsg>
            )}
          </AnimatePresence>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="E.g. Adankpa Raphael"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E.g. ralphpaul877@gmail.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What can we help you with?"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Your Message *</Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe your request or question..."
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
              <Send size={18} />
            </SubmitButton>
          </Form>
        </FormColumn>
      </Container>
    </Section>
  );
};

export default Contact;
