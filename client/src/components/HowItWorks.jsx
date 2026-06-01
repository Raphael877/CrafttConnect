import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, MessageSquare, ShieldCheck, Award } from 'lucide-react';

const Section = styled.section`
  padding: 8rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  top: 30%;
  left: -10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
`;

const DecorativeCircleRight = styled.div`
  position: absolute;
  bottom: 10%;
  right: -10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const Badge = styled.span`
  background: rgba(139, 92, 246, 0.1);
  color: ${({ theme }) => theme.colors.accent};
  padding: 0.5rem 1.2rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(139, 92, 246, 0.2);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  
  span {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    
    .step-number {
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .step-icon-box {
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }

  .step-number {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    font-size: 2.5rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.04);
    font-family: ${({ theme }) => theme.fonts.heading};
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <Search />,
      title: 'Find local experts',
      description: 'Search by category or location to discover vetted local artisans with verified ratings and transparent portfolios.',
    },
    {
      number: '02',
      icon: <MessageSquare />,
      title: 'Chat & Align',
      description: 'Instantly chat with artisans in real-time. Share project files, explain details, and get exact quotes.',
    },
    {
      number: '03',
      icon: <ShieldCheck />,
      title: 'Secure Escrow',
      description: 'Deposit payment into our secure escrow vault. Your funds are held safely and only released when the job is done.',
    },
    {
      number: '04',
      icon: <Award />,
      title: 'Job Completed',
      description: 'Approve the completed milestone to release payment. Leave reviews and star ratings to support top excellence.',
    },
  ];

  return (
    <Section id="how-it-works">
      <DecorativeCircle />
      <DecorativeCircleRight />
      <Container>
        <Header>
          <Badge>How It Works</Badge>
          <Title>
            Simple, Transparent, and <span>100% Secure</span>
          </Title>
          <Subtitle>
            We've removed the stress of hiring home and commercial service providers. Get professional work done in just a few clicks.
          </Subtitle>
        </Header>

        <Grid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {steps.map((step, idx) => (
            <StepCard
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon-box">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </StepCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default HowItWorks;
