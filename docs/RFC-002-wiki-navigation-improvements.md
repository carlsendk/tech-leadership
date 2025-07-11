# RFC 002: Wiki Navigation Improvements

**Status:** Draft  
**Type:** Feature  
**Created:** 2024-07-11  
**Author:** Technical Leadership Team  

## Summary

This RFC proposes improvements to the wiki navigation system to create a more cohesive, hierarchical, and user-friendly experience. The current implementation has several issues with breadcrumb navigation, virtual structure utilization, and overall wiki landing page experience.

## Background

The current wiki system combines blog and wiki content but lacks proper wiki-specific navigation patterns. The main issues identified are:

1. **Wiki Landing Page**: `/wiki` should be a dedicated wiki landing page with proper navigation
2. **Breadcrumb Issues**: Current breadcrumbs don't utilize the virtual structure properly
3. **Navigation Hierarchy**: Missing proper hierarchical navigation for wiki content
4. **Content Organization**: Need better categorization and navigation patterns

## Current State Analysis

### Wiki Landing Page (`/wiki`)
- **Current**: Shows a grid layout of all wiki entries organized by category
- **Issues**: 
  - No clear wiki-specific navigation
  - Mixed with blog-style presentation
  - Missing hierarchical structure visualization
  - No clear entry point for wiki exploration

### Breadcrumb Navigation
- **Current**: Hardcoded breadcrumbs in `WikiLayout.astro`
- **Issues**:
  - Doesn't reflect actual file structure
  - Uses category URLs instead of wiki URLs
  - Missing subcategory support
  - No dynamic generation based on content structure

### Wiki Sidebar
- **Current**: Shows all categories and entries in a flat structure
- **Issues**:
  - No clear hierarchy visualization
  - Missing breadcrumb integration
  - No "current page" highlighting in context
  - Limited navigation patterns

### Content Structure
- **Current**: Uses `category` and `subcategory` metadata
- **Issues**:
  - Inconsistent use of virtual structure
  - Missing proper index pages
  - No clear navigation hierarchy

## Proposed Solution

### 1. Wiki Landing Page Redesign

**Goal**: Create a dedicated wiki landing page that serves as the main entry point for wiki navigation.

**Implementation**:
```astro
<!-- New wiki landing page structure -->
<Layout title="Technical Leadership Wiki">
  <div class="wiki-landing">
    <!-- Wiki-specific header -->
    <header class="wiki-header">
      <h1>Technical Leadership Wiki</h1>
      <p>Comprehensive knowledge base for technical leadership</p>
    </header>
    
    <!-- Main navigation sections -->
    <nav class="wiki-main-nav">
      <!-- Category cards with descriptions -->
      <!-- Quick access to recent/featured content -->
      <!-- Search integration -->
    </nav>
  </div>
</Layout>
```

### 2. Dynamic Breadcrumb System

**Goal**: Create breadcrumbs that reflect the actual content hierarchy and virtual structure.

**Implementation**:
```typescript
interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
  type: 'wiki' | 'category' | 'subcategory' | 'page';
}

function generateWikiBreadcrumbs(entry: WikiEntry): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Wiki', href: '/wiki', type: 'wiki' }
  ];
  
  if (entry.data.category) {
    const categoryIndex = getCategoryIndex(entry.data.category);
    if (categoryIndex) {
      breadcrumbs.push({
        label: entry.data.category,
        href: getWikiUrl(categoryIndex.slug),
        type: 'category'
      });
    }
  }
  
  if (entry.data.subcategory) {
    const subcategoryIndex = getSubcategoryIndex(entry.data.category, entry.data.subcategory);
    if (subcategoryIndex) {
      breadcrumbs.push({
        label: entry.data.subcategory,
        href: getWikiUrl(subcategoryIndex.slug),
        type: 'subcategory'
      });
    }
  }
  
  breadcrumbs.push({
    label: entry.data.title,
    href: getWikiUrl(entry.slug),
    current: true,
    type: 'page'
  });
  
  return breadcrumbs;
}
```

### 3. Enhanced Wiki Sidebar

**Goal**: Create a hierarchical navigation sidebar that shows the current context and provides better navigation.

**Implementation**:
```astro
<!-- Enhanced WikiSidebar component -->
<nav class="wiki-sidebar">
  <!-- Current page context -->
  <div class="current-context">
    <h3>Current Section</h3>
    <!-- Show current category/subcategory -->
  </div>
  
  <!-- Hierarchical navigation -->
  <div class="wiki-hierarchy">
    <!-- Category level -->
    <!-- Subcategory level -->
    <!-- Page level -->
  </div>
  
  <!-- Related content -->
  <div class="related-content">
    <!-- Sibling pages -->
    <!-- Parent/child relationships -->
  </div>
</nav>
```

### 4. Content Structure Improvements

**Goal**: Better utilize the virtual structure and create proper index pages.

**Implementation**:
```typescript
// Enhanced content schema
interface WikiEntry {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  order: number;
  isIndex?: boolean;
  parent?: string; // Reference to parent page
  children?: string[]; // References to child pages
  breadcrumb?: string[]; // Explicit breadcrumb path
}
```

## Technical Implementation

### 1. New Wiki Landing Page Component

Create `src/components/WikiLanding.astro`:
```astro
---
import { getCollection } from "astro:content";
import { getWikiUrl } from "../utils/url";

// Get all wiki entries and organize by hierarchy
const wikiEntries = await getCollection("wiki", ({ data }) => !data.draft);

// Organize into proper hierarchy
const wikiHierarchy = buildWikiHierarchy(wikiEntries);
---

<div class="wiki-landing">
  <!-- Implementation details -->
</div>
```

### 2. Dynamic Breadcrumb Component

Enhance `src/components/Breadcrumb.astro`:
```astro
---
// Add support for dynamic wiki breadcrumbs
export interface WikiBreadcrumbProps {
  entry: CollectionEntry<"wiki">;
}

function generateWikiBreadcrumbs(entry: CollectionEntry<"wiki">) {
  // Implementation for dynamic breadcrumb generation
}
---
```

### 3. Enhanced Wiki Layout

Update `src/layouts/WikiLayout.astro`:
```astro
---
// Use dynamic breadcrumbs
const breadcrumbs = generateWikiBreadcrumbs(entry);
---

<Layout title={title} description={description}>
  <div class="wiki-layout">
    <!-- Enhanced sidebar with context -->
    <WikiSidebar 
      activeCategory={category} 
      activeSubcategory={entry.data.subcategory}
      currentEntry={entry}
    />
    
    <!-- Main content with dynamic breadcrumbs -->
    <main class="wiki-main">
      <Breadcrumb items={breadcrumbs} />
      <!-- Content -->
    </main>
  </div>
</Layout>
```

## Migration Strategy

### Phase 1: Foundation (Week 1)
1. Create new WikiLanding component
2. Implement dynamic breadcrumb generation
3. Update WikiLayout to use new breadcrumbs

### Phase 2: Enhanced Navigation (Week 2)
1. Enhance WikiSidebar with context awareness
2. Add hierarchical navigation patterns
3. Implement related content sections

### Phase 3: Content Structure (Week 3)
1. Update content schema with new metadata
2. Create missing index pages
3. Implement proper virtual structure utilization

### Phase 4: Polish & Testing (Week 4)
1. UI/UX improvements
2. Testing and bug fixes
3. Documentation updates

## Success Metrics

1. **Navigation Efficiency**: Users can find content in fewer clicks
2. **Breadcrumb Accuracy**: Breadcrumbs reflect actual content hierarchy
3. **User Experience**: Improved wiki landing page engagement
4. **Content Discovery**: Better related content suggestions

## Risks and Mitigation

### Risk: Breaking existing URLs
**Mitigation**: Maintain backward compatibility during migration

### Risk: Performance impact of dynamic breadcrumbs
**Mitigation**: Implement caching for breadcrumb generation

### Risk: Content structure inconsistencies
**Mitigation**: Create migration scripts and validation tools

## Alternatives Considered

1. **Static Breadcrumbs**: Keep current approach but improve accuracy
2. **Third-party Navigation**: Use existing navigation libraries
3. **Minimal Changes**: Only fix breadcrumb issues without full redesign

## Conclusion

This RFC proposes a comprehensive improvement to the wiki navigation system that will create a more intuitive, hierarchical, and user-friendly experience. The implementation focuses on proper utilization of the virtual structure, dynamic breadcrumb generation, and enhanced navigation patterns.

The proposed changes will transform the wiki from a simple content listing to a proper knowledge base with clear navigation hierarchy and improved user experience. 