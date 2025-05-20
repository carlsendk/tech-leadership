# RFC 001: Wiki Structure and Navigation

## Background
The current wiki implementation needs improvements to support a more organized, hierarchical structure with better navigation and content organization.

## Proposed Changes

### 1. Virtual Structure
- Implement category-based organization
- Support nested subcategories
- Allow virtual paths while maintaining physical file structure
- Enable category index/intro pages

### 2. Navigation Improvements
- Enhanced left sidebar with full category tree
- Collapsible category sections
- Visual indicators for current location
- Breadcrumb navigation

### 3. Content Organization
- Category index pages
- Ordered content within categories
- Related content suggestions
- Previous/Next navigation

### 4. File Structure
```
src/content/wiki/
├── [category]/
│   ├── _index.md       # Category introduction/overview
│   ├── [subcategory]/
│   │   ├── _index.md   # Subcategory introduction
│   │   └── [...posts]
│   └── [...posts]
```

### 5. Frontmatter Schema
```yaml
title: string           # Page title
description: string     # Brief description
category: string        # Primary category
subcategory?: string   # Optional subcategory
order: number          # Display order within category
tags: string[]         # Related tags
```

### 6. Technical Implementation
1. Update content schema to support new structure
2. Enhance navigation components
3. Implement breadcrumb generation
4. Add category index page support
5. Update URL generation utilities

### 7. User Experience
- Clear category hierarchy
- Intuitive navigation
- Easy content discovery
- Logical content progression

## Success Metrics
- Navigation depth (clicks to content)
- Time to find related content
- Content organization clarity
- Editor experience feedback

## Implementation Plan
1. Schema updates
2. Navigation component updates
3. URL handling improvements
4. Content migration
5. Documentation updates