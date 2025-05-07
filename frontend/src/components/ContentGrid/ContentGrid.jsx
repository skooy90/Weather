import React from 'react';
import styled from 'styled-components';
import ContentCard from '../ContentCard/ContentCard';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

const StyledContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const StyledCategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledCategoryTab = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.active ? '#007bff' : '#e9ecef'};
  color: ${props => props.active ? 'white' : '#495057'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#dee2e6'};
  }
`;

const ContentGrid = ({ contents, onLike, onShare, onCardClick, loading, error }) => {
  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!contents || contents.length === 0) {
    return <Error>컨텐츠가 없습니다.</Error>;
  }

  return (
    <StyledContentGrid>
      {contents.map(content => (
        <ContentCard
          key={content.id}
          content={content}
          onLike={onLike}
          onShare={onShare}
          onClick={() => onCardClick(content.id)}
        />
      ))}
    </StyledContentGrid>
  );
};

export default ContentGrid; 