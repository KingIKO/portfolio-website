import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('portfolio shell', () => {
  it('presents the AI reliability positioning and evidence-led structure', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'AI Reliability Engineer' })).toBeInTheDocument();
    expect(screen.getByText('Quality Systems Architect', { selector: '.hero__role' })).toBeInTheDocument();

    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getAllByRole('article', { name: /case study/i })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /open sanitized case file/i })).toHaveLength(3);
    expect(screen.getByRole('region', { name: /systems lab/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /visit hallpass|request private walkthrough/i })).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Hallpass' }).closest('article')).toHaveClass('project-card--featured');
    expect(screen.getByRole('heading', { name: 'E7 Advisor' }).closest('article')).not.toHaveClass('project-card--featured');
  });

  it('exposes motion control and a direct contact path', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /pause motion/i })).toBeInTheDocument();
    const contact = screen.getByRole('region', { name: /contact/i });
    expect(within(contact).getByRole('link', { name: /start a conversation/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:/)
    );
  });
});
