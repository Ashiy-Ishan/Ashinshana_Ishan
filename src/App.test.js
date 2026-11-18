import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('renders identity role switcher buttons', () => {
  render(<App />);
  const devButtons = screen.getAllByText(/DEVELOPER/i);
  const creatorButtons = screen.getAllByText(/CREATOR/i);
  expect(devButtons.length).toBeGreaterThan(0);
  expect(creatorButtons.length).toBeGreaterThan(0);
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
