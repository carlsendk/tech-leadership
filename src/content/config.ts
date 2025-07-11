import { defineCollection, z } from 'astro:content';

// Define schemas for blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    draft: z.boolean().optional().default(false),
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
      title: z.string().optional(),
    }).optional().default({
      name: 'John Doe',
      title: 'Content Writer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    }),
  }),
});

// Define schemas for wiki articles
const wikiCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    order: z.number().default(999),
    subcategory: z.string().optional(),
    isIndex: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

// Export collections
export const collections = {
  'blog': blogCollection,
  'wiki': wikiCollection,
};