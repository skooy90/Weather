import styled from 'styled-components';

export const StyledHomeContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-right: calc(300px + 4rem);
`;

export const StyledMainSection = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const StyledContentWrapper = styled.div`
  width: 100%;
`;

export const StyledContentSection = styled.section`
  width: 100%;
`;

export const StyledAdSection = styled.div`
  width: 300px;
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 10;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const StyledSearchSection = styled.section`
  margin-bottom: 40px;
`;

export const StyledFilterSection = styled.section`
  margin-bottom: 30px;
`;

export const StyledGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

export const StyledContentCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const StyledCardContent = styled.div`
  padding: 1rem;
`;

export const StyledCardCategory = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

export const StyledCardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  margin: 0;
  transform: translateY(20px);
  transition: transform 0.3s ease;
`;

export const StyledCardDescription = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

export const StyledCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  color: white;
`;

export const StyledAdTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
`;

export const StyledAdCard = styled.a`
  display: block;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const StyledAdImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

export const StyledAdContent = styled.div`
  padding: 1rem;
`;

export const StyledAdCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

export const StyledAdDescription = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
`;

export const StyledHeroBanner = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/banner.jpg') center/cover;
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
`;

export const StyledTrendingSection = styled.div`
  margin-bottom: 2rem;
`;

export const StyledTrendingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #e53e3e;
`;

export const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const StyledCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  &:hover {
    opacity: 1;
  }
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

export const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.colors.errorLight};
  border-radius: 4px;
`; 