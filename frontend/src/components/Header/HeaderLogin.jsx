import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderContainer = styled.header`
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

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #4299e1;
  }
`;

const ThemeButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthButton = styled.button`
  background-color: #4299e1;
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
    background-color: #3182ce;
  }
`;

const InfoButton = styled.button`
  background-color: #38a169;
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
    background-color: #2f855a;
  }
`;

const HeaderLogin = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUserInfo = () => {
    navigate('/profile');
  };

  return (
    <HeaderContainer theme={theme}>
      <HeaderContent>
        <Logo to="/main">Weather App</Logo>
        <Nav>
          <NavLink to="/main">홈</NavLink>
          <NavLink to="/content">컨텐츠</NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin">관리자</NavLink>
          )}
          <ThemeButton onClick={toggleTheme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </ThemeButton>
          <InfoButton onClick={handleUserInfo}>
            <FaUser /> 회원정보
          </InfoButton>
          <AuthButton onClick={handleLogout}>
            로그아웃
          </AuthButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default HeaderLogin; 