import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import styled from 'styled-components';

const CategorySection = styled.section`
  margin-bottom: 2rem;
`;

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onSelectCategory = () => { console.warn('onSelectCategory prop이 전달되지 않았습니다.'); }
}) => {
  const handleCategoryClick = (event, newValue) => {
    event.preventDefault();
    onSelectCategory(newValue);
  };

  return (
    <CategorySection>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryClick}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="category tabs"
        >
          {(categories || []).map((category) => (
            <Tab
              key={category.name}
              label={category.name_kr}
              value={category.name}
            />
          ))}
        </Tabs>
      </Box>
    </CategorySection>
  );
};

export default CategoryFilter; 