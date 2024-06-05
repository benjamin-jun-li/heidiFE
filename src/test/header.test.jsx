import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/components/header';
import HeidiSvg from '@/assets/heidi.svg';

describe('Header', () => {
  it('renders the header with logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const logoImage = screen.getByAltText('heidi logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', HeidiSvg);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const contactLink = screen.getByRole('link', { name: 'Contact us' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '#footer');
  });
});