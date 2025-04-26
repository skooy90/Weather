import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #2B6CB0 0%, #4299E1 100%);
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 80%;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>{t('main.hero.title')}</HeroTitle>
        <HeroDescription>{t('main.hero.description')}</HeroDescription>
        <SearchBar>
          <SearchInput 
            type="text" 
            placeholder={t('header.searchPlaceholder')}
          />
        </SearchBar>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection; 