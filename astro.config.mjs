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
      strategy: 'inline-svg',
      mermaidConfig: {
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'Inter, system-ui, sans-serif',
        theme: 'base',
        themeVariables: {
          // Base colors - Dark mode
          darkMode: {
            // Base colors
            primaryColor: '#0d9488',
            primaryTextColor: '#f1f5f9',
            primaryBorderColor: '#475569',
            secondaryColor: '#2dd4bf',
            tertiaryColor: '#14b8a6',

            // Background colors
            mainBkg: '#0f172a',
            nodeBkg: '#1e293b',
            clusterBkg: '#0f172a',

            // Flowchart specific colors
            nodeTextColor: '#f1f5f9',
            nodeBorder: '#475569',
            clusterBorder: '#475569',
            titleColor: '#f1f5f9',

            // Node styling
            border2: '#475569',
            fontWeight: '500',

            // Node colors for different types
            node1: '#0d9488',  // Primary teal
            node2: '#14b8a6',  // Secondary teal
            node3: '#2dd4bf',  // Tertiary teal
            node4: '#0f766e',  // Dark teal
            node5: '#115e59',  // Darker teal
            node6: '#134e4a',  // Darkest teal
            node7: '#042f2e',  // Almost black teal

            // State diagram colors
            labelBackgroundColor: '#1e293b',
            compositeBackground: '#0f172a',

            // Note styling
            noteBkgColor: '#1e293b',
            noteTextColor: '#f1f5f9',
            noteBorderColor: '#475569',

            // Class diagram colors
            classText: '#f1f5f9',

            // Sequence diagram colors
            actorBkg: '#1e293b',
            actorBorder: '#475569',
            actorTextColor: '#f1f5f9',
            messageBorderColor: '#475569',
            messageTextColor: '#f1f5f9',

            // Gantt diagram colors
            sectionBkgColor: '#1e293b',
            altSectionBkgColor: '#0f172a',
            taskBorderColor: '#475569',
            taskTextColor: '#f1f5f9',
            taskTextOutsideColor: '#f1f5f9',
            taskTextLightColor: '#f1f5f9',
            sectionBkgColor2: '#0d9488',
            gridColor: '#475569',
            doneTaskBkgColor: '#0d9488',
            doneTaskBorderColor: '#0f766e',
            activeTaskBorderColor: '#2dd4bf',
            activeTaskBkgColor: '#14b8a6',

            // Pie diagram colors
            pie1: '#0d9488',
            pie2: '#0f766e',
            pie3: '#14b8a6',
            pie4: '#2dd4bf',
            pie5: '#115e59',
            pie6: '#134e4a',
            pie7: '#042f2e',
            pieTitleTextSize: '25px',
            pieTitleTextColor: '#f1f5f9',

            // Journey diagram colors
            journeyHover: '#2dd4bf',
          },
          // Base colors - Light mode
          lightMode: {
            // Base colors
            primaryColor: '#0d9488',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#94a3b8',
            secondaryColor: '#2dd4bf',
            tertiaryColor: '#14b8a6',

            // Background colors
            mainBkg: '#ffffff',
            nodeBkg: '#f8fafc',
            clusterBkg: '#f1f5f9',

            // Flowchart specific colors
            nodeTextColor: '#1e293b',
            nodeBorder: '#94a3b8',
            clusterBorder: '#94a3b8',
            titleColor: '#1e293b',

            // Node styling
            border2: '#94a3b8',
            fontWeight: '500',

            // Node colors for different types
            node1: '#0d9488',  // Primary teal
            node2: '#14b8a6',  // Secondary teal
            node3: '#2dd4bf',  // Tertiary teal
            node4: '#0f766e',  // Dark teal
            node5: '#115e59',  // Darker teal
            node6: '#134e4a',  // Darkest teal
            node7: '#042f2e',  // Almost black teal

            // State diagram colors
            labelBackgroundColor: '#f8fafc',
            compositeBackground: '#f1f5f9',

            // Note styling
            noteBkgColor: '#f8fafc',
            noteTextColor: '#1e293b',
            noteBorderColor: '#94a3b8',

            // Class diagram colors
            classText: '#1e293b',

            // Sequence diagram colors
            actorBkg: '#f8fafc',
            actorBorder: '#94a3b8',
            actorTextColor: '#1e293b',
            messageBorderColor: '#94a3b8',
            messageTextColor: '#1e293b',

            // Gantt diagram colors
            sectionBkgColor: '#f8fafc',
            altSectionBkgColor: '#f1f5f9',
            taskBorderColor: '#94a3b8',
            taskTextColor: '#1e293b',
            taskTextOutsideColor: '#1e293b',
            taskTextLightColor: '#1e293b',
            sectionBkgColor2: '#0d9488',
            gridColor: '#94a3b8',
            doneTaskBkgColor: '#0d9488',
            doneTaskBorderColor: '#0f766e',
            activeTaskBorderColor: '#2dd4bf',
            activeTaskBkgColor: '#14b8a6',

            // Pie diagram colors
            pie1: '#0d9488',
            pie2: '#0f766e',
            pie3: '#14b8a6',
            pie4: '#2dd4bf',
            pie5: '#115e59',
            pie6: '#134e4a',
            pie7: '#042f2e',
            pieTitleTextSize: '25px',
            pieTitleTextColor: '#1e293b',

            // Journey diagram colors
            journeyHover: '#2dd4bf',
          }
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
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 100,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: false,
          bottomMarginAdj: 1,
          useMaxWidth: true,
          rightAngles: false,
          showSequenceNumbers: false,
          actorFontSize: 14,
          actorFontWeight: 500,
          noteFontSize: 14,
          messageFontSize: 14,
        },
        gantt: {
          titleTopMargin: 25,
          barHeight: 20,
          barGap: 4,
          topPadding: 50,
          leftPadding: 75,
          gridLineStartPadding: 35,
          fontSize: 14,
          sectionFontSize: 14,
          numberSectionStyles: 4,
          axisFormat: '%Y-%m-%d',
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
          themeVariables: {
            // Base colors - Dark mode
            darkMode: {
              // Base colors
              primaryColor: '#0d9488',
              primaryTextColor: '#f1f5f9',
              primaryBorderColor: '#475569',
              secondaryColor: '#2dd4bf',
              tertiaryColor: '#14b8a6',

              // Background colors
              mainBkg: '#0f172a',
              nodeBkg: '#1e293b',
              clusterBkg: '#0f172a',

              // Flowchart specific colors
              nodeTextColor: '#f1f5f9',
              nodeBorder: '#475569',
              clusterBorder: '#475569',
              titleColor: '#f1f5f9',

              // Node styling
              border2: '#475569',
              fontWeight: '500',

              // Node colors for different types
              node1: '#0d9488',  // Primary teal
              node2: '#14b8a6',  // Secondary teal
              node3: '#2dd4bf',  // Tertiary teal
              node4: '#0f766e',  // Dark teal
              node5: '#115e59',  // Darker teal
              node6: '#134e4a',  // Darkest teal
              node7: '#042f2e',  // Almost black teal

              // State diagram colors
              labelBackgroundColor: '#1e293b',
              compositeBackground: '#0f172a',

              // Note styling
              noteBkgColor: '#1e293b',
              noteTextColor: '#f1f5f9',
              noteBorderColor: '#475569',

              // Class diagram colors
              classText: '#f1f5f9',

              // Sequence diagram colors
              actorBkg: '#1e293b',
              actorBorder: '#475569',
              actorTextColor: '#f1f5f9',
              messageBorderColor: '#475569',
              messageTextColor: '#f1f5f9',

              // Gantt diagram colors
              sectionBkgColor: '#1e293b',
              altSectionBkgColor: '#0f172a',
              taskBorderColor: '#475569',
              taskTextColor: '#f1f5f9',
              taskTextOutsideColor: '#f1f5f9',
              taskTextLightColor: '#f1f5f9',
              sectionBkgColor2: '#0d9488',
              gridColor: '#475569',
              doneTaskBkgColor: '#0d9488',
              doneTaskBorderColor: '#0f766e',
              activeTaskBorderColor: '#2dd4bf',
              activeTaskBkgColor: '#14b8a6',

              // Pie diagram colors
              pie1: '#0d9488',
              pie2: '#0f766e',
              pie3: '#14b8a6',
              pie4: '#2dd4bf',
              pie5: '#115e59',
              pie6: '#134e4a',
              pie7: '#042f2e',
              pieTitleTextSize: '25px',
              pieTitleTextColor: '#f1f5f9',

              // Journey diagram colors
              journeyHover: '#2dd4bf',
            },
            // Base colors - Light mode
            lightMode: {
              // Base colors
              primaryColor: '#0d9488',
              primaryTextColor: '#1e293b',
              primaryBorderColor: '#94a3b8',
              secondaryColor: '#2dd4bf',
              tertiaryColor: '#14b8a6',

              // Background colors
              mainBkg: '#ffffff',
              nodeBkg: '#f8fafc',
              clusterBkg: '#f1f5f9',

              // Flowchart specific colors
              nodeTextColor: '#1e293b',
              nodeBorder: '#94a3b8',
              clusterBorder: '#94a3b8',
              titleColor: '#1e293b',

              // Node styling
              border2: '#94a3b8',
              fontWeight: '500',

              // Node colors for different types
              node1: '#0d9488',  // Primary teal
              node2: '#14b8a6',  // Secondary teal
              node3: '#2dd4bf',  // Tertiary teal
              node4: '#0f766e',  // Dark teal
              node5: '#115e59',  // Darker teal
              node6: '#134e4a',  // Darkest teal
              node7: '#042f2e',  // Almost black teal

              // State diagram colors
              labelBackgroundColor: '#f8fafc',
              compositeBackground: '#f1f5f9',

              // Note styling
              noteBkgColor: '#f8fafc',
              noteTextColor: '#1e293b',
              noteBorderColor: '#94a3b8',

              // Class diagram colors
              classText: '#1e293b',

              // Sequence diagram colors
              actorBkg: '#f8fafc',
              actorBorder: '#94a3b8',
              actorTextColor: '#1e293b',
              messageBorderColor: '#94a3b8',
              messageTextColor: '#1e293b',

              // Gantt diagram colors
              sectionBkgColor: '#f8fafc',
              altSectionBkgColor: '#f1f5f9',
              taskBorderColor: '#94a3b8',
              taskTextColor: '#1e293b',
              taskTextOutsideColor: '#1e293b',
              taskTextLightColor: '#1e293b',
              sectionBkgColor2: '#0d9488',
              gridColor: '#94a3b8',
              doneTaskBkgColor: '#0d9488',
              doneTaskBorderColor: '#0f766e',
              activeTaskBorderColor: '#2dd4bf',
              activeTaskBkgColor: '#14b8a6',

              // Pie diagram colors
              pie1: '#0d9488',
              pie2: '#0f766e',
              pie3: '#14b8a6',
              pie4: '#2dd4bf',
              pie5: '#115e59',
              pie6: '#134e4a',
              pie7: '#042f2e',
              pieTitleTextSize: '25px',
              pieTitleTextColor: '#1e293b',

              // Journey diagram colors
              journeyHover: '#2dd4bf',
            }
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
          sequence: {
            diagramMarginX: 50,
            diagramMarginY: 30,
            actorMargin: 100,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: false,
            bottomMarginAdj: 1,
            useMaxWidth: true,
            rightAngles: false,
            showSequenceNumbers: false,
            actorFontSize: 14,
            actorFontWeight: 500,
            noteFontSize: 14,
            messageFontSize: 14,
          },
          gantt: {
            titleTopMargin: 25,
            barHeight: 20,
            barGap: 4,
            topPadding: 50,
            leftPadding: 75,
            gridLineStartPadding: 35,
            fontSize: 14,
            sectionFontSize: 14,
            numberSectionStyles: 4,
            axisFormat: '%Y-%m-%d',
          },
        }
      }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }]
    ],
  },
});