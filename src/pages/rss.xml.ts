import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });

  // Sort blog posts by date (newest first)
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Technology Leadership Blog',
    description: 'Insights on engineering practices, operating models, and building high-performing technology organizations',
    site: context.site ?? 'https://carlsendk.github.io/tech-leadership/',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      author: post.data.author ? `${post.data.author.name} (${post.data.author.title || 'Technology Leadership Team'})` : 'Technology Leadership Team',
      link: `/tech-leadership/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
      customData: `
        <category>${post.data.category}</category>
        ${post.data.tags.map(tag => `<category>${tag}</category>`).join('\n        ')}
      `.trim(),
    })),
    customData: `
      <language>en-us</language>
      <managingEditor>noreply@github.com (Technology Leadership Team)</managingEditor>
      <webMaster>noreply@github.com (Technology Leadership Team)</webMaster>
      <copyright>Copyright ${new Date().getFullYear()}, Technology Leadership Platform</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro RSS Generator</generator>
      <docs>https://cyber.harvard.edu/rss/rss.html</docs>
      <ttl>60</ttl>
    `,
  });
}