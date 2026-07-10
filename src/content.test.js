import { describe, expect, it } from 'vitest';
import { caseStudies, metrics, projects } from './content';

describe('portfolio content model', () => {
  it('keeps every public employer case study anonymized', () => {
    const serialized = JSON.stringify(caseStudies).toLowerCase();
    expect(serialized).not.toContain('sellfire');
    expect(serialized).not.toContain('rapptr');
    expect(serialized).not.toMatch(/\bsel-\d+/);
  });

  it('gives every employer case a timeframe, scale anchor, and sanitized receipt', () => {
    for (const study of caseStudies) {
      expect(study.timeframe).toMatch(/^20\d{2}/);
      expect(study.context.length).toBeGreaterThan(20);
      expect(study.artifact.href).toMatch(/^\.\/case-files\/index\.html#/);
      expect(study.artifact.label).toMatch(/case file/i);
    }
  });

  it('uses only sourced headline metrics', () => {
    expect(metrics.map((metric) => metric.value)).toEqual(
      expect.arrayContaining(['240+', '190', '1,300+', '770+', '2 years'])
    );
    expect(metrics.every((metric) => metric.source)).toBe(true);
  });

  it('excludes projects the owner removed from the public portfolio', () => {
    const names = projects.map((project) => project.name);
    expect(names).not.toContain('ProteinScout');
    expect(names).not.toContain('Claude Token Dashboard');
  });

  it('features public systems with concrete proof and a clear destination', () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(projects.every((project) => project.proof.length > 0)).toBe(true);
    expect(projects.every((project) => project.action?.href && project.action?.label)).toBe(true);
  });

  it('features Hallpass as the sole flagship system', () => {
    expect(projects.filter((project) => project.featured).map((project) => project.id)).toEqual(['hallpass']);
  });
});
