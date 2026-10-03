import { describe, expect, it } from 'vitest';
import { caseStudies, experience, projects } from './content';

describe('public content boundaries', () => {
  it('features only the owner-approved independent project', () => {
    expect(projects.map(({ name }) => name)).toEqual(['HallPass']);
  });
  it('keeps real employer names in career history and internal identifiers out of case studies', () => {
    expect([...new Set(experience.map(({ company }) => company))]).toEqual(['Sellfire', 'Rapptr Labs']);
    expect(JSON.stringify(caseStudies)).not.toMatch(/\bSEL-\d+|Sellfire|Rapptr|zero false|unsupervised|240\+|770\+/i);
  });
});
