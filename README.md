Note: this is a project to see and play with vibe coding with little to no interaction

# Technology Leadership Knowledge Platform

A comprehensive knowledge platform for technology leaders, featuring three interconnected framework areas: **Engineering Practices**, **Operating Model**, and **Engineering Effectiveness**. Includes extensive blog content covering strategic approaches like Wardley Mapping, Domain-Driven Design, Team Topologies, and visual portfolio management. Built with Astro for performance and optimized for both learning and reference.

## Platform Overview

### Wiki Frameworks (3 Main Areas)

**🔧 [Engineering Practices Framework](src/content/wiki/engineering-practices/)**
- Complete progression from normalization through automation and self-service
- Covers version control, containerization, CI/CD, observability, and platform engineering
- Golden paths, autonomous teams, and developer experience optimization

**🏗️ [Operating Model Framework](src/content/wiki/operating-model/)**  
- Foundation elements: mission, culture, organizational structure
- Core operations: decision-making, coordination, team topologies
- Advanced optimization: flow, cost, motivation, and learning

**📊 [Engineering Effectiveness Framework](src/content/wiki/engineering-effectiveness/)**
- Input-focused measurement approach based on ee-handbook.io research
- Managing time, building activities, and feedback loops
- Developer experience and productivity optimization

### Blog Content (15 Posts, 4 Categories)

**Leadership & Management (8 posts)**
- Visual Portfolio Management, Autonomous Teams Implementation
- Organizational Design at Scale, Strategic Trinity (DDD+Wardley+Team Topologies)
- Wardley Mapping, Developer Experience, AWS in Plain English, Container Solutions Maturity

**Engineering Excellence (4 posts)**
- Cloud Native Maturity Transformation, Career Development Trident Model
- Team Communication Protocols, Technical Documentation Excellence

**Career Development (2 posts)**
- Individual growth frameworks and career progression models

**Getting Started (1 post)**  
- Platform introduction and navigation guide

## Platform Features

- **Comprehensive Framework Integration** - Three interconnected wiki areas with cross-references
- **Industry-Referenced Blog Content** - Articles based on established frameworks and research
- **Strategic Planning Tools** - Wardley Mapping, DDD, Team Topologies integration
- **Organizational Design Guidance** - Complete operating model and team structure frameworks
- **Engineering Excellence Practices** - From basic normalization to advanced automation
- **Content Collections** - Type-safe content management with Zod schemas
- **Cross-Reference System** - Extensive linking between wiki areas and blog posts
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-friendly layouts optimized for knowledge consumption
- **Tag & Category System** - Organized content discovery across frameworks and topics

## Local Development

### Prerequisites

- Node.js 16 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/carlsendk/tech-leadership.git
cd tech-leadership
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

## Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images and other assets that need processing
│   ├── components/    # Reusable UI components
│   ├── content/       # Content collections (blog posts, wiki articles)
│   │   ├── blog/      # Blog posts
│   │   ├── wiki/      # Wiki articles
│   │   └── config.ts  # Content schemas
│   ├── layouts/       # Page layouts
│   └── pages/         # Page routes
├── astro.config.mjs   # Astro configuration
├── tailwind.config.mjs # Tailwind CSS configuration
└── package.json
```

## Content Management

### Wiki Framework Structure

The platform includes three main framework areas organized hierarchically:

```
src/content/wiki/
├── engineering-practices/
│   ├── normalization/
│   ├── standardization/
│   ├── expansion/
│   ├── automation/
│   └── self-service/
├── operating-model/
│   ├── foundation/
│   ├── core-elements/
│   ├── operations/
│   ├── optimization/
│   └── advanced/
└── engineering-effectiveness/
    ├── managing-time/
    ├── managing-building-activities/
    └── managing-feedback-loops/
```

### Adding Blog Posts

Create a new Markdown file in `src/content/blog/` with the following frontmatter:

```markdown
---
title: "Your Blog Post Title"
description: "A brief description of the post"
date: 2025-01-15
category: "Leadership & Management" # Leadership & Management, Engineering Excellence, Career Development, Getting Started
tags: ["tag1", "tag2"]
author:
  name: "Author Name"
  title: "Author Title"
image: "/images/blog/post-image.jpg"
---

Your blog post content here...
```

### Adding Wiki Articles

Create a new Markdown file in the appropriate wiki framework with the following frontmatter:

```markdown
---
title: "Wiki Article Title"
description: "A brief description of the article"
tags: ["tag1", "tag2"]
category: "Framework Category" # Engineering Practices, Operating Model, Engineering Effectiveness
order: 1  # Controls order in sidebar navigation
isIndex: true  # Set to true for framework index pages
---

Your wiki article content here...
```

### Content Cross-Referencing

The platform uses extensive cross-referencing between wiki areas and blog posts:

```markdown
<!-- Reference wiki articles -->
[operating model framework](../wiki/operating-model)
[autonomous teams](../wiki/engineering-practices/expansion/autonomous-teams)

<!-- Reference blog posts -->
[Wardley Mapping post](../blog/wardley-mapping-for-tech-leaders)
[Strategic Trinity approach](../blog/ddd-wardley-team-topologies-trinity)
```

## Deployment

This website can be deployed to any static hosting provider:

### Netlify

1. Push your repo to GitHub/GitLab/Bitbucket
2. Import the project in Netlify
3. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

1. Push your repo to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Vercel will automatically detect Astro settings

### Manual Deployment

1. Build the site:
```bash
npm run build
```

2. The `dist/` directory can now be deployed to any static hosting provider.

## Platform Architecture

### Technology Stack

- **Astro** - Static site generator optimized for content-heavy sites
- **TypeScript** - Type-safe development with content collections
- **Tailwind CSS** - Utility-first styling with dark/light mode support
- **MDX** - Enhanced Markdown with component support
- **Zod** - Runtime schema validation for content frontmatter

### Content Architecture

**Three-Tier Framework Structure**:
1. **Wiki Frameworks** - Comprehensive knowledge areas with hierarchical organization
2. **Blog Content** - Industry-referenced articles with strategic insights
3. **Cross-Reference System** - Extensive linking between related concepts

**Content Types**:
- Framework index pages with `isIndex: true`
- Hierarchical sub-pages with `order` for navigation
- Blog posts with author, category, and date metadata
- Tag-based content discovery across all content types

### Performance Optimizations

- Static site generation for fast loading
- Optimized images and assets
- Minimal JavaScript for core functionality
- CDN-friendly deployment structure

## Customization

### Framework Extension

To add new framework areas or expand existing ones:

1. Create new directory structure under `src/content/wiki/`
2. Add category to content schema in `src/content/config.ts`
3. Update navigation components to include new areas
4. Create index pages with appropriate frontmatter

### Theme and Styling

Edit the color scheme in `tailwind.config.mjs`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color shades
      },
      accent: {
        // Your accent color shades
      },
    },
  },
},
```

### Content Schema Extensions

Update content schemas in `src/content/config.ts` for additional frontmatter fields:

```typescript
// Example: Adding new blog categories
category: z.enum([
  "Leadership & Management",
  "Engineering Excellence", 
  "Career Development",
  "Getting Started",
  "Your New Category"
])
```

## License

MIT
