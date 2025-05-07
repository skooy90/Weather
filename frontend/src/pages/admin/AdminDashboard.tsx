import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUsers, FaNewspaper, FaComments, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

interface Stats {
  users: number;
  contents: number;
  comments: number;
  views: number;
}

const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  color: #2d3748;
`;

const AdminNav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const AdminButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #4299e1;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #3182ce;
  }
`;

const LogoutButton = styled(AdminButton)`
  background-color: #f56565;
  
  &:hover {
    background-color: #e53e3e;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #4299e1;
  margin-bottom: 1rem;
`;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stats, setStats] = useState<Stats>({
    users: 1234,
    contents: 567,
    comments: 8901,
    views: 123456
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>관리자 대시보드</AdminTitle>
        <AdminNav>
          <AdminButton onClick={() => navigate('/admin/users')}>
            <FaUsers /> 사용자 관리
          </AdminButton>
          <AdminButton onClick={() => navigate('/admin/contents')}>
            <FaNewspaper /> 콘텐츠 관리
          </AdminButton>
          <AdminButton onClick={() => navigate('/admin/comments')}>
            <FaComments /> 댓글 관리
          </AdminButton>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> 로그아웃
          </LogoutButton>
        </AdminNav>
      </AdminHeader>

      <StatsGrid>
        <StatCard>
          <StatIcon><FaUsers /></StatIcon>
          <StatTitle>전체 사용자</StatTitle>
          <StatValue>{stats.users.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaNewspaper /></StatIcon>
          <StatTitle>전체 콘텐츠</StatTitle>
          <StatValue>{stats.contents.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaComments /></StatIcon>
          <StatTitle>전체 댓글</StatTitle>
          <StatValue>{stats.comments.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaChartLine /></StatIcon>
          <StatTitle>전체 조회수</StatTitle>
          <StatValue>{stats.views.toLocaleString()}</StatValue>
        </StatCard>
      </StatsGrid>
    </AdminContainer>
  );
};

export default AdminDashboard; 