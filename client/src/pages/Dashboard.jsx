import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User, Settings, Image as ImageIcon, MessageSquare, Star, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
`;

const Sidebar = styled.div`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: ${({ active, theme }) => active ? 'white' : theme.colors.textMuted};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(255,255,255,0.05)'};
    color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 3rem;
  max-width: 1200px;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  h1 { font-size: 2.2rem; }
  p { color: ${({ theme }) => theme.colors.textMuted}; margin-top: 0.5rem; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  .label { color: ${({ theme }) => theme.colors.textMuted}; font-size: 0.9rem; margin-bottom: 0.5rem; }
  .value { font-size: 1.8rem; font-weight: 700; }
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
  
  .info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <DashboardContainer>
      <Sidebar>
        <NavItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          <User size={20} /> Overview
        </NavItem>
        {user.role === 'artisan' && (
          <NavItem active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')}>
            <ImageIcon size={20} /> Portfolio
          </NavItem>
        )}
        <NavItem active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
          <MessageSquare size={20} /> Messages
        </NavItem>
        <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
          <Settings size={20} /> Settings
        </NavItem>
        <NavItem onClick={handleLogout} style={{ marginTop: 'auto', color: '#ef4444' }}>
          <LogOut size={20} /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <h1>Welcome, {user.name}</h1>
          <p>Here's what's happening with your CraftConnect account today.</p>
        </Header>

        <StatsGrid>
          <StatCard>
            <div className="label">Total Messages</div>
            <div className="value">12</div>
          </StatCard>
          {user.role === 'artisan' ? (
            <>
              <StatCard>
                <div className="label">Profile Views</div>
                <div className="value">245</div>
              </StatCard>
              <StatCard>
                <div className="label">Average Rating</div>
                <div className="value">4.8 <Star size={18} fill="#f59e0b" color="#f59e0b" style={{ display: 'inline' }} /></div>
              </StatCard>
            </>
          ) : (
            <StatCard>
              <div className="label">Hired Artisans</div>
              <div className="value">3</div>
            </StatCard>
          )}
        </StatsGrid>

        <Section>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
          <ListItem>
            <div className="info">
              <div style={{ padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: '#6366f1' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>New Message</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>You have a new message from a client</div>
              </div>
            </div>
            <ChevronRight size={20} color="#334155" />
          </ListItem>
          <ListItem>
            <div className="info">
              <div style={{ padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', color: '#10b981' }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Login Successful</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Yesterday at 8:45 PM</div>
              </div>
            </div>
            <ChevronRight size={20} color="#334155" />
          </ListItem>
        </Section>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
