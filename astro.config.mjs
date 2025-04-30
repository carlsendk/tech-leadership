import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import alpinejs from '@astrojs/alpinejs';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMermaid from 'rehype-mermaid';
import addMermaidClass from './src/plugins/add-mermaid-class.js';

// Get the repository name from package.json for GitHub Pages
import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const repositoryName = pkg.name;

// Determine if we're in production (GitHub Pages) or development
const isProduction = process.env.NODE_ENV === 'production';

// Common configuration for markdown processing
const markdownConfig = {
  syntaxHighlight: {
    type: 'shiki',
    excludeLangs: ['mermaid', 'math'],  // Shiki leaves these alone
  },
  remarkPlugins: [
    [remarkToc, { heading: "Contents" }],
  ],
  rehypePlugins: [
    addMermaidClass,  // 1. restore <pre class="mermaid">
    [rehypeMermaid, { 
      strategy: 'pre-mermaid'  // Start with simpler strategy
    }],
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'append' }]
  ],
};

export default defineConfig({
  site: 'https://carlsendk.github.io',
  base: '/tech-leadership',
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    tailwind(),
    mdx({
      ...markdownConfig,
    }),
    alpinejs(),
  ],
  markdown: markdownConfig,
});