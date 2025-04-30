---
title: "Using Astro Content Collections"
description: "Learn how to efficiently manage and query content with Astro's Collections API"
tags: ["astro", "markdown", "content-management"]
category: "Frameworks"
order: 2
---

# Using Astro Content Collections

Content Collections are a powerful feature in Astro that help you organize and validate your content. They provide type safety, automatic slug generation, and a simple API for querying your content.

## Setting up Collections

To use collections, first create a `content` directory in your `src` folder with subdirectories for each collection type:

```
src/
  content/
    blog/
      post-1.md
      post-2.md
    docs/
      guide-1.md
      guide-2.md
    config.ts  <-- collection configuration
```

Next, define your collections in `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

// Define a schema for each collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

// Export a single `collections` object
export const collections = {
  'blog': blogCollection,
  'docs': docsCollection,
};
```

## Creating Content

Content files can be Markdown (`.md`) or MDX (`.mdx` - requires the MDX integration). Each file must include frontmatter that matches your schema:

```markdown
---
title: Getting Started with Astro
date: 2023-07-15
author: Astro Developer
tags: ["astro", "beginners", "tutorial"]
---

This is the main content of my blog post written in Markdown.
```

## Querying Collections

To query your collections, use the `getCollection` and `getEntry` functions:

### Get All Entries

```astro
---
import { getCollection } from 'astro:content';

// Get all blog posts
const allBlogPosts = await getCollection('blog');

// Get published blog posts with a filter function
const publishedPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? data.draft !== true : true;
});
---

<ul>
  {allBlogPosts.map((post) => (
    <li>
      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

### Get a Single Entry

```astro
---
import { getEntry } from 'astro:content';

// Get a specific blog post by slug
const post = await getEntry('blog', 'getting-started');
---

<h1>{post.data.title}</h1>
<p>By {post.data.author} on {post.data.date.toLocaleDateString()}</p>
```

### Rendering Content

To render the content of an entry, you need to first render it using the `render()` method:

```astro
---
import { getEntry } from 'astro:content';

const post = await getEntry('blog', 'getting-started');
const { Content, headings } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <Content /> <!-- Renders the Markdown content -->
</article>

<!-- Optional: Display headings as a table of contents -->
<aside>
  <h2>Table of Contents</h2>
  <ul>
    {headings.map(heading => (
      <li>
        <a href={`#${heading.slug}`}>
          {heading.text}
        </a>
      </li>
    ))}
  </ul>
</aside>
```

## Dynamic Routes with Collections

Collections are often used to create dynamic routes:

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, getEntry } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

// Generate paths for all blog posts
export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

// Use the entry passed from getStaticPaths
const { entry } = Astro.props;
const { Content, headings } = await entry.render();
---

<BlogLayout 
  title={entry.data.title} 
  author={entry.data.author}
  date={entry.data.date}
  headings={headings}
>
  <Content />
</BlogLayout>
```

## Advanced Usage

### Nested Directories

Collections support nested directories for organization:

```
content/
  blog/
    tech/
      astro-v2.md
    personal/
      my-journey.md
```

The slugs will include the directory path: `tech/astro-v2` and `personal/my-journey`.

### Custom Slugs

You can override the automatic slug generation:

```astro
---
title: "My Blog Post"
slug: "custom-url-path"  
---
```

Or in your `getStaticPaths()`:

```javascript
return entries.map(entry => ({
  params: { 
    slug: entry.data.customSlug || entry.slug 
  },
  props: { entry },
}));
```

### Pagination

For collections with many entries, implement pagination:

```astro
---
// src/pages/blog/[page].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => 
    b.data.date.valueOf() - a.data.date.valueOf()
  );

  // Generate pages with 10 posts per page
  return paginate(sortedPosts, { pageSize: 10 });
}

const { page } = Astro.props;
---

<h1>Blog Posts</h1>

<ul>
  {page.data.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.data.title}</a></li>
  ))}
</ul>

<!-- Pagination controls -->
<div>
  {page.url.prev ? <a href={page.url.prev}>Previous</a> : null}
  {page.url.next ? <a href={page.url.next}>Next</a> : null}
</div>
```

## Best Practices

1. **Type Safety**: Define complete schemas to catch errors early
2. **Consistent Frontmatter**: Keep frontmatter consistent across similar content 
3. **Filter Functions**: Use filter functions to exclude draft content in production
4. **Sorting**: Implement sorting (by date, order, etc.) for logical content organization
5. **Content Organization**: Use nested directories for large collections
6. **Reference Documents**: Create relationships between collections when needed

## Conclusion

Content Collections provide a robust system for managing structured content in Astro. By leveraging the Collections API, you can build complex content-driven websites while maintaining type safety and excellent developer experience.

Remember that collections are processed at build time, making your final site fast and SEO-friendly while still giving you powerful content management capabilities.