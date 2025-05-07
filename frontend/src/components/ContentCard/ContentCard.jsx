import React from 'react';
import styled from 'styled-components';
import InteractionButtons from '../InteractionButtons/InteractionButtons';

const StyledCardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.67%; // 3:2 비율
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledContentContainer = styled.div`
  padding: 16px;
`;

const StyledCategory = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  line-height: 1.4;
`;

const StyledContent = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const StyledMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const StyledDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const ContentCard = ({ content, onLike, onShare, onClick }) => {
  const { title, content: contentText, category, subcategory, author, createdAt, likes, views, image } = content;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    } catch (error) {
      console.error('날짜 포맷팅 에러:', error);
      return dateString;
    }
  };

  const handleLike = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (onLike) {
      onLike(content);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (onShare) {
      onShare(content);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    // 북마크 기능 구현
    console.log('Bookmark clicked');
  };

  return (
    <StyledCardContainer onClick={onClick}>
      {image && (
        <StyledImageContainer>
          <StyledImage src={image} alt={title} />
        </StyledImageContainer>
      )}
      <StyledContentContainer>
        <StyledCategory>
          {category}
          {subcategory && ` > ${subcategory}`}
        </StyledCategory>
        <StyledTitle>{title}</StyledTitle>
        <StyledContent>{contentText}</StyledContent>
        <StyledMetaContainer>
          <div>
            <span>{author}</span>
            <StyledDate>{formatDate(createdAt)}</StyledDate>
          </div>
          <InteractionButtons
            likes={likes}
            views={views}
            onLike={handleLike}
            onShare={handleShare}
            onBookmark={handleBookmark}
          />
        </StyledMetaContainer>
      </StyledContentContainer>
    </StyledCardContainer>
  );
};

export default ContentCard; 