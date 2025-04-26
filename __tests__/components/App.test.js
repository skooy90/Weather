import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../src/App';

// 테스트용 모크 컴포넌트
jest.mock('../../src/components/Navbar', () => () => <nav data-testid="navbar">Navbar</nav>);
jest.mock('../../src/components/Footer', () => () => <footer data-testid="footer">Footer</footer>);
jest.mock('../../src/pages/Home', () => () => <div data-testid="home-page">Home Page</div>);

describe('App Component', () => {
  it('renders navigation bar', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const navElement = screen.getByTestId('navbar');
    expect(navElement).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const homeElement = screen.getByTestId('home-page');
    expect(homeElement).toBeInTheDocument();
  });
}); 