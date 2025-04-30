---
title: "Astro Framework Basics"
description: "An introduction to the Astro framework and its core concepts"
tags: ["astro", "webdev", "javascript", "framework"]
category: "Frameworks"
order: 1
---

# Astro Framework Basics

Astro is a modern web framework for building fast, content-focused websites. It allows you to write components in your favorite UI framework (React, Svelte, Vue, etc.) and renders them to static HTML at build time, resulting in faster page loads and less JavaScript.

## Core Concepts

### Component-Based Architecture

Astro uses a component-based architecture similar to modern JavaScript frameworks. Components in Astro are saved as `.astro` files and use a syntax that's similar to HTML with JSX-like expressions.

```astro
---
// Component Script (runs at build time)
const title = "Hello, Astro!";
---

<!-- Component Template -->
<h1>{title}</h1>
<p>Welcome to Astro</p>
```

### Islands Architecture

Astro pioneered the "Islands Architecture," which means:

- Ship zero JavaScript by default
- Add interactivity only where needed
- Components load in parallel

This approach ensures that your site remains fast while still allowing for dynamic functionality where required.

### File-Based Routing

Astro uses a file-based routing system:

- Files in `src/pages/` automatically become pages on your site
- Naming like `[slug].astro` creates dynamic routes
- Special files like `404.astro` handle specific cases

For example:
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/[slug].astro` → `/blog/:slug`

### Content Collections

Astro provides a powerful system for organizing and querying content:

```astro
---
import { getCollection } from 'astro:content';

// Get all blog posts
const blogPosts = await getCollection('blog');
---

<ul>
  {blogPosts.map(post => (
    <li>
      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

## Getting Started

### Installation

To create a new Astro project:

```bash
# Create a new project with npm
npm create astro@latest

# Or with yarn
yarn create astro

# Or with pnpm
pnpm create astro
```

### Project Structure

A typical Astro project looks like this:

```
/
├── public/        # Static assets
├── src/
│   ├── components/ # Reusable components
│   ├── content/    # Content collections
│   ├── layouts/    # Page layouts
│   └── pages/      # Pages and routes
├── astro.config.mjs # Configuration
└── package.json
```

### Building and Deploying

To build your site for production:

```bash
npm run build
```

This generates static files in the `dist/` directory, which can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Integrations

Astro supports many integrations to extend its functionality:

- UI frameworks: React, Vue, Svelte, Solid, Preact, Lit
- CSS tools: Tailwind, Sass, Less, PostCSS
- Other tools: MDX, image optimization, sitemap generation

Add integrations through the Astro config:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()]
});
```

## Best Practices

### Use Content Collections

For blog posts, documentation, or any structured content, use Astro's content collections rather than plain Markdown files in the pages directory. This enables type safety and better content organization.

### Minimize Client JavaScript

Only use client directives like `client:load` when necessary. Prefer static rendering when possible to maintain fast page loads.

### Leverage Partial Hydration

Astro allows you to hydrate components individually:

```astro
<MyComponent /> <!-- No JavaScript -->
<MyComponent client:load /> <!-- Hydrate immediately -->
<MyComponent client:visible /> <!-- Hydrate when visible -->
<MyComponent client:idle /> <!-- Hydrate during idle time -->
```

### Image Optimization

Use Astro's built-in image optimization to serve properly sized images:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.png';
---

<Image src={myImage} alt="Description" />
```

## Conclusion

Astro provides an excellent developer experience while prioritizing website performance. Its flexibility allows for gradual adoption, making it suitable for both simple content sites and more complex web applications.

Whether you're building a blog, documentation site, marketing website, or even a web application, Astro's unique approach to rendering and component composition offers significant advantages over traditional JavaScript frameworks.