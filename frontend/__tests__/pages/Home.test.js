import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/Home';

// API 모크
jest.mock('../../src/utils/api', () => ({
  getProducts: jest.fn().mockResolvedValue([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ])
}));

describe('Home Component', () => {
  it('renders welcome message', () => {
    render(<Home />);
    const welcomeElement = screen.getByText(/환영합니다/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it('renders product list', async () => {
    render(<Home />);
    const productList = await screen.findByTestId('product-list');
    expect(productList).toBeInTheDocument();
  });

  it('renders featured products', async () => {
    render(<Home />);
    const featuredProducts = await screen.findByTestId('featured-products');
    expect(featuredProducts).toBeInTheDocument();
  });
}); 