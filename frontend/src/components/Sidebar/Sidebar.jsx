import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SidebarContainer = styled.aside`
  width: 300px;
  background: #F7FAFC;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SidebarSection = styled.section`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2D3748;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #E2E8F0;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const KeywordBadge = styled.span`
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #4A5568;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2B6CB0;
    color: white;
    border-color: #2B6CB0;
  }
`;

const PartnerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PartnerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const PartnerImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const PartnerInfo = styled.div`
  flex: 1;
`;

const PartnerName = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  color: #2D3748;
  margin-bottom: 0.25rem;
`;

const PartnerDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

const PopularContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PopularContentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #EDF2F7;
  }
`;

const PopularContentTitle = styled.h4`
  font-size: 0.875rem;
  color: #2D3748;
  margin-bottom: 0.25rem;
`;

const PopularContentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #718096;
`;

const Sidebar = () => {
  const { t } = useTranslation();

  // 임시 데이터
  const popularKeywords = ['트렌드', '라이프스타일', '쇼핑', '푸드'];
  const partnerRecommendations = [
    {
      id: 1,
      name: '파트너 1',
      description: '추천 상품 소개',
      image: 'https://via.placeholder.com/50'
    },
    // 더 많은 파트너 데이터...
  ];
  const popularContents = [
    {
      id: 1,
      title: '인기 콘텐츠 1',
      views: 1234
    },
    // 더 많은 인기 콘텐츠 데이터...
  ];

  return (
    <SidebarContainer>
      <SidebarSection>
        <SectionTitle>{t('main.sidebar.popularKeywords')}</SectionTitle>
        <KeywordList>
          {popularKeywords.map(keyword => (
            <KeywordBadge key={keyword}>{keyword}</KeywordBadge>
          ))}
        </KeywordList>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>{t('main.sidebar.partnerRecommendations')}</SectionTitle>
        <PartnerList>
          {partnerRecommendations.map(partner => (
            <PartnerItem key={partner.id}>
              <PartnerImage src={partner.image} alt={partner.name} />
              <PartnerInfo>
                <PartnerName>{partner.name}</PartnerName>
                <PartnerDescription>{partner.description}</PartnerDescription>
              </PartnerInfo>
            </PartnerItem>
          ))}
        </PartnerList>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>{t('main.sidebar.popularContents')}</SectionTitle>
        <PopularContentList>
          {popularContents.map(content => (
            <PopularContentItem key={content.id}>
              <div>
                <PopularContentTitle>{content.title}</PopularContentTitle>
                <PopularContentMeta>
                  👁️ {content.views} {t('main.sidebar.views')}
                </PopularContentMeta>
              </div>
            </PopularContentItem>
          ))}
        </PopularContentList>
      </SidebarSection>
    </SidebarContainer>
  );
};

export default Sidebar; 