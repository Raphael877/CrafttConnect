import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Hammer, 
  Zap, 
  Scissors, 
  Droplets,
  Paintbrush,
  Wrench,
  Tv,
  Flame,
  Briefcase
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.8rem 1rem;
  gap: 0.8rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:focus-within {
    background: rgba(99, 102, 241, 0.03);
    border-color: ${({ theme }) => theme.colors.primary};
  }

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

const DropdownList = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  list-style: none;
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 0.5rem 0;

  @media (max-width: 600px) {
    top: calc(100% + 4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color 0.2s ease;
  }

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    color: white;
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const DropdownHeader = styled.li`
  padding: 0.4rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 0.3rem;
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

const SKILLS = [
  "Electrician",
  "Carpenter",
  "Tailor",
  "Plumber",
  "Painter",
  "Mechanic",
  "Shoe Cobbler",
  "Dstv Installer",
  "Hair Stylist",
  "Welder"
];

const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", 
  "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", 
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", 
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const getSkillIcon = (skill) => {
  switch (skill.toLowerCase()) {
    case 'electrician': return <Zap size={16} />;
    case 'carpenter': return <Hammer size={16} />;
    case 'tailor': return <Scissors size={16} />;
    case 'plumber': return <Droplets size={16} />;
    case 'painter': return <Paintbrush size={16} />;
    case 'mechanic': return <Wrench size={16} />;
    case 'dstv installer': return <Tv size={16} />;
    case 'hair stylist': return <Scissors size={16} />;
    case 'welder': return <Flame size={16} />;
    default: return <Briefcase size={16} />;
  }
};

const Home = () => {
  const navigate = useNavigate();
  
  const [serviceSearch, setServiceSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const serviceRef = useRef(null);
  const locationRef = useRef(null);

  // Close dropdowns on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setShowServiceDropdown(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation & search trigger on Enter
  const handleKeyDown = (e, type) => {
    if (e.key === 'Escape') {
      if (type === 'service') setShowServiceDropdown(false);
      if (type === 'location') setShowLocationDropdown(false);
      e.target.blur();
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (serviceSearch.trim()) {
      // If it matches a skill option, pass as exact skill filter
      const matchedSkill = SKILLS.find(s => s.toLowerCase() === serviceSearch.trim().toLowerCase());
      if (matchedSkill) {
        params.set('skill', matchedSkill);
      } else {
        params.set('search', serviceSearch.trim());
      }
    }
    
    if (locationSearch.trim()) {
      // If it matches a state option, pass as exact state filter
      const matchedState = NIGERIA_STATES.find(s => s.toLowerCase() === locationSearch.trim().toLowerCase());
      if (matchedState) {
        params.set('state', matchedState);
      } else {
        params.set('search', `${params.get('search') || ''} ${locationSearch.trim()}`.trim());
      }
    }

    navigate(`/discovery?${params.toString()}`);
  };

  const handleCategoryClick = (title) => {
    let skill = '';
    if (title === 'Electrical') skill = 'Electrician';
    else if (title === 'Carpentry') skill = 'Carpenter';
    else if (title === 'Tailoring') skill = 'Tailor';
    else if (title === 'Plumbing') skill = 'Plumber';
    else skill = title;
    
    navigate(`/discovery?skill=${skill}`);
  };

  const filteredSkills = serviceSearch
    ? SKILLS.filter(s => s.toLowerCase().includes(serviceSearch.toLowerCase()))
    : SKILLS;

  const filteredStates = locationSearch
    ? NIGERIA_STATES.filter(s => s.toLowerCase().includes(locationSearch.toLowerCase()))
    : NIGERIA_STATES;

  const categories = [
    { title: 'Electrical', icon: <Zap />, description: 'Expert electricians for wiring, repairs, and installations.' },
    { title: 'Carpentry', icon: <Hammer />, description: 'Professional carpenters for furniture, doors, and roofing.' },
    { title: 'Tailoring', icon: <Scissors />, description: 'Bespoke fashion designers and master tailors.' },
    { title: 'Plumbing', icon: <Droplets />, description: 'Skilled plumbers for pipes, leaks, and drainage systems.' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: 'easeOut' } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.1, ease: 'easeIn' } }
  };

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
            <InputGroup ref={serviceRef}>
              <Search size={20} />
              <input 
                type="text" 
                placeholder="What service are you looking for?" 
                value={serviceSearch}
                onChange={(e) => {
                  setServiceSearch(e.target.value);
                  setShowServiceDropdown(true);
                }}
                onFocus={() => setShowServiceDropdown(true)}
                onKeyDown={(e) => handleKeyDown(e, 'service')}
              />
              <AnimatePresence>
                {showServiceDropdown && filteredSkills.length > 0 && (
                  <DropdownList
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DropdownHeader>Popular Services</DropdownHeader>
                    {filteredSkills.map(skill => (
                      <DropdownItem 
                        key={skill} 
                        onClick={() => {
                          setServiceSearch(skill);
                          setShowServiceDropdown(false);
                        }}
                      >
                        {getSkillIcon(skill)}
                        {skill}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </AnimatePresence>
            </InputGroup>

            <InputGroup ref={locationRef}>
              <MapPin size={20} />
              <input 
                type="text" 
                placeholder="Enter state or city" 
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setShowLocationDropdown(true);
                }}
                onFocus={() => setShowLocationDropdown(true)}
                onKeyDown={(e) => handleKeyDown(e, 'location')}
              />
              <AnimatePresence>
                {showLocationDropdown && filteredStates.length > 0 && (
                  <DropdownList
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DropdownHeader>Nigeria States</DropdownHeader>
                    {filteredStates.map(state => (
                      <DropdownItem 
                        key={state} 
                        onClick={() => {
                          setLocationSearch(state);
                          setShowLocationDropdown(false);
                        }}
                      >
                        <MapPin size={16} />
                        {state}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </AnimatePresence>
            </InputGroup>

            <SearchButton onClick={handleSearch}>Search</SearchButton>
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
              onClick={() => handleCategoryClick(cat.title)}
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
