import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const publicResume = readFileSync(
  resolve(process.cwd(), 'public/Kingsley-Okoli-Public-Resume.html'),
  'utf8'
);

describe('public portfolio artifacts', () => {
  it('excludes projects removed by the owner from the public resume', () => {
    expect(publicResume).not.toContain('ProteinScout');
    expect(publicResume).not.toContain('Claude Token Dashboard');
  });
});
