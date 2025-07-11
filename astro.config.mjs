import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import alpinejs from '@astrojs/alpinejs';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMermaid from 'rehype-mermaid';
import addMermaidClass from './src/plugins/add-mermaid-class.js';

// Mermaid theme variables - Using your app's teal color scheme
const mermaidLightTheme = {
  // Core colors using your app's teal palette
  primaryColor: '#0d9488',        // Primary teal from your app
  primaryTextColor: '#0f172a',    // Dark text for high contrast
  primaryBorderColor: '#64748b',  // Medium gray for borders
  secondaryColor: '#14b8a6',      // Secondary teal
  tertiaryColor: '#2dd4bf',       // Light teal
  
  // Background colors
  mainBkg: '#ffffff',             // Pure white background
  nodeBkg: '#f8fafc',            // Very light gray for nodes
  clusterBkg: '#fefefe',         // Very light background for subgraphs (arrow visibility)
  
  // Text and borders
  nodeTextColor: '#0f172a',       // Dark text for readability
  nodeBorder: '#475569',          // Darker border for definition
  clusterBorder: '#64748b',       // Medium border for subgraphs
  titleColor: '#0f172a',          // Dark titles
  border2: '#475569',             // Secondary borders
  fontWeight: '500',              // Medium weight for readability
  lineColor: '#334155',           // Dark arrows for light background
  edgeLabelBackground: '#f8fafc', // Light background for edge labels
  
  // Node variety (your teal scale + grays)
  node1: '#0d9488',               // Primary teal
  node2: '#14b8a6',               // Secondary teal
  node3: '#2dd4bf',               // Light teal  
  node4: '#0f766e',               // Dark teal
  node5: '#115e59',               // Darker teal
  node6: '#475569',               // Medium gray
  node7: '#1e293b',               // Dark gray
  
  // Component-specific colors
  labelBackgroundColor: '#f8fafc',
  compositeBackground: '#fefefe', // Very light for subgraphs
  noteBkgColor: '#f0fdfa',        // Light teal for notes
  noteTextColor: '#0f172a',
  noteBorderColor: '#14b8a6',     // Teal border for notes
  classText: '#0f172a',
  
  // Actor/sequence diagram colors
  actorBkg: '#f8fafc',
  actorBorder: '#64748b',
  actorTextColor: '#0f172a',
  messageBorderColor: '#64748b',
  messageTextColor: '#0f172a',
  
  // Gantt/timeline colors
  sectionBkgColor: '#f8fafc',
  altSectionBkgColor: '#f1f5f9',
  taskBorderColor: '#64748b',
  taskTextColor: '#0f172a',
  taskTextOutsideColor: '#0f172a',
  taskTextLightColor: '#0f172a',
  sectionBkgColor2: '#0d9488',
  gridColor: '#e2e8f0',           // Lighter grid
  doneTaskBkgColor: '#14b8a6',
  doneTaskBorderColor: '#0d9488',
  activeTaskBorderColor: '#2dd4bf',
  activeTaskBkgColor: '#14b8a6',
  
  // Pie chart colors (your teal scale)
  pie1: '#0d9488',
  pie2: '#14b8a6',
  pie3: '#2dd4bf',
  pie4: '#0f766e',
  pie5: '#115e59',
  pie6: '#475569',
  pie7: '#1e293b',
  pieTitleTextSize: '25px',
  pieTitleTextColor: '#0f172a',
  journeyHover: '#2dd4bf'
};

const mermaidDarkTheme = {
  // Core colors using your app's light teal palette for dark mode
  primaryColor: '#2dd4bf',        // Light teal for dark backgrounds
  primaryTextColor: '#f1f5f9',    // Light text for high contrast
  primaryBorderColor: '#64748b',  // Medium gray - visible on dark
  secondaryColor: '#5eead4',      // Lighter teal
  tertiaryColor: '#99f6e4',       // Very light teal
  
  // Background colors
  mainBkg: '#0f172a',             // Dark navy background
  nodeBkg: '#1e293b',            // Lighter dark for nodes
  clusterBkg: '#334155',         // Medium dark for subgraphs (light arrow visibility)
  
  // Text and borders  
  nodeTextColor: '#f1f5f9',       // Light text for readability
  nodeBorder: '#64748b',          // Medium border visible on dark
  clusterBorder: '#64748b',       // Consistent border for subgraphs
  titleColor: '#f1f5f9',          // Light titles
  border2: '#64748b',             // Secondary borders
  fontWeight: '500',              // Medium weight for readability
  lineColor: '#cbd5e1',           // Light arrows for dark background
  edgeLabelBackground: '#1e293b', // Dark background for edge labels
  
  // Node variety (your light teal scale for dark mode)
  node1: '#2dd4bf',               // Primary light teal
  node2: '#5eead4',               // Lighter teal
  node3: '#99f6e4',               // Very light teal
  node4: '#14b8a6',               // Medium teal
  node5: '#0d9488',               // Darker teal
  node6: '#64748b',               // Medium gray
  node7: '#94a3b8',               // Light gray
  
  // Component-specific colors
  labelBackgroundColor: '#1e293b',
  compositeBackground: '#334155', // Medium dark for subgraphs
  noteBkgColor: '#134e4a',        // Dark teal for notes
  noteTextColor: '#f1f5f9',
  noteBorderColor: '#2dd4bf',     // Light teal border for notes
  classText: '#f1f5f9',
  
  // Actor/sequence diagram colors
  actorBkg: '#1e293b',
  actorBorder: '#64748b',
  actorTextColor: '#f1f5f9',
  messageBorderColor: '#64748b',
  messageTextColor: '#f1f5f9',
  
  // Gantt/timeline colors
  sectionBkgColor: '#1e293b',
  altSectionBkgColor: '#334155',
  taskBorderColor: '#64748b',
  taskTextColor: '#f1f5f9',
  taskTextOutsideColor: '#f1f5f9',
  taskTextLightColor: '#f1f5f9',
  sectionBkgColor2: '#2dd4bf',
  gridColor: '#475569',           // Darker grid for dark mode
  doneTaskBkgColor: '#14b8a6',
  doneTaskBorderColor: '#0d9488',
  activeTaskBorderColor: '#5eead4',
  activeTaskBkgColor: '#2dd4bf',
  
  // Pie chart colors (your light teal scale for dark mode)
  pie1: '#2dd4bf',
  pie2: '#5eead4',
  pie3: '#99f6e4',
  pie4: '#14b8a6',
  pie5: '#0d9488',
  pie6: '#64748b',
  pie7: '#94a3b8',
  pieTitleTextSize: '25px',
  pieTitleTextColor: '#f1f5f9',
  journeyHover: '#5eead4'
};

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