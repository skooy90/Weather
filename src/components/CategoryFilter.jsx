import React from 'react';
import styled from 'styled-components';

const StyledFilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const StyledFilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
`;

const CategoryFilter = ({ 
  selectedCategory, 
  selectedSubcategory, 
  onSelectCategory, 
  onSelectSubcategory,
  categories,
  subcategories
}) => {
  const handleCategoryChange = (e) => {
    onSelectCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    onSelectSubcategory(e.target.value);
  };

  return (
    <StyledFilterContainer>
      <StyledFilterGroup>
        <StyledSelect
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </StyledSelect>

        {selectedCategory !== 'all' && subcategories[selectedCategory] && (
          <StyledSelect
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          >
            {subcategories[selectedCategory].map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </StyledSelect>
        )}
      </StyledFilterGroup>
    </StyledFilterContainer>
  );
};

export default CategoryFilter; 