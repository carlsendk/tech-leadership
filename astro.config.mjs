import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import alpinejs from '@astrojs/alpinejs';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMermaid from 'rehype-mermaid';
import addMermaidClass from './src/plugins/add-mermaid-class.js';

// Common configuration for markdown processing
const markdownConfig = {
  syntaxHighlight: {
    type: 'shiki',
    excludeLangs: ['mermaid'],  // Exclude mermaid from syntax highlighting
  },
  remarkPlugins: [
    [remarkToc, { heading: "Contents" }],
  ],
  rehypePlugins: [
    addMermaidClass,  // 1. restore <pre class="mermaid">
    [rehypeMermaid, { 
      strategy: 'inline-svg',
      mermaidConfig: {
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'Inter, system-ui, sans-serif',
        theme: 'base',
        // Use neutral theme for pre-rendering - client will override with custom colors
        themeVariables: {
          primaryColor: '#64748b',
          primaryTextColor: '#1e293b',
          primaryBorderColor: '#64748b',
          mainBkg: '#ffffff',
          nodeBkg: '#f8fafc',
          clusterBkg: '#f1f5f9',
          nodeTextColor: '#1e293b',
          lineColor: '#64748b'
        },
        flowchart: {
          curve: 'basis',
          padding: 20,
          useMaxWidth: true,
          htmlLabels: true,
          diagramPadding: 8,
          nodeSpacing: 50,
          rankSpacing: 50,
        },
      },
      launchOptions: {
        args: ['--no-sandbox'],
        headless: true
      }
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
  markdown: {
    ...markdownConfig,
    remarkPlugins: [
      [remarkToc, { heading: "Contents" }],
    ],
    rehypePlugins: [
      addMermaidClass,
      [rehypeMermaid, { 
        strategy: 'inline-svg',
        mermaidConfig: {
          startOnLoad: false,
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          theme: 'base',
          // Use neutral theme for pre-rendering - client will override with custom colors
          themeVariables: {
            primaryColor: '#64748b',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#64748b',
            mainBkg: '#ffffff',
            nodeBkg: '#f8fafc',
            clusterBkg: '#f1f5f9',
            nodeTextColor: '#1e293b',
            lineColor: '#64748b'
          },
          flowchart: {
            curve: 'basis',
            padding: 20,
            useMaxWidth: true,
            htmlLabels: true,
            diagramPadding: 8,
            nodeSpacing: 50,
            rankSpacing: 50,
          },
        }
      }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }]
    ],
  },
});