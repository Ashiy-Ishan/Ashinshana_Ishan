import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

jest.mock('./config/firebase', () => ({
  auth: null,
  db: null,
  isFirebaseConfigured: false
}));

test('renders brand name and core roles', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/ASHINSHANA/i);
  expect(brandElements.length).toBeGreaterThan(0);
});

test('switches views from the portfolio map and exposes their section links', () => {
  render(<App />);
  const map = screen.getByRole('navigation', { name: 'Portfolio map' });
  const developer = within(map).getByRole('button', { name: 'Developer' });

  fireEvent.click(developer);

  expect(developer).toHaveAttribute('aria-pressed', 'true');
  expect(within(map).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
  expect(window.location.hash).toBe('#view-developer');
  window.history.replaceState(null, '', '/');
});

test('opens a direct section link in its role and restores a shared anchor’s saved role', () => {
  window.history.replaceState(null, '', '/#videos');
  render(<App />);

  const map = screen.getByRole('navigation', { name: 'Portfolio map' });
  expect(within(map).getByRole('button', { name: 'Creator' })).toHaveAttribute('aria-pressed', 'true');
  expect(within(map).getByRole('link', { name: 'Videos' })).toHaveAttribute('aria-current', 'location');

  window.history.replaceState({ portfolioRole: 'developer' }, '', '/#portfolio-map');
  fireEvent(window, new HashChangeEvent('hashchange'));

  expect(within(map).getByRole('button', { name: 'Developer' })).toHaveAttribute('aria-pressed', 'true');
  window.history.replaceState(null, '', '/');
});

test('keeps the contact draft when Firebase is unavailable', async () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex' } });
  fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'alex@example.com' } });
  const message = screen.getByLabelText(/^message/i);
  fireEvent.change(message, { target: { value: 'Can we discuss a project?' } });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Your message couldn’t be sent.');
  expect(message).toHaveValue('Can we discuss a project?');
  expect(screen.queryByText('Message sent')).not.toBeInTheDocument();
});
