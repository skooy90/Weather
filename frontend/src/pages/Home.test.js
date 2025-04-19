import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('renders welcome message', () => {
    render(<Home />);
    const welcomeElement = screen.getByText(/환영합니다/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it('renders product list', () => {
    render(<Home />);
    const productList = screen.getByTestId('product-list');
    expect(productList).toBeInTheDocument();
  });

  it('renders featured products', () => {
    render(<Home />);
    const featuredProducts = screen.getByTestId('featured-products');
    expect(featuredProducts).toBeInTheDocument();
  });
}); 