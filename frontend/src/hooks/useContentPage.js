import { useState, useEffect } from 'react';
import { contentAPI } from '../api/content';
import { categoryAPI } from '../api/category';

// DB에 저장된 카테고리명 기준 한글 매핑
const CATEGORY_KR_MAP = {
  'trending': '인기',
  'lifestyle': '라이프스타일',
  'shopping': '쇼핑',
  'food': '음식',
  'hobby': '취미',
  'tech': '기술',
  'family': '가족',
};

export function useContentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [filteredContents, setFilteredContents] = useState([]);
  const [trendingContents, setTrendingContents] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [fade, setFade] = useState(false);

  const searchSuggestions = [
    'ChatGPT', '원격근무', '아침루틴', '부업', '아마존', '봄패션', '간편식',
    '서울맛집', '캠핑', '강아지훈련', '애플비전프로', '노트북', '코딩교육', '스마트폰'
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getCategories();
        // 카테고리명 한글로 강제 매핑
        const mapped = response.map(cat => ({
          ...cat,
          name_kr: cat.name_kr || CATEGORY_KR_MAP[cat.name] || cat.name
        }));
        setCategories(mapped);
      } catch (err) {
        setError(err.message || '카테고리를 불러오는 중 오류가 발생했습니다.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setFade(true); // 콘텐츠 변경 전에 페이드 아웃
        setLoading(true);
        setError(null);
        
        // 페이드 아웃 효과를 위한 지연
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (selectedCategory === 'trending') {
          const allContents = await contentAPI.getContents();
          const trending = [...allContents]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 6);
          setContents(trending);
          setFilteredContents(trending);
          setTrendingContents(trending);
        } else {
          const response = await contentAPI.getContentsByCategory(selectedCategory);
          const contentsArray = Array.isArray(response) ? response : [];
          setContents(contentsArray);
          setFilteredContents(contentsArray);
        }
      } catch (err) {
        setError(err.message || '콘텐츠를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
        // 콘텐츠가 설정된 후 페이드 인
        setTimeout(() => setFade(false), 100);
      }
    };
    fetchContents();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      const result = contents.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContents(result);
    } else {
      setFilteredContents(contents);
    }
  }, [searchQuery, contents]);

  const handleSearch = (query) => setSearchQuery(query);
  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleSelectSuggestion = (suggestion) => setSearchQuery(suggestion);

  const handleLike = async (content) => {
    try {
      await contentAPI.likeContent(content._id);
      setContents(prevContents =>
        prevContents.map(c =>
          c._id === content._id ? { ...c, likes: c.likes + 1 } : c
        )
      );
      setTrendingContents(prevTrending =>
        prevTrending.map(c =>
          c._id === content._id ? { ...c, likes: c.likes + 1 } : c
        )
      );
    } catch (err) {
      setError(err.message || '좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleShare = (content) => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      }).catch(console.error);
    }
  };

  const handleBookmark = (content) => {
    console.log('Bookmarked:', content.title);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredContents,
    trendingContents,
    contents,
    loading,
    error,
    categories,
    searchSuggestions,
    handleSearch,
    handleCategoryChange,
    handleSelectSuggestion,
    handleLike,
    handleShare,
    handleBookmark,
    showLoading,
    fade
  };
} 