import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminDashboard } from './AdminDashboard';

jest.mock('../../context/AuthContext');
jest.mock('../../context/PortfolioContext');

test('opens the inbox from the overview and keeps all editor sections in navigation', () => {
  useAuth.mockReturnValue({
    isAuthenticated: true,
    currentUser: { email: 'admin@example.com' },
    loading: false
  });
  usePortfolio.mockReturnValue({
    skills: [],
    projects: [],
    publishedProjects: [],
    youtubeVideos: [],
    achievements: [],
    gallery: [],
    contactMessages: [{
      id: 'message-1',
      subject: 'Portfolio inquiry',
      name: 'Alex',
      email: 'alex@example.com',
      message: 'Can we discuss a project?'
    }]
  });

  render(<AdminDashboard />);

  const navigation = screen.getByRole('navigation', { name: 'Portfolio management' });
  expect(within(navigation).getAllByRole('button')).toHaveLength(13);

  fireEvent.click(screen.getByRole('button', { name: '1 Inbox' }));
  expect(screen.getByRole('main', { name: 'Inbox' })).toHaveFocus();
  expect(within(navigation).getByRole('button', { name: 'Inbox' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByText('Can we discuss a project?')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Reply' })).toHaveAttribute(
    'href', 'mailto:alex@example.com?subject=Re%3A%20Portfolio%20inquiry'
  );
});
