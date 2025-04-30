import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import alpinejs from '@astrojs/alpinejs';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Get the repository name from package.json for GitHub Pages
import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const repositoryName = pkg.name;

export default defineConfig({
  site: `https://${process.env.GITHUB_REPOSITORY_OWNER || 'your-username'}.github.io`,
  base: `/${repositoryName}`,
  integrations: [
    tailwind(),
    mdx(),
    alpinejs(),
  ],
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "Contents" }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});