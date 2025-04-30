# Content-Driven Astro Website

A modern, content-focused personal website built with Astro, featuring a blog and wiki system with unified tagging and categorization.

## Features

- **Blog System** - Date-sorted articles with tags and categories
- **Wiki/Documentation** - Structured knowledge base with sidebar navigation and table of contents
- **Unified Tag & Category System** - Browse content across both blog and wiki
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-friendly layouts at all screen sizes
- **Content Collections** - Type-safe content management with Zod schemas
- **MDX Support** - Write content with extended Markdown capabilities

## Local Development

### Prerequisites

- Node.js 16 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/content-driven-site.git
cd content-driven-site
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

### Adding Blog Posts

Create a new Markdown file in `src/content/blog/` with the following frontmatter:

```markdown
---
title: "Your Blog Post Title"
description: "A brief description of the post"
date: 2023-09-15
tags: ["tag1", "tag2"]
category: "Category Name"
---

Your blog post content here...
```

### Adding Wiki Articles

Create a new Markdown file in `src/content/wiki/` with the following frontmatter:

```markdown
---
title: "Wiki Article Title"
description: "A brief description of the article"
tags: ["tag1", "tag2"]
category: "Category Name"
order: 1  # Optional - controls order in sidebar navigation
---

Your wiki article content here...
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

## Customization

### Theme Colors

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

### Navigation

Modify the navigation links in `src/components/Header.astro`.

### Content Schema

Update the content schemas in `src/content/config.ts` if you need to add or modify frontmatter fields.

## License

MIT