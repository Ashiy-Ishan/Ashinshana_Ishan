import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name and core roles', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/ASHIY ISHAN/i);
  expect(brandElements.length).toBeGreaterThan(0);
});

test('renders identity role switcher buttons', () => {
  render(<App />);
  const devButtons = screen.getAllByText(/DEVELOPER/i);
  const creatorButtons = screen.getAllByText(/CREATOR/i);
  expect(devButtons.length).toBeGreaterThan(0);
  expect(creatorButtons.length).toBeGreaterThan(0);
});
