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

// Determine if we're in production (GitHub Pages) or development
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: isProduction ? 'https://carlsendk.github.io' : undefined,
  base: isProduction ? '/tech-leadership' : undefined,
  output: 'static',
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
      transformers: [{
        pre(node) {
          // Check if this is a Mermaid code block
          const [codeEl] = node.children;
          if (codeEl?.properties?.className?.[0] === 'language-mermaid') {
            // Transform the pre element to remove Shiki's styling
            node.properties.className = [];
            codeEl.properties.className = ['language-mermaid'];
            // Remove all Shiki spans and preserve only the text content
            const content = codeEl.children?.[0]?.children?.[0]?.value || '';
            codeEl.children = [{
              type: 'text',
              value: content
            }];
          }
          return node;
        }
      }]
    },
  },
});