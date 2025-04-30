/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.primary.800'),
            '--tw-prose-body': theme('colors.primary.800'),
            '--tw-prose-headings': theme('colors.primary.900'),
            '--tw-prose-links': theme('colors.accent.600'),
            '--tw-prose-bold': theme('colors.primary.900'),
            '--tw-prose-code': theme('colors.primary.900'),
            '--tw-prose-quotes': theme('colors.primary.800'),
            '--tw-prose-pre-bg': theme('colors.primary.900'),
            a: {
              color: theme('colors.accent.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.accent.700'),
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.primary.900'),
              fontWeight: '700',
              'scroll-margin-top': '100px',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: theme('colors.primary.100'),
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: theme('colors.primary.900'),
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                color: theme('colors.primary.100'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.500'),
              backgroundColor: theme('colors.primary.50'),
              padding: '1rem',
              borderRadius: '0.25rem',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.primary.200'),
            '--tw-prose-body': theme('colors.primary.200'),
            '--tw-prose-headings': theme('colors.primary.100'),
            '--tw-prose-links': theme('colors.accent.400'),
            '--tw-prose-bold': theme('colors.primary.100'),
            '--tw-prose-code': theme('colors.primary.100'),
            '--tw-prose-quotes': theme('colors.primary.200'),
            '--tw-prose-pre-bg': theme('colors.primary.800'),
            a: {
              color: theme('colors.accent.400'),
              '&:hover': {
                color: theme('colors.accent.300'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.primary.100'),
            },
            code: {
              backgroundColor: theme('colors.primary.800'),
            },
            pre: {
              backgroundColor: theme('colors.primary.800'),
              code: {
                color: theme('colors.primary.100'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.600'),
              backgroundColor: theme('colors.primary.900'),
              color: theme('colors.primary.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};