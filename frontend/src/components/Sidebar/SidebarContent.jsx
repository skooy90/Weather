import React from 'react';
import styled from 'styled-components';

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

const PopularContentDescription = styled.div`
  font-size: 0.875rem;
  color: #718096;
`;

const SidebarContent = () => {
  return (
    <SidebarContainer>
      <SidebarSection>
        <SectionTitle>인기 검색어</SectionTitle>
        <KeywordList>
          <KeywordBadge>날씨</KeywordBadge>
          <KeywordBadge>기상</KeywordBadge>
          <KeywordBadge>예보</KeywordBadge>
        </KeywordList>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>파트너</SectionTitle>
        <PartnerList>
          <PartnerItem href="#">
            <PartnerImage src="/images/partner1.jpg" alt="파트너 1" />
            <PartnerInfo>
              <PartnerName>기상청</PartnerName>
              <PartnerDescription>정확한 날씨 정보 제공</PartnerDescription>
            </PartnerInfo>
          </PartnerItem>
          <PartnerItem href="#">
            <PartnerImage src="/images/partner2.jpg" alt="파트너 2" />
            <PartnerInfo>
              <PartnerName>기상연구소</PartnerName>
              <PartnerDescription>날씨 연구 및 분석</PartnerDescription>
            </PartnerInfo>
          </PartnerItem>
        </PartnerList>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>인기 콘텐츠</SectionTitle>
        <PopularContentList>
          <PopularContentItem href="#">
            <PopularContentTitle>주간 날씨 예보</PopularContentTitle>
            <PopularContentDescription>다음 주 날씨를 미리 확인하세요</PopularContentDescription>
          </PopularContentItem>
          <PopularContentItem href="#">
            <PopularContentTitle>기상 특보</PopularContentTitle>
            <PopularContentDescription>주의해야 할 기상 현상</PopularContentDescription>
          </PopularContentItem>
        </PopularContentList>
      </SidebarSection>
    </SidebarContainer>
  );
};

export default SidebarContent; 