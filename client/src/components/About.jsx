import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Users, Star, CheckCircle, Shield, ShieldCheck, Lock, HeartHandshake, ArrowRight } from 'lucide-react';

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(
    180deg, 
    ${({ theme }) => theme.colors.background} 0%, 
    rgba(30, 41, 59, 0.4) 50%, 
    ${({ theme }) => theme.colors.background} 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ContentColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const SectionBadge = styled.span`
  align-self: flex-start;
  background: rgba(99, 102, 241, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1.2rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(99, 102, 241, 0.2);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 2.75rem);
  line-height: 1.2;
  font-weight: 700;
  
  span {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.1rem;
  line-height: 1.7;
`;

const ValueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 1rem 0;
`;

const ValueItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .icon-wrapper {
    background: rgba(139, 92, 246, 0.1);
    color: ${({ theme }) => theme.colors.accent};
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(139, 92, 246, 0.2);
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .text-content {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
      color: ${({ theme }) => theme.colors.text};
    }
    p {
      color: ${({ theme }) => theme.colors.textMuted};
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

const LearnMoreButton = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryHover};

    svg {
      transform: translateX(5px);
    }
  }
`;

const GridColumn = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2.5rem 2rem;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.blue {
      background: rgba(99, 102, 241, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }
    &.pink {
      background: rgba(236, 72, 153, 0.1);
      color: ${({ theme }) => theme.colors.secondary};
    }
    &.violet {
      background: rgba(139, 92, 246, 0.1);
      color: ${({ theme }) => theme.colors.accent};
    }
    &.emerald {
      background: rgba(16, 185, 129, 0.1);
      color: ${({ theme }) => theme.colors.success};
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .stat-number {
    font-size: 2.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  .stat-label {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <GridColumn
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <StatCard
            whileHover={{ scale: 1.02 }}
          >
            <div className="stat-icon blue">
              <Users />
            </div>
            <div className="stat-number">15,000+</div>
            <div className="stat-label">Verified Artisans</div>
          </StatCard>

          <StatCard
            whileHover={{ scale: 1.02 }}
            // style={{ marginTop: '2rem' }}
          >
            <div className="stat-icon pink">
              <Star />
            </div>
            <div className="stat-number">4.9/5.0</div>
            <div className="stat-label">Average rating</div>
          </StatCard>

          <StatCard
            whileHover={{ scale: 1.02 }}
            
          >
            <div className="stat-icon violet">
              <CheckCircle />
            </div>
            <div className="stat-number">98.7%</div>
            <div className="stat-label">Job success rate</div>
          </StatCard>

          <StatCard
            whileHover={{ scale: 1.02 }}
            // style={{ marginTop: '2rem' }}
          >
            <div className="stat-icon emerald">
              <Shield />
            </div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Escrow safety</div>
          </StatCard>
        </GridColumn>

        <ContentColumn
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionBadge>About Us</SectionBadge>
          <Title>
            Connecting You to <span>Trustworthy Local Expertise</span>
          </Title>
          <Paragraph>
            Finding reliable, top-tier artisans shouldn't feel like a gamble. CraftConnect is Nigeria's premium, direct-to-artisan marketplace designed to match highly skilled local experts with quality-driven clients, ensuring professionalism and absolute peace of mind.
          </Paragraph>

          <ValueList>
            <ValueItem>
              <div className="icon-wrapper">
                <ShieldCheck />
              </div>
              <div className="text-content">
                <h4>Vetted & Background Checked</h4>
                <p>Every single artisan undergoes strict verification, skill audits, and local background checks before they join.</p>
              </div>
            </ValueItem>

            <ValueItem>
              <div className="icon-wrapper">
                <Lock />
              </div>
              <div className="text-content">
                <h4>Secure Escrow Payment</h4>
                <p>Your money is fully protected. Funds are only released to the artisan once you confirm the job is successfully completed.</p>
              </div>
            </ValueItem>

            <ValueItem>
              <div className="icon-wrapper">
                <HeartHandshake />
              </div>
              <div className="text-content">
                <h4>Satisfaction Guaranteed</h4>
                <p>We pride ourselves on excellence. Our support team is always available to handle arbitrations and ensure quality.</p>
              </div>
            </ValueItem>
          </ValueList>

          <LearnMoreButton>
            {/* Learn more about our standards <ArrowRight size={18} /> */}
          </LearnMoreButton>
        </ContentColumn>
      </Container>
    </AboutSection>
  );
};

export default About;
