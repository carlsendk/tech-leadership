import {
  getWikiUrl,
  getBlogUrl,
  getHomeUrl,
  getFullUrl,
  getCategoryUrl,
  getTagUrl,
  getAboutUrl,
  getBlogIndexUrl,
  getWikiIndexUrl,
  getCategoriesIndexUrl,
  getTagsIndexUrl,
} from '../src/utils/url';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('url helpers', () => {
  beforeEach(() => {
    process.env.BASE_URL = 'tech-leadership';
    (import.meta as any).env = {};
  });

  afterEach(() => {
    delete process.env.BASE_URL;
    delete (import.meta as any).env;
  });

  it('creates wiki URLs with base path', () => {
    expect(getWikiUrl('foo')).toBe('/tech-leadership/wiki/foo/');
    expect(getWikiUrl('foo\\bar')).toBe('/tech-leadership/wiki/foo/bar/');
  });

  it('creates blog URLs with base path', () => {
    expect(getBlogUrl('bar')).toBe('/tech-leadership/blog/bar/');
  });

  it('generates various URLs', () => {
    expect(getHomeUrl()).toBe('/tech-leadership/');
    expect(getAboutUrl()).toBe('/tech-leadership/about/');
    expect(getCategoryUrl('foo')).toBe('/tech-leadership/categories/foo/');
    expect(getTagUrl('c++')).toBe('/tech-leadership/tags/c%2B%2B/');
    expect(getBlogIndexUrl()).toBe('/tech-leadership/blog/');
    expect(getWikiIndexUrl()).toBe('/tech-leadership/wiki/');
    expect(getCategoriesIndexUrl()).toBe('/tech-leadership/categories/');
    expect(getTagsIndexUrl()).toBe('/tech-leadership/tags/');
  });

  it('avoids double prefixing', () => {
    expect(getFullUrl('/tech-leadership/about')).toBe('/tech-leadership/about/');
  });

  it('responds to env changes dynamically', () => {
    process.env.BASE_URL = 'first';
    expect(getHomeUrl()).toBe('/first/');
    process.env.BASE_URL = 'second';
    expect(getHomeUrl()).toBe('/second/');
  });
});

describe('url helpers without base url', () => {
  beforeEach(() => {
    delete process.env.BASE_URL;
    (import.meta as any).env = {};
  });

  it('generates root urls', () => {
    expect(getHomeUrl()).toBe('/');
    expect(getBlogUrl('post')).toBe('/blog/post/');
  });
});


