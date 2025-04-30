# API Documentation

## Content API

### Blog Posts

```typescript
interface BlogPost {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  category: string;
  author?: {
    name: string;
    avatar?: string;
    title?: string;
  };
}
```

### Wiki Articles

```typescript
interface WikiArticle {
  title: string;
  description: string;
  tags: string[];
  category: string;
  order?: number;
}
```

## Component Props

### ContentCard

```typescript
interface ContentCardProps {
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
  date?: Date;
  isWiki?: boolean;
  author?: {
    name: string;
    avatar?: string;
    title?: string;
  };
}
```

### FilterBox

```typescript
interface FilterBoxProps {
  title?: string;
  categories?: string[];
  activeCategory?: string | null;
  tags?: string[];
  activeTag?: string | null;
  baseUrl: string;
}
```

### TableOfContents

```typescript
interface TableOfContentsProps {
  headings: {
    depth: number;
    slug: string;
    text: string;
  }[];
}
```

## Utility Functions

### URL Handling

```typescript
function buildUrl(base: string, params: Record<string, string>): string;
```

### Content Processing

```typescript
function getReadingTime(content: string): string;
function formatDate(date: Date): string;
```