import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import SearchBar from '../components/SearchBar/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ContentGrid from '../components/ContentGrid/ContentGrid';
import Loading from '../components/Loading/Loading';
import * as S from '../pages/Home.styles';
import { Fade, CircularProgress } from '@mui/material';

const ContentSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  selectedSubcategory,
  filteredContents,
  trendingContents,
  loading,
  error,
  categories,
  subcategories,
  searchSuggestions,
  handleSearch,
  handleCategoryChange,
  handleSubcategoryChange,
  handleSelectSuggestion,
  handleLike,
  handleShare,
  handleBookmark,
  fade
}) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/contents/${id}`);
  };

  return (
    <S.StyledHomeContainer>
      <S.StyledMainSection>
        <S.StyledHeroBanner
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>StoreWord에 오신 것을 환영합니다</h1>
          <p>최신 트렌드와 유용한 정보를 만나보세요</p>
        </S.StyledHeroBanner>

        <S.StyledSearchSection>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSelectSuggestion={setSearchQuery}
            suggestions={searchSuggestions}
          />
        </S.StyledSearchSection>

        <S.StyledFilterSection>
          <CategoryFilter
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onSelectCategory={handleCategoryChange}
            onSelectSubcategory={handleSubcategoryChange}
            categories={categories}
            subcategories={subcategories}
          />
        </S.StyledFilterSection>

        <S.StyledContentWrapper>
          <S.StyledContentSection>
            <Fade in={!fade} timeout={300}>
              <div>
                {loading ? (
                  <S.StyledLoadingContainer>
                    <CircularProgress size={40} />
                  </S.StyledLoadingContainer>
                ) : error ? (
                  <S.StyledErrorMessage>{error}</S.StyledErrorMessage>
                ) : !selectedCategory || selectedCategory === 'all' ? (
                  <S.StyledTrendingSection data-aos="fade-up">
                    <S.StyledTrendingHeader>
                      <FaFire />
                      <h2>지금 인기 있는 콘텐츠</h2>
                    </S.StyledTrendingHeader>
                    <ContentGrid 
                      contents={trendingContents} 
                      onLike={handleLike} 
                      onShare={handleShare}
                      onCardClick={handleCardClick}
                    />
                  </S.StyledTrendingSection>
                ) : (
                  <S.StyledContentSection data-aos="fade-up">
                    <h2>{categories.find(cat => cat.name === selectedCategory)?.name_kr} 콘텐츠</h2>
                    <ContentGrid 
                      contents={filteredContents} 
                      onLike={handleLike} 
                      onShare={handleShare}
                      onCardClick={handleCardClick}
                    />
                  </S.StyledContentSection>
                )}
              </div>
            </Fade>
          </S.StyledContentSection>
        </S.StyledContentWrapper>
      </S.StyledMainSection>

      <S.StyledAdSection>
        <S.StyledAdTitle>More articles</S.StyledAdTitle>
        <S.StyledAdCard href="#">
          <S.StyledAdImage src="/images/ads/product1.jpg" alt="추천 상품 1" />
          <S.StyledAdContent>
            <S.StyledAdCardTitle>4월에는 코딩테스트 공부 '제대로' 하자</S.StyledAdCardTitle>
            <S.StyledAdDescription>체계적인 학습 방법으로 코딩테스트 준비하기</S.StyledAdDescription>
          </S.StyledAdContent>
        </S.StyledAdCard>
        <S.StyledAdCard href="#">
          <S.StyledAdImage src="/images/ads/product2.jpg" alt="추천 상품 2" />
          <S.StyledAdContent>
            <S.StyledAdCardTitle>토이 프로젝트가 포트폴리오에 도움이 될까?</S.StyledAdCardTitle>
            <S.StyledAdDescription>실무 경험을 쌓는 효과적인 방법</S.StyledAdDescription>
          </S.StyledAdContent>
        </S.StyledAdCard>
        <S.StyledAdCard href="#">
          <S.StyledAdImage src="/images/ads/product3.jpg" alt="추천 상품 3" />
          <S.StyledAdContent>
            <S.StyledAdCardTitle>직장인 번아웃, 커리어가 고민될 때 생각해 볼 것들</S.StyledAdCardTitle>
            <S.StyledAdDescription>건강한 커리어를 위한 자기관리 방법</S.StyledAdDescription>
          </S.StyledAdContent>
        </S.StyledAdCard>
        <S.StyledAdCard href="#">
          <S.StyledAdImage src="/images/ads/product4.jpg" alt="추천 상품 4" />
          <S.StyledAdContent>
            <S.StyledAdCardTitle>스프린트의 A-Z, 직접 돌아본 프로젝트 트랙</S.StyledAdCardTitle>
            <S.StyledAdDescription>오프라인 성장의 스케치</S.StyledAdDescription>
          </S.StyledAdContent>
        </S.StyledAdCard>
      </S.StyledAdSection>
    </S.StyledHomeContainer>
  );
};

export default ContentSection; 