import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HeroSection } from './HeroSection';

jest.mock('../../context/PortfolioContext', () => ({ usePortfolio: jest.fn() }));

test('leaves the hero text-only when only an avatar or old bundled portrait is configured', () => {
  usePortfolio.mockReturnValue({ profile: { profileImage: '/avatar.png' } });
  const { container, rerender } = render(<HeroSection activeRole="personal" />);
  expect(container.querySelector('#home img')).toBeNull();

  usePortfolio.mockReturnValue({ profile: { heroImagePersonal: '/static/media/person.e7fd88a0.png' } });
  rerender(<HeroSection activeRole="personal" />);
  expect(container.querySelector('#home img')).toBeNull();
});

test('removes a failed portrait and renders the configured image for the next role', () => {
  usePortfolio.mockReturnValue({
    profile: {
      heroImagePersonal: 'https://ik.imagekit.io/example/personal.webp',
      heroImageDeveloper: 'https://ik.imagekit.io/example/developer.webp'
    }
  });
  const { container, rerender } = render(<HeroSection activeRole="personal" />);
  const portrait = container.querySelector('#home img');
  expect(portrait).toHaveAttribute('src', 'https://ik.imagekit.io/example/personal.webp');

  fireEvent.error(portrait);
  expect(container.querySelector('#home img')).toBeNull();

  rerender(<HeroSection activeRole="developer" />);
  expect(container.querySelector('#home img')).toHaveAttribute('src', 'https://ik.imagekit.io/example/developer.webp');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build robust software');
});
