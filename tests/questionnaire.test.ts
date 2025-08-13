import { directQuestionnaireAssessment } from '../src/utils/questionnaire';
import { describe, it, expect } from 'vitest';

describe('questionnaire utils', () => {
  it('calculates scores and recommendations correctly', () => {
    const q = directQuestionnaireAssessment();
    q.currentAssessment = {
      id: 'a1',
      title: 'Test',
      sections: [
        { id: 's1', title: 'Section 1', description: '', questions: [{ id: 'q1', required: true }, { id: 'q2', required: true }] },
        { id: 's2', title: 'Section 2', description: '', questions: [{ id: 'q3', required: true }] },
      ],
      recommendations: [
        { scoreRange: [0, 5], title: 'Low', description: '', items: ['low'], nextSteps: [], priority: 'low' },
        { scoreRange: [6, 15], title: 'High', description: '', items: ['high'], nextSteps: [], priority: 'high' },
      ],
    };
    q.responses = { q1: '2', q2: '3', q3: '4' };

    expect(q.getOverallScore()).toBe('3.0');
    expect(q.getCompletionPercentage()).toBe(100);
    const sections = q.getSectionScores();
    expect(sections[0].score).toBeCloseTo(2.5);
    expect(sections[1].score).toBe(4);
    expect(q.getRecommendationsByScore().title).toBe('High');
    expect(q.getMaturityLevelText()).toBe('Developing (Expansion)');
  });
});
