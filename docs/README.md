# Project Documentation

This documentation provides a comprehensive overview of the Knowledge Base project, its architecture, and guidelines for future development.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Development Guidelines](#development-guidelines)
5. [Future Recommendations](#future-recommendations)

## Project Overview

The Knowledge Base is a content-driven website built with Astro that combines a blog system with a wiki-style documentation platform. It features:

- Blog posts with dates, authors, and categories
- Wiki articles for permanent documentation
- Unified tagging and categorization system
- Full-text search capabilities
- Responsive design with dark mode support
- SEO optimization

## Architecture

### Content Structure

```
src/
  ├── content/           # Content collections
  │   ├── blog/         # Blog posts
  │   ├── wiki/         # Wiki articles
  │   └── config.ts     # Collection schemas
  ├── components/       # Reusable UI components
  ├── layouts/          # Page layouts
  └── pages/           # Route components
```

### Key Components

- **Content Collections**: Managed through Astro's content collections with TypeScript schemas
- **Routing**: File-based routing with dynamic routes for blog posts, wiki articles, tags, and categories
- **Search**: Client-side search implementation with Alpine.js
- **Theming**: Dark/light mode with Tailwind CSS

## Technology Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS
- **Interactivity**: Alpine.js
- **Content**: MDX
- **Typography**: @tailwindcss/typography
- **Icons**: Heroicons (via SVG)