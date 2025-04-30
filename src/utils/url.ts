/**
 * Utility functions for handling URLs consistently across the project
 */

// Get base URL from environment, ensuring it starts with a slash and has no trailing slash
const baseUrl = (import.meta.env.BASE_URL || '').replace(/^\/+|\/+$/g, '');

// Debug log
console.log('BASE_URL:', import.meta.env.BASE_URL);
console.log('Cleaned baseUrl:', baseUrl);

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
  return getFullUrl(`wiki/${slug}`);
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