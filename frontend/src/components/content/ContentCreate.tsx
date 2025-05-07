import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentForm from './ContentForm';
import { contentAPI } from '../../api/contentAPI';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin: 0;
`;

const ContentCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (content: Omit<Content, 'id'>) => {
    try {
      await contentAPI.createContent(content);
      navigate('/contents');
    } catch (error) {
      console.error('Error creating content:', error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>새 콘텐츠 작성</Title>
      </Header>
      <ContentForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/contents')}
      />
    </Container>
  );
};

export default ContentCreate; 