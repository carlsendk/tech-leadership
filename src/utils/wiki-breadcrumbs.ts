import type { CollectionEntry } from "astro:content";
import { getWikiUrl } from "./url";

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
  type: 'wiki' | 'category' | 'subcategory' | 'page';
}

export interface WikiEntry extends CollectionEntry<"wiki"> {}

/**
 * Generate breadcrumbs for a wiki entry based on its metadata and structure
 */
export function generateWikiBreadcrumbs(
  entry: WikiEntry,
  allEntries: WikiEntry[]
): BreadcrumbItem[] {
  // Special case for wiki landing page
  if (entry.slug === "wiki" || entry.data.category === "Wiki") {
    return [
      {
        label: 'Technical Leadership Wiki',
        href: '/tech-leadership/wiki/',
        current: true,
        type: 'wiki'
      }
    ];
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { 
      label: 'Wiki', 
      href: '/tech-leadership/wiki/', 
      type: 'wiki' 
    }
  ];

  // Add category breadcrumb if it exists
  if (entry.data.category) {
    const categoryIndex = findCategoryIndex(entry.data.category, allEntries);
    if (categoryIndex) {
      breadcrumbs.push({
        label: entry.data.category,
        href: getWikiUrl(categoryIndex.slug),
        type: 'category'
      });
    } else {
      // If no index page exists, still show category but link to category page
      breadcrumbs.push({
        label: entry.data.category,
        href: `/tech-leadership/categories/${encodeURIComponent(entry.data.category)}/`,
        type: 'category'
      });
    }
  }

  // Add subcategory breadcrumb if it exists
  if (entry.data.subcategory) {
    const subcategoryIndex = findSubcategoryIndex(
      entry.data.category, 
      entry.data.subcategory, 
      allEntries
    );
    if (subcategoryIndex) {
      breadcrumbs.push({
        label: entry.data.subcategory,
        href: getWikiUrl(subcategoryIndex.slug),
        type: 'subcategory'
      });
    } else {
      // If no index page exists, show subcategory without link
      breadcrumbs.push({
        label: entry.data.subcategory,
        href: '#',
        type: 'subcategory'
      });
    }
  }

  // Add current page - but only if it's not an index page or if the title is different from subcategory
  const isIndexPage = entry.data.isIndex;
  const isSubcategoryIndex = isIndexPage && entry.data.subcategory;
  const titleSameAsSubcategory = entry.data.subcategory && entry.data.title === entry.data.subcategory;
  
  // Only add current page breadcrumb if:
  // 1. It's not a subcategory index page, OR
  // 2. It's a subcategory index page but the title is different from subcategory
  if (!isSubcategoryIndex || !titleSameAsSubcategory) {
    breadcrumbs.push({
      label: entry.data.title,
      href: getWikiUrl(entry.slug),
      current: true,
      type: 'page'
    });
  } else {
    // For subcategory index pages with same title as subcategory, mark the subcategory as current
    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    if (lastBreadcrumb && lastBreadcrumb.type === 'subcategory') {
      lastBreadcrumb.current = true;
    }
  }

  return breadcrumbs;
}

/**
 * Find the index page for a category
 */
export function findCategoryIndex(category: string, allEntries: WikiEntry[]): WikiEntry | null {
  return allEntries.find(entry => 
    entry.data.category === category && 
    entry.data.isIndex && 
    !entry.data.subcategory
  ) || null;
}

/**
 * Find the index page for a subcategory
 */
export function findSubcategoryIndex(
  category: string, 
  subcategory: string, 
  allEntries: WikiEntry[]
): WikiEntry | null {
  const found = allEntries.find(entry => 
    entry.data.category === category && 
    entry.data.subcategory === subcategory && 
    entry.data.isIndex
  ) || null;
  if (!found) {
    console.warn('[Breadcrumbs] Subcategory index not found:', { category, subcategory });
    const candidates = allEntries.filter(entry => entry.data.category === category && entry.data.subcategory === subcategory);
    console.warn('[Breadcrumbs] Candidates:', candidates.map(e => ({ slug: e.slug, isIndex: e.data.isIndex, title: e.data.title })));
  }
  return found;
}

/**
 * Build a hierarchical structure of wiki entries
 */
export function buildWikiHierarchy(entries: WikiEntry[]) {
  const hierarchy: Record<string, {
    index?: WikiEntry;
    entries: WikiEntry[];
    subcategories: Record<string, {
      index?: WikiEntry;
      entries: WikiEntry[];
    }>;
  }> = {};

  entries.forEach(entry => {
    const category = entry.data.category;
    const subcategory = entry.data.subcategory;

    if (!hierarchy[category]) {
      hierarchy[category] = { entries: [], subcategories: {} };
    }

    if (entry.data.isIndex) {
      if (subcategory) {
        if (!hierarchy[category].subcategories[subcategory]) {
          hierarchy[category].subcategories[subcategory] = { entries: [] };
        }
        hierarchy[category].subcategories[subcategory].index = entry;
      } else {
        hierarchy[category].index = entry;
      }
    } else if (subcategory) {
      if (!hierarchy[category].subcategories[subcategory]) {
        hierarchy[category].subcategories[subcategory] = { entries: [] };
      }
      hierarchy[category].subcategories[subcategory].entries.push(entry);
    } else {
      hierarchy[category].entries.push(entry);
    }
  });

  return hierarchy;
} 