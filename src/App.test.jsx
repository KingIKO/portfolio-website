import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('portfolio', () => {
  it('presents the owner and only HallPass as an independent project', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'I build the systems behind reliable software.' })).toBeVisible();
    const projects = screen.getByRole('region', { name: 'Independent project' });
    expect(within(projects).getAllByRole('article')).toHaveLength(1);
    expect(within(projects).getByRole('link', { name: /visit hallpass/i })).toHaveAttribute('href', 'https://hallpass.me');
    expect(screen.getByRole('heading', { name: 'Sellfire' })).toBeVisible();
    expect(screen.getAllByRole('heading', { name: 'Rapptr Labs' })).toHaveLength(2);
  });

  it('persists the theme preference and restores it on the next visit', () => {
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    unmount();
    render(<App />);
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });

  it('works when the browser blocks preference storage', () => {
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    try {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    } finally { get.mockRestore(); set.mockRestore(); }
  });

  it('exposes a direct contact path and public resume', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:kingsleyiokoli@gmail.com');
    expect(screen.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', './Kingsley-Okoli-Public-Resume.pdf');
  });
});
