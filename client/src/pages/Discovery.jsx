import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Filter, Map as MapIcon, Grid, MapPin, Star } from 'lucide-react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import { motion } from 'framer-motion';
import API_URL from '../config';
import { Link } from "react-router-dom";

const DiscoveryContainer = styled.div`
  padding: 100px 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleGroup = styled.div`
  h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
  p { color: ${({ theme }) => theme.colors.textMuted}; }
`;

const ViewToggle = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.4rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.textMuted};
  font-weight: 600;
  transition: all 0.2s ease;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FilterBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  h3 { font-size: 1.1rem; margin-bottom: 1.2rem; }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: white;
  margin-bottom: 1rem;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const MainContent = styled.div`
  height: ${props => props.view === 'map' ? '700px' : 'auto'};
`;

const ArtisansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ArtisanCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background: #2d3748;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const Badge = styled.span`
  background: rgba(99, 102, 241, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.colors.warning};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  span { color: ${({ theme }) => theme.colors.textMuted}; }
`;

const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", 
  "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", 
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", 
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const SKILLS = ["Electrician", "Carpenter", "Tailor", "Plumber", "Painter", "Mechanic"];

const Discovery = () => {
  const [view, setView] = useState('grid');
  const [artisans, setArtisans] = useState([]);
  const [filters, setFilters] = useState({ skill: '', state: '', search: '' });

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/artisans`, { params: filters });
        setArtisans(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArtisans();
  }, [filters]);

  return (
    <DiscoveryContainer>
      <Header>
        <TitleGroup>
          <h1>Discover Artisans</h1>
          <p>Find the best professionals near you in any of Nigeria's 36 states.</p>
        </TitleGroup>
        <ViewToggle>
          <ToggleBtn active={view === 'grid'} onClick={() => setView('grid')}>
            <Grid size={18} /> Grid
          </ToggleBtn>
          <ToggleBtn active={view === 'map'} onClick={() => setView('map')}>
            <MapIcon size={18} /> Map
          </ToggleBtn>
        </ViewToggle>
      </Header>

      <ContentLayout>
        <Sidebar>
          <FilterBox>
            <h3>Search & Filters</h3>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="Search name or skill..." 
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: 'white', outline: 'none' }}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8'}} />
            </div>

            <Select onChange={(e) => setFilters({...filters, skill: e.target.value})}>
              <option value="">All Skills</option>
              {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>

            <Select onChange={(e) => setFilters({...filters, state: e.target.value})}>
              <option value="">All States</option>
              {NIGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FilterBox>
        </Sidebar>

        <MainContent view={view}>
          {view === 'map' ? (
            <MapComponent artisans={artisans} />
          ) : (
            <ArtisansGrid>
              {artisans.map(artisan => (
                <ArtisanCard key={artisan._id}>
                  <CardImage>
                    <img src={artisan.profilePicture || 'https://via.placeholder.com/300x200?text=CraftConnect'} alt={artisan.name} />
                  </CardImage>
                  <CardBody>
                    <Badge>{artisan.artisanProfile.skills[0] || 'Artisan'}</Badge>
                    <h3>{artisan.artisanProfile.businessName || artisan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                      <MapPin size={14} /> {artisan.artisanProfile.location.city}, {artisan.artisanProfile.location.state}
                    </div>
                    <Ratings>
                      <Star size={14} fill="currentColor" /> {artisan.artisanProfile.rating.toFixed(1)} <span>({artisan.artisanProfile.numberOfReviews} reviews)</span>
                    </Ratings>
                    <Link to={`/artisan/${artisan._id}`} style={{ display: 'block', marginTop: '1.5rem', textAlign: 'center', background: '#6366f1', padding: '0.8rem', borderRadius: '10px', fontWeight: '600' }}>
                      View Profile
                    </Link>
                  </CardBody>
                </ArtisanCard>
              ))}
              {artisans.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem', color: '#94a3b8' }}>No artisans found matching your criteria.</p>}
            </ArtisansGrid>
          )}
        </MainContent>
      </ContentLayout>
    </DiscoveryContainer>
  );
};

export default Discovery;
