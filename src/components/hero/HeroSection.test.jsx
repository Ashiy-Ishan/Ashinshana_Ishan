import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HeroSection } from './HeroSection';

jest.mock('../../context/PortfolioContext', () => ({ usePortfolio: jest.fn() }));

test('does not load a configured hero portrait by default', () => {
  usePortfolio.mockReturnValue({ profile: { heroImagePersonal: 'https://ik.imagekit.io/example/personal.webp' } });
  const { container } = render(<HeroSection activeRole="personal" />);
  expect(container.querySelector('#home img')).toBeNull();
});

test('leaves the hero text-only when only an avatar or old bundled portrait is configured', () => {
  usePortfolio.mockReturnValue({ profile: { profileImage: '/avatar.png' } });
  const { container, rerender } = render(<HeroSection showPortrait activeRole="personal" />);
  expect(container.querySelector('#home img')).toBeNull();

  usePortfolio.mockReturnValue({ profile: { heroImagePersonal: '/static/media/person.e7fd88a0.png' } });
  rerender(<HeroSection showPortrait activeRole="personal" />);
  expect(container.querySelector('#home img')).toBeNull();
});

test('reveals loaded portraits, removes a failed portrait, and renders the configured image for the next role', () => {
  usePortfolio.mockReturnValue({
    profile: {
      heroImagePersonal: 'https://ik.imagekit.io/example/personal.webp',
      heroImageDeveloper: 'https://ik.imagekit.io/example/developer.webp'
    }
  });
  const { container, rerender } = render(<HeroSection showPortrait activeRole="personal" />);
  const portrait = container.querySelector('#portfolio-map .portfolio-map-hub img');
  expect(portrait).toHaveAttribute('src', 'https://ik.imagekit.io/example/personal.webp');
  expect(portrait.parentElement).toHaveAttribute('data-image-state', 'loading');
  fireEvent.load(portrait);
  expect(portrait.parentElement).toHaveAttribute('data-image-state', 'ready');

  fireEvent.error(portrait);
  expect(container.querySelector('#home img')).toBeNull();

  rerender(<HeroSection showPortrait activeRole="developer" />);
  const developerPortrait = container.querySelector('#portfolio-map .portfolio-map-hub img');
  expect(developerPortrait).toHaveAttribute('src', 'https://ik.imagekit.io/example/developer.webp');
  expect(developerPortrait.parentElement).toHaveAttribute('data-image-state', 'loading');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build robust software');
});

test('uses graph nodes to select roles and lists the current branch destinations', () => {
  usePortfolio.mockReturnValue({ profile: {}, publishedProjects: [] });
  const selectRole = jest.fn();
  const { rerender } = render(<HeroSection activeRole="personal" setActiveRole={selectRole} />);
  const map = screen.getByRole('navigation', { name: 'Portfolio map' });
  expect(within(map).getByRole('button', { name: 'Personal' })).toHaveAttribute('aria-pressed', 'true');

  fireEvent.click(within(map).getByRole('button', { name: 'Developer' }));
  expect(selectRole).toHaveBeenCalledWith('developer');

  rerender(<HeroSection activeRole="developer" activeSection="skills" setActiveRole={selectRole} />);
  expect(within(map).getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'location');
  expect(within(map).queryByRole('link', { name: 'Releases' })).not.toBeInTheDocument();
});
