import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, MessageSquare, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled.nav`
  background: ${({ isScrolled, theme }) => isScrolled ? theme.colors.glass : 'transparent'};
  backdrop-filter: ${({ isScrolled }) => isScrolled ? 'blur(10px)' : 'none'};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: ${({ isScrolled, theme }) => isScrolled ? `1px solid ${theme.colors.border}` : 'none'};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const NavLogo = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 2rem;
  
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 80px;
`;

const NavLinks = styled(Link)`
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textMuted};
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 25px;
    left: 50%;
    width: ${({ active }) => active ? '20px' : '0'};
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    &:after {
      width: 20px;
    }
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const Button = styled(Link)`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.glow};
    }
  }

  &.text {
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const MobileIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.colors.text};
  
  @media screen and (max-width: 960px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.background};
    z-index: 999;
    padding-top: 100px;
    align-items: center;
    gap: 2rem;
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Track user login state
  const [user, setUser] = useState(null);

  // Sync state with localStorage on mount and when location changes
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    setUser(userInfo ? JSON.parse(userInfo) : null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    toggleMenu();
  };

  return (
    <Nav isScrolled={isScrolled}>
      <NavContainer>
        <NavLogo to="/">
          Craft<span>Connect</span>
        </NavLogo>

        <MobileIcon onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </MobileIcon>

        <NavMenu>
          <NavItem>
            <NavLinks to="/" active={location.pathname === '/'}>Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/discovery" active={location.pathname === '/discovery'}>Find Artisans</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</NavLinks>
          </NavItem>
        </NavMenu>

        <NavButtons>
          {user ? (
            <Button to="/login" className="primary" onClick={() => localStorage.removeItem('userInfo')}>Logout</Button>
          ) : (
            <>
              <Button to="/login" className="text">Login</Button>
              <Button to="/register" className="primary">Get Started</Button>
            </>
          )}
        </NavButtons>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <NavLinks to="/" onClick={toggleMenu}>Home</NavLinks>
            <NavLinks to="/discovery" onClick={toggleMenu}>Find Artisans</NavLinks>
            <NavLinks to="/dashboard" onClick={toggleMenu}>Dashboard</NavLinks>
            {user ? (
              <Button to="/login" className="primary" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button to="/login" className="text" onClick={toggleMenu}>Login</Button>
                <Button to="/register" className="primary" onClick={toggleMenu}>Get Started</Button>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
