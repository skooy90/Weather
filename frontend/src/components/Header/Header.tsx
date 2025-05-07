import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSun, FaMoon, FaUser, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { User } from '../../types';

const HeaderContainer = styled.header<{ theme: string }>`
  background-color: ${props => props.theme === 'dark' ? '#1a202c' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#2d3748'};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)<{ theme: string }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#2d3748'};
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ theme: string }>`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#2d3748'};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #4299e1;
  }
`;

const ThemeButton = styled.button<{ theme: string }>`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#2d3748'};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthButton = styled.button<{ theme: string }>`
  background-color: ${props => props.theme === 'dark' ? '#4299e1' : '#2b6cb0'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#3182ce' : '#2c5282'};
  }
`;

const RegisterButton = styled(AuthButton)`
  background-color: ${props => props.theme === 'dark' ? '#38a169' : '#2f855a'};
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#2f855a' : '#276749'};
  }
`;

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <HeaderContainer theme={theme}>
      <HeaderContent>
        <Logo to="/" theme={theme}>
          Weather App
        </Logo>
        <Nav>
          <NavLink to="/" theme={theme}>홈</NavLink>
          <NavLink to="/contents" theme={theme}>컨텐츠</NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" theme={theme}>관리자</NavLink>
          )}
          <ThemeButton onClick={toggleTheme} theme={theme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </ThemeButton>
          {!user && (
            <RegisterButton onClick={() => navigate('/signup')} theme={theme}>
              <FaUserPlus /> 회원가입
            </RegisterButton>
          )}
          <AuthButton onClick={handleAuth} theme={theme}>
            <FaUser /> {user ? '로그아웃' : '로그인'}
          </AuthButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 