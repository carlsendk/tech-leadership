/**
 * Utility functions for handling URLs consistently across the project
 */

// Get base URL from environment on demand. When running in Vitest or Node, `import.meta.env`
// is typically undefined, so we fall back to `process.env.BASE_URL`.
function getBaseUrl(): string {
  const envBase = typeof import.meta !== 'undefined' ? (import.meta as any).env?.BASE_URL : undefined;
  const rawBase = envBase && envBase !== '/' ? envBase : process.env.BASE_URL ?? '';
  return (rawBase || '').replace(/^\/+|\/+$/g, '');
}


// Test cases:
// baseUrl = "tech-leadership"
// getFullUrl("")              -> "/tech-leadership/"
// getFullUrl("/")            -> "/tech-leadership/"
// getFullUrl("blog")         -> "/tech-leadership/blog/"
// getFullUrl("/blog")        -> "/tech-leadership/blog/"
// getFullUrl("blog/")        -> "/tech-leadership/blog/"
// getFullUrl("/blog/")       -> "/tech-leadership/blog/"

/**
 * Ensures a URL is properly prefixed with the base URL and has a trailing slash
 */
export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl();
  // Handle empty path or root path specially
  if (!path || path === '/' || path === '') {
    return baseUrl ? `/${baseUrl}/` : '/';
  }

  // Remove leading and trailing slashes if present
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  // Check if the path already includes the base URL to prevent duplication
  if (baseUrl && cleanPath.startsWith(baseUrl + '/')) {
    return '/' + cleanPath + '/';
  }
  
  // Return URL with proper base path and trailing slash
  return baseUrl ? `/${baseUrl}/${cleanPath}/` : `/${cleanPath}/`;
}

/**
 * Creates a URL for the home page
 */
export function getHomeUrl(): string {
  const baseUrl = getBaseUrl();
  return baseUrl ? `/${baseUrl}/` : '/';
}

/**
 * Creates a URL for a blog post
 */
export function getBlogUrl(slug: string): string {
  return getFullUrl(`blog/${slug}`);
}

/**
 * Creates a URL for a wiki entry
 */
export function getWikiUrl(slug: string): string {
  // Replace any backslashes with forward slashes and ensure no double slashes
  const cleanSlug = slug.replace(/\\/g, '/').replace(/\/+/g, '/');
  // Handle _index files specially
  if (cleanSlug.endsWith('/_index')) {
    return getFullUrl(`wiki/${cleanSlug.replace('/_index', '')}`);
  }
  return getFullUrl(`wiki/${cleanSlug}`);
}

/**
 * Creates a URL for a category
 * Note: We don't encode the category here since Astro's dynamic routes expect the raw value
 */
export function getCategoryUrl(category: string): string {
  return getFullUrl(`categories/${category}`);
}

/**
 * Creates a URL for a tag
 */
export function getTagUrl(tag: string): string {
  return getFullUrl(`tags/${encodeURIComponent(tag)}`);
}

/**
 * Creates a URL for the about page
 */
export function getAboutUrl(): string {
  return getFullUrl('about');
}

/**
 * Creates a URL for the blog index
 */
export function getBlogIndexUrl(): string {
  return getFullUrl('blog');
}

/**
 * Creates a URL for the wiki index
 */
export function getWikiIndexUrl(): string {
  return getFullUrl('wiki');
}

/**
 * Creates a URL for the categories index
 */
export function getCategoriesIndexUrl(): string {
  return getFullUrl('categories');
}

/**
 * Creates a URL for the tags index
 */
export function getTagsIndexUrl(): string {
  return getFullUrl('tags');
} 
