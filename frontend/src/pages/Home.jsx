import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFire, FaShare, FaBookmark, FaStar, FaComment, FaEye, FaHeart } from 'react-icons/fa';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterBar from '../components/FilterBar/FilterBar';
import ContentGrid from '../components/ContentGrid/ContentGrid';
import Loading from '../components/Loading/Loading';
import contentsData from '../data/contents.json';
import { contentApi } from '../services/api';
import CategoryFilter from '../components/CategoryFilter';

const StyledHomeContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-right: calc(300px + 4rem); /* 광고 영역 만큼 여백 추가 */
`;

const StyledMainSection = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StyledContentWrapper = styled.div`
  width: 100%;
`;

const StyledContentSection = styled.section`
  width: 100%;
`;

const StyledAdSection = styled.div`
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

  /* 스크롤바 스타일링 */
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

const StyledSearchSection = styled.section`
  margin-bottom: 40px;
`;

const StyledFilterSection = styled.section`
  margin-bottom: 30px;
`;

const StyledGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const StyledContentCard = styled(motion.div)`
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

const StyledCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StyledCardContent = styled.div`
  padding: 1rem;
`;

const StyledCardCategory = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const StyledCardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  margin: 0;
  transform: translateY(20px);
  transition: transform 0.3s ease;

  ${StyledContentCard}:hover & {
    transform: translateY(0);
  }
`;

const StyledCardDescription = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const StyledCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  color: white;
`;

const StyledAdTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const StyledAdCard = styled.a`
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

const StyledAdImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const StyledAdContent = styled.div`
  padding: 1rem;
`;

const StyledAdCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const StyledAdDescription = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
`;

const StyledHeroBanner = styled(motion.div)`
  width: 100%;
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/banner.jpg') center/cover;
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

const StyledTrendingSection = styled.div`
  margin-bottom: 2rem;
`;

const StyledTrendingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #e53e3e;
`;

const StyledIconButton = styled.button`
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

const StyledCardOverlay = styled.div`
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

  ${StyledContentCard}:hover & {
    opacity: 1;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [filteredContents, setFilteredContents] = useState([]);
  const [trendingContents, setTrendingContents] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  // 모든 콘텐츠를 하나의 배열로 합치기
  const allContents = Object.values(contentsData).flat();

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'trending', label: '트렌딩' }
  ];

  const searchSuggestions = [
    'ChatGPT',
    '원격근무',
    '아침루틴',
    '부업',
    '아마존',
    '봄패션',
    '간편식',
    '서울맛집',
    '캠핑',
    '강아지훈련',
    '애플비전프로',
    '노트북',
    '코딩교육',
    '스마트폰'
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchCategories = async () => {
      try {
        const response = await contentApi.getCategories();
        setCategories(response.data);
        
        // 서브카테고리 데이터 구조화
        const subcategoriesData = {};
        response.data.forEach(category => {
          if (category.id !== 'all') {
            subcategoriesData[category.id] = category.subcategories || [];
          }
        });
        setSubcategories(subcategoriesData);
      } catch (err) {
        setError('카테고리를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();

    // 트렌딩 콘텐츠 설정 (좋아요 수 기준)
    const trending = [...allContents]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);
    setTrendingContents(trending);

    // 초기 필터링된 콘텐츠 설정
    if (selectedCategory) {
      setFilteredContents(contentsData[selectedCategory] || []);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // 필터링 로직
    let result = [...(contentsData[selectedCategory] || [])];
    
    if (searchQuery) {
      result = result.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSubcategory !== 'all') {
      result = result.filter(content =>
        content.subcategory === selectedSubcategory
      );
    }

    // 정렬
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredContents(result);
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        if (selectedCategory === 'all') {
          response = await contentApi.getAllContents();
        } else if (selectedSubcategory === 'all') {
          response = await contentApi.getContentsByCategory(selectedCategory);
        } else {
          response = await contentApi.getContentsBySubcategory(selectedCategory, selectedSubcategory);
        }

        setContents(response.data);
      } catch (err) {
        setError('콘텐츠를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching contents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [selectedCategory, selectedSubcategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
  };

  const handleLike = (content) => {
    // 좋아요 기능 구현
    console.log('Liked:', content.title);
  };

  const handleShare = (content) => {
    // 공유 기능 구현
    console.log('Shared:', content.title);
  };

  const handleBookmark = (content) => {
    // 북마크 기능 구현
    console.log('Bookmarked:', content.title);
  };

  const handleCardClick = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <StyledHomeContainer>
      <StyledMainSection>
        <StyledHeroBanner
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>StoreWord에 오신 것을 환영합니다</h1>
          <p>최신 트렌드와 유용한 정보를 만나보세요</p>
        </StyledHeroBanner>

        <StyledSearchSection>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSelectSuggestion={setSearchQuery}
            suggestions={searchSuggestions}
          />
        </StyledSearchSection>

        <StyledFilterSection>
          <CategoryFilter
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onSelectCategory={handleCategoryChange}
            onSelectSubcategory={handleSubcategoryChange}
            categories={categories}
            subcategories={subcategories}
          />
        </StyledFilterSection>

        <StyledContentWrapper>
          <StyledContentSection>
            {!selectedCategory ? (
              <StyledTrendingSection data-aos="fade-up">
                <StyledTrendingHeader>
                  <FaFire />
                  <h2>지금 인기 있는 콘텐츠</h2>
                </StyledTrendingHeader>
                <ContentGrid 
                  contents={trendingContents} 
                  onLike={handleLike} 
                  onShare={handleShare}
                  onCardClick={handleCardClick} 
                />
              </StyledTrendingSection>
            ) : (
              <StyledContentSection data-aos="fade-up">
                <h2>{categories.find(cat => cat.id === selectedCategory)?.name} 콘텐츠</h2>
                <ContentGrid 
                  contents={contents} 
                  onLike={handleLike} 
                  onShare={handleShare}
                  onCardClick={handleCardClick}
                />
              </StyledContentSection>
            )}
          </StyledContentSection>
        </StyledContentWrapper>
      </StyledMainSection>

      <StyledAdSection>
        <StyledAdTitle>More articles</StyledAdTitle>
        <StyledAdCard href="#">
          <StyledAdImage src="/images/ads/product1.jpg" alt="추천 상품 1" />
          <StyledAdContent>
            <StyledAdCardTitle>4월에는 코딩테스트 공부 '제대로' 하자</StyledAdCardTitle>
            <StyledAdDescription>체계적인 학습 방법으로 코딩테스트 준비하기</StyledAdDescription>
          </StyledAdContent>
        </StyledAdCard>
        <StyledAdCard href="#">
          <StyledAdImage src="/images/ads/product2.jpg" alt="추천 상품 2" />
          <StyledAdContent>
            <StyledAdCardTitle>토이 프로젝트가 포트폴리오에 도움이 될까?</StyledAdCardTitle>
            <StyledAdDescription>실무 경험을 쌓는 효과적인 방법</StyledAdDescription>
          </StyledAdContent>
        </StyledAdCard>
        <StyledAdCard href="#">
          <StyledAdImage src="/images/ads/product3.jpg" alt="추천 상품 3" />
          <StyledAdContent>
            <StyledAdCardTitle>직장인 번아웃, 커리어가 고민될 때 생각해 볼 것들</StyledAdCardTitle>
            <StyledAdDescription>건강한 커리어를 위한 자기관리 방법</StyledAdDescription>
          </StyledAdContent>
        </StyledAdCard>
        <StyledAdCard href="#">
          <StyledAdImage src="/images/ads/product4.jpg" alt="추천 상품 4" />
          <StyledAdContent>
            <StyledAdCardTitle>스프린트의 A-Z, 직접 돌아본 프로젝트 트랙</StyledAdCardTitle>
            <StyledAdDescription>오프라인 성장의 스케치</StyledAdDescription>
          </StyledAdContent>
        </StyledAdCard>
      </StyledAdSection>
    </StyledHomeContainer>
  );
};

export default Home; 