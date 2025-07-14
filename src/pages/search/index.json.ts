import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export interface SearchIndexEntry {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  category: string;
  tags: string[];
  type: 'blog' | 'wiki';
  date?: string;
  lastUpdated: string;
}

export async function GET(context: APIContext) {
  const searchIndex: SearchIndexEntry[] = [];

  try {
    // Get all blog posts
    const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
    
    for (const post of blogPosts) {
      // Extract text content from raw markdown
      const contentString = await extractTextContent(post);
      
      searchIndex.push({
        id: `blog-${post.slug}`,
        title: post.data.title,
        description: post.data.description,
        content: contentString.slice(0, 2000), // Limit content length for performance
        url: `/tech-leadership/blog/${post.slug}/`,
        category: post.data.category,
        tags: post.data.tags,
        type: 'blog',
        date: post.data.date.toISOString(),
        lastUpdated: new Date().toISOString(),
      });
    }

    // Get all wiki entries
    const wikiEntries = await getCollection('wiki', ({ data }) => !data.draft);
    
    for (const entry of wikiEntries) {
      // Extract text content from raw markdown
      const contentString = await extractTextContent(entry);
      
      searchIndex.push({
        id: `wiki-${entry.slug}`,
        title: entry.data.title,
        description: entry.data.description,
        content: contentString.slice(0, 2000), // Limit content length for performance
        url: `/tech-leadership/wiki/${entry.slug}/`,
        category: entry.data.category,
        tags: entry.data.tags,
        type: 'wiki',
        lastUpdated: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify(searchIndex, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating search index:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate search index' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Helper function to extract text content from collection entries
async function extractTextContent(entry: any): Promise<string> {
  try {
    // Get the raw markdown content from the collection entry
    const { body } = entry;
    
    if (!body) return '';
    
    // Basic text extraction from markdown
    // Remove markdown syntax for search purposes
    let content = body
      // Remove frontmatter (already handled by Astro)
      .replace(/^---[\s\S]*?---\n?/, '')
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove markdown links but keep the text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown emphasis
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown lists
      .replace(/^[\s]*[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // Clean up multiple whitespaces and newlines
      .replace(/\n{2,}/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    
    return content;
  } catch (error) {
    console.warn('Failed to extract content:', error);
    return '';
  }
}