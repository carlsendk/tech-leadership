import type { APIContext } from 'astro';
import { assessments } from '../../data/assessments';

export async function GET(context: APIContext) {
  try {
    // Return the list of available assessments (metadata only)
    const assessmentList = assessments.map(assessment => ({
      id: assessment.id,
      title: assessment.title,
      description: assessment.description,
      type: assessment.type || 'questionnaire',
      category: assessment.category,
      estimatedTime: assessment.estimatedTime,
      tags: assessment.tags,
      version: assessment.version,
      updatedAt: assessment.updatedAt
    }));

    return new Response(JSON.stringify(assessmentList, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating assessments index:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate assessments index' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}