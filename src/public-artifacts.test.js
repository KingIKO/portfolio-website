import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const resume = readFileSync(resolve('public/Kingsley-Okoli-Public-Resume.html'), 'utf8');
const cases = readFileSync(resolve('public/case-files/index.html'), 'utf8');

describe('public downloads and legacy pages', () => {
  it('keeps excluded projects and old autonomy claims out of published artifacts', () => {
    for (const content of [resume, cases]) {
      expect(content).not.toMatch(/E7 Advisor|Second Brain|ProteinScout|Claude Token Dashboard|zero false bug reports|run unsupervised/i);
    }
  });
  it('uses the corrected career history and public contact information', () => {
    expect(resume).toContain('Sellfire');
    expect(resume).toContain('Rapptr Labs');
    expect(resume).toContain('hallpass.me');
    expect(resume).not.toContain('862-216-4174');
  });
});
