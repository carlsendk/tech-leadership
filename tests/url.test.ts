import { describe, it, expect, beforeEach } from 'vitest';
import { getWikiUrl, getBlogUrl } from '../src/utils/url';

describe('url helpers', () => {
  beforeEach(() => {
    process.env.BASE_URL = 'tech-leadership';
  });

  it('creates wiki URLs with base path', () => {
    expect(getWikiUrl('foo')).toBe('/tech-leadership/wiki/foo/');
  });

  it('creates blog URLs with base path', () => {
    expect(getBlogUrl('bar')).toBe('/tech-leadership/blog/bar/');
  });
});


