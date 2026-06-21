import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, MapPin, Hammer, Zap, Scissors, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), 
              url('/craftconnect_hero_bg_1780144915056.png');
  background-size: cover;
  background-position: center;
  text-align: center;
`;

const HeroContent = styled(motion.div)`
  max-width: 900px;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-weight: 800;
  
  span {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    background-clip: padding-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.15rem);
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(12px);
  padding: 0.5rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  gap: 0.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.8rem 1rem;
  gap: 0.8rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 600px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  input {
    background: transparent;
    border: none;
    color: white;
    width: 100%;
    font-size: 1rem;
    outline: none;
    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const CategoriesSection = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  .icon {
    width: 60px;
    height: 60px;
    background: rgba(99, 102, 241, 0.1);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    svg {
      color: ${({ theme }) => theme.colors.primary};
      width: 30px;
      height: 30px;
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Home = () => {
  const categories = [
    { title: 'Electrical', icon: <Zap />, description: 'Expert electricians for wiring, repairs, and installations.' },
    { title: 'Carpentry', icon: <Hammer />, description: 'Professional carpenters for furniture, doors, and roofing.' },
    { title: 'Tailoring', icon: <Scissors />, description: 'Bespoke fashion designers and master tailors.' },
    { title: 'Plumbing', icon: <Droplets />, description: 'Skilled plumbers for pipes, leaks, and drainage systems.' },
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>
            Connect with Nigeria's <span>Best Artisans</span>
          </Title>
          <Subtitle>
            The premium marketplace to find, hire, and manage professional services. 
            In Nigeria, we bridge the gap between quality and reliability.
          </Subtitle>

          <SearchContainer>
            <InputGroup>
              <Search size={20} />
              <input type="text" placeholder="What service are you looking for?" />
            </InputGroup>
            <InputGroup>
              <MapPin size={20} />
              <input type="text" placeholder="Enter state or city" />
            </InputGroup>
            <SearchButton>Search</SearchButton>
          </SearchContainer>
        </HeroContent>
      </HeroSection>

      <CategoriesSection>
        <SectionHeader>
          <SectionTitle>Popular Categories</SectionTitle>
          <p>Explore our most requested services and find the right expert for your project.</p>
        </SectionHeader>

        <CategoriesGrid>
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      <About />
      <HowItWorks />
      <Contact />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
