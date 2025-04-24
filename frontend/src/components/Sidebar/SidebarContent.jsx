import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarSection = styled.section`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
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
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #F7FAFC;
  color: #2B6CB0;
  border-radius: 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2B6CB0;
    color: white;
  }
`;

const PartnerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PartnerItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #F7FAFC;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #2D3748;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E2E8F0;
    transform: translateX(4px);
  }
`;

const PartnerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const PartnerInfo = styled.div`
  flex: 1;
`;

const PartnerName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const PartnerDescription = styled.div`
  font-size: 0.875rem;
  color: #718096;
`;

const PopularContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PopularContentItem = styled.a`
  display: block;
  padding: 1rem;
  background-color: #F7FAFC;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #2D3748;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E2E8F0;
  }
`;

const PopularContentTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PopularContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #718096;
`;

// 샘플 데이터
const popularKeywords = ['봄 패션', '홈트레이닝', '건강식', '스마트폰', '여행'];
const partners = [
  {
    id: 1,
    name: '패션 브랜드',
    description: '2024 S/S 컬렉션',
    image: 'https://via.placeholder.com/40'
  },
  {
    id: 2,
    name: '헬스 브랜드',
    description: '홈트레이닝 용품',
    image: 'https://via.placeholder.com/40'
  }
];
const popularContents = [
  {
    id: 1,
    title: '봄에 어울리는 데일리 룩',
    views: 1234,
    date: '2024-03-20'
  },
  {
    id: 2,
    title: '집에서 하는 효과적인 운동법',
    views: 987,
    date: '2024-03-19'
  }
];

const SidebarContent = () => {
  const { t } = useTranslation();

  return (
    <SidebarContainer>
      <SidebarSection>
        <SectionTitle>인기 키워드</SectionTitle>
        <KeywordList>
          {popularKeywords.map((keyword, index) => (
            <KeywordBadge key={index}>{keyword}</KeywordBadge>
          ))}
        </KeywordList>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>파트너 추천</SectionTitle>
        <PartnerList>
          {partners.map((partner) => (
            <PartnerItem key={partner.id} href="#">
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
        <SectionTitle>인기 콘텐츠</SectionTitle>
        <PopularContentList>
          {popularContents.map((content) => (
            <PopularContentItem key={content.id} href="#">
              <PopularContentTitle>{content.title}</PopularContentTitle>
              <PopularContentMeta>
                <span>조회수 {content.views}</span>
                <span>{content.date}</span>
              </PopularContentMeta>
            </PopularContentItem>
          ))}
        </PopularContentList>
      </SidebarSection>
    </SidebarContainer>
  );
};

export default SidebarContent; 