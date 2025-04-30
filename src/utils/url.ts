/**
 * Utility functions for handling URLs consistently across the project
 */

const baseUrl = import.meta.env.BASE_URL;

/**
 * Ensures a URL is properly prefixed with the base URL
 */
export function getFullUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // If baseUrl is empty or '/', just return the path
  if (!baseUrl || baseUrl === '/') {
    return `/${cleanPath}`;
  }
  return `${baseUrl}${cleanPath}`;
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
 */
export function getCategoryUrl(category: string): string {
  return getFullUrl(`categories/${encodeURIComponent(category)}`);
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