/* eslint-env vitest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  it('renders hero heading', () => {
    render(<Home />);
    const heading = screen.getByText(/Maffy Online/i);
    expect(heading).toBeInTheDocument();
  });
});
