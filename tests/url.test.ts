import { strict as assert } from 'node:assert';
async function loadUtils() {
  return await import('../src/utils/url');
}

describe('url utilities', () => {
  it('builds full URL with base path', async () => {
    const original = process.env.BASE_URL;
    process.env.BASE_URL = 'test';
    const { getFullUrl } = await loadUtils();
    const result = getFullUrl('blog/post');
    assert.equal(result, '/test/blog/post/');
    process.env.BASE_URL = original;
  });

  it('cleans wiki slugs', async () => {
    const original = process.env.BASE_URL;
    process.env.BASE_URL = 'test';
    const { getWikiUrl } = await loadUtils();
    const result = getWikiUrl('dir\\post');
    assert.equal(result, '/test/wiki/dir/post/');
    process.env.BASE_URL = original;
  });
});
