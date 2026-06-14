import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, MessageSquare, Phone, CheckCircle, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import API_URL from '../config';

const ProfileContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const Hero = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4rem 2rem;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 30px;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const Info = styled.div`
  flex: 1;
  h1 { font-size: 3rem; margin-bottom: 0.5rem; }
  .business { font-size: 1.5rem; color: ${({ theme }) => theme.colors.primary}; font-weight: 600; margin-bottom: 1rem; }
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
  @media (max-width: 768px) { justify-content: center; }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  span:first-child { font-weight: 700; font-size: 1.2rem; }
  span:last-child { color: ${({ theme }) => theme.colors.textMuted}; font-size: 0.9rem; }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const PrimaryBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  &:hover { background: ${({ theme }) => theme.colors.primaryHover}; transform: translateY(-2px); }
`;

const SecondaryBtn = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover { background: ${({ theme }) => theme.colors.border}; }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const GalleryItem = styled(motion.div)`
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
  &:hover img { transform: scale(1.1); }
  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover .overlay { opacity: 1; }
`;

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
`;

const ArtisanProfile = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artisanRes, reviewsRes] = await Promise.all([
          axios.get(`${API_URL}/api/artisans/${id}`),
          axios.get(`${API_URL}/api/reviews/artisan/${id}`)
        ]);
        setArtisan(artisanRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
  if (!artisan) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Artisan not found.</div>;

  return (
    <ProfileContainer>
      <Hero>
        <HeroContent>
          <Avatar>
            <img src={artisan.profilePicture || 'https://via.placeholder.com/300?text=Profile'} alt={artisan.name} />
          </Avatar>
          <Info>
            <CheckCircle size={20} color="#10b981" style={{ marginBottom: '0.5rem' }} />
            <h1>{artisan.name}</h1>
            <p className="business">{artisan.artisanProfile.businessName}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
              <MapPin size={18} /> {artisan.artisanProfile.location.city}, {artisan.artisanProfile.location.state}
            </div>
            
            <Stats>
              <StatItem>
                <span>{artisan.artisanProfile.rating.toFixed(1)} <Star size={16} fill="#f59e0b" color="#f59e0b" /></span>
                <span>Rating</span>
              </StatItem>
              <StatItem>
                <span>{artisan.artisanProfile.numberOfReviews}</span>
                <span>Reviews</span>
              </StatItem>
              <StatItem>
                <span>{artisan.artisanProfile.portfolio.length}</span>
                <span>Projects</span>
              </StatItem>
            </Stats>

            <ActionButtons>
              <PrimaryBtn to={`/chat/${artisan._id}`}>
                <MessageSquare size={20} /> Chat with Artisan
              </PrimaryBtn>
              <SecondaryBtn>
                <Phone size={20} /> {artisan.phoneNumber || 'Contact Info'}
              </SecondaryBtn>
            </ActionButtons>
          </Info>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>About the Artisan</SectionTitle>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#94a3b8' }}>{artisan.artisanProfile.bio || 'No bio available.'}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {artisan.artisanProfile.skills.map(skill => (
            <span key={skill} style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '600' }}>{skill}</span>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle><ImageIcon size={24} /> Project Gallery</SectionTitle>
        <GalleryGrid>
          {artisan.artisanProfile.portfolio.map((item, index) => (
            <GalleryItem 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src={item.imageUrl} alt={item.description} />
              <div className="overlay">
                <p>{item.description}</p>
              </div>
            </GalleryItem>
          ))}
        </GalleryGrid>
        {artisan.artisanProfile.portfolio.length === 0 && <p style={{ color: '#94a3b8' }}>No project images uploaded yet.</p>}
      </Section>

      <Section>
        <SectionTitle><Star size={24} /> Reviews</SectionTitle>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>See what customers are saying about {artisan.name}</p>
        
        {reviews.map((rev) => (
          <ReviewCard key={rev._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <img 
                  src={rev.customer?.profilePicture || 'https://via.placeholder.com/300?text=Profile'} 
                  alt={rev.customer?.name} 
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontWeight: 600 }}>{rev.customer?.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < rev.rating ? '#f59e0b' : 'transparent'} 
                    color="#f59e0b" 
                  />
                ))}
              </div>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>{rev.comment}</p>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.8rem' }}>
              {new Date(rev.createdAt).toLocaleDateString()}
            </div>
          </ReviewCard>
        ))}
        {reviews.length === 0 && <p style={{ color: '#94a3b8' }}>No reviews yet.</p>}
      </Section>
    </ProfileContainer>
  );
};

export default ArtisanProfile;
