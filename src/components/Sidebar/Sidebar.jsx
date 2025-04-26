import React from 'react';
import styled from 'styled-components';

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

const PopularContentDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

const Sidebar = () => {
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
          <PartnerItem>
            <PartnerImage src="/images/partner1.jpg" alt="파트너 1" />
            <PartnerInfo>
              <PartnerName>기상청</PartnerName>
              <PartnerDescription>정확한 날씨 정보 제공</PartnerDescription>
            </PartnerInfo>
          </PartnerItem>
          <PartnerItem>
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
          <PopularContentItem>
            <PopularContentTitle>주간 날씨 예보</PopularContentTitle>
            <PopularContentDescription>다음 주 날씨를 미리 확인하세요</PopularContentDescription>
          </PopularContentItem>
          <PopularContentItem>
            <PopularContentTitle>기상 특보</PopularContentTitle>
            <PopularContentDescription>주의해야 할 기상 현상</PopularContentDescription>
          </PopularContentItem>
        </PopularContentList>
      </SidebarSection>
    </SidebarContainer>
  );
};

export default Sidebar; 