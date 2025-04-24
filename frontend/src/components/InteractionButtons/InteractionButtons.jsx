import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 9999px;
  background-color: ${props => props.$active ? props.$activeColor : '#f7fafc'};
  color: ${props => props.$active ? '#fff' : '#4a5568'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$active ? props.$activeColor : '#edf2f7'};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StyledCount = styled.span`
  font-weight: 500;
`;

const InteractionButtons = ({
  likes,
  views,
  onLike,
  onShare,
  onBookmark
}) => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike && onLike(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark && onBookmark(!isBookmarked);
  };

  const handleShare = () => {
    onShare && onShare();
  };

  return (
    <StyledButtonContainer>
      <StyledButton
        $active={isLiked}
        $activeColor="#e53e3e"
        onClick={handleLike}
        aria-label={t('interaction.like')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <StyledCount>{likes}</StyledCount>
      </StyledButton>

      <StyledButton
        onClick={handleShare}
        aria-label={t('interaction.share')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </StyledButton>

      <StyledButton
        $active={isBookmarked}
        $activeColor="#4299e1"
        onClick={handleBookmark}
        aria-label={t('interaction.bookmark')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isBookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </StyledButton>

      <StyledButton aria-label={t('interaction.views')}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <StyledCount>{views}</StyledCount>
      </StyledButton>
    </StyledButtonContainer>
  );
};

export default InteractionButtons; 