# Development Guide

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Project Structure

### Content Management

Content is managed through Astro's content collections:

```typescript
// src/content/config.ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    // ...
  })
});
```

### Component Guidelines

1. **Naming Conventions**
   - Use PascalCase for component names
   - Use `.astro` extension for Astro components
   - Use descriptive names that indicate functionality

2. **Component Structure**
   - Props interface at the top
   - Component logic in the frontmatter
   - Clean, semantic HTML
   - Tailwind classes organized by concern

3. **State Management**
   - Use Alpine.js for client-side state
   - Keep state close to where it's used
   - Minimize global state

### Styling Guidelines

1. **Tailwind CSS**
   - Use utility classes
   - Create consistent spacing with standard values
   - Follow color scheme defined in `tailwind.config.mjs`

2. **Dark Mode**
   - Always implement dark mode variants
   - Test both themes thoroughly
   - Use semantic color variables

### Performance Optimization

1. **Image Optimization**
   - Use Astro's built-in image optimization
   - Implement lazy loading
   - Provide appropriate alt text

2. **Code Splitting**
   - Leverage Astro's automatic code splitting
   - Minimize client-side JavaScript
   - Use dynamic imports where appropriate

### Testing

1. **Component Testing**
   - Test component rendering
   - Verify props handling
   - Check responsive behavior

2. **Content Testing**
   - Validate frontmatter
   - Check internal links
   - Verify content rendering