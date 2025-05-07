import React from 'react';
import HeaderLogin from '../components/Header/HeaderLogin';
import ContentSection from '../components/ContentSection';
import CategoryFilter from '../components/CategoryFilter';
import { useContentPage } from '../hooks/useContentPage';
import { Container, Box, Grid, Typography } from '@mui/material';

const HomeLogin = () => {
  const {
    categories,
    selectedCategory,
    filteredContents,
    trendingContents,
    loading,
    error,
    handleCategoryChange,
    handleLike,
    handleShare,
    handleBookmark
  } = useContentPage();

  const getCategoryTitle = () => {
    const category = categories.find(c => c.name === selectedCategory);
    return category ? category.name_kr : selectedCategory;
  };

  return (
    <>
      <HeaderLogin />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {getCategoryTitle()}
              </Typography>
              <ContentSection
                contents={filteredContents}
                loading={loading}
                error={error}
                onLike={handleLike}
                onShare={handleShare}
                onBookmark={handleBookmark}
              />
            </Box>
          </Grid>

          {selectedCategory === 'trending' && (
            <Grid item xs={12}>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  인기 콘텐츠
                </Typography>
                <ContentSection
                  contents={trendingContents}
                  loading={loading}
                  error={error}
                  onLike={handleLike}
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default HomeLogin; 