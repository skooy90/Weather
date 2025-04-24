import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
  padding: 0 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.$active ? '#4299e1' : '#e2e8f0'};
  border-radius: 9999px;
  background-color: ${props => props.$active ? '#4299e1' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#4a5568'};
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: ${props => props.$active ? '0 2px 4px rgba(66, 153, 225, 0.3)' : 'none'};

  &:hover {
    background-color: ${props => props.$active ? '#3182ce' : '#f7fafc'};
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const FilterBar = ({
  categories = [],
  selectedCategory,
  onSelectCategory
}) => {
  const { t } = useTranslation();

  return (
    <FilterContainer>
      {categories.map((category) => (
        <FilterButton
          key={category.id}
          $active={selectedCategory === category.id}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default FilterBar; 