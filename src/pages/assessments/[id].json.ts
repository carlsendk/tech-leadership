import type { APIContext, GetStaticPaths } from 'astro';
import { assessments } from '../../data/assessments';

export const getStaticPaths: GetStaticPaths = async () => {
  return assessments.map(assessment => ({
    params: { id: assessment.id }
  }));
};

export async function GET(context: APIContext) {
  const { id } = context.params;
  
  try {
    // Find the specific assessment
    const assessment = assessments.find(a => a.id === id);
    
    if (!assessment) {
      return new Response(JSON.stringify({ error: 'Assessment not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(assessment, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating assessment:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate assessment' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}