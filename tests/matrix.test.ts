import { directMatrixAssessment } from '../src/utils/matrix';
import { describe, it, expect } from 'vitest';

describe('matrix utils', () => {
  it('calculates average level and names', () => {
    const m = directMatrixAssessment();
    m.currentAssessment = {
      id: 'm1',
      title: 'Matrix',
      dimensions: [
        { id: 'd1', title: 'Dim 1' },
        { id: 'd2', title: 'Dim 2' },
      ],
      maturityLevels: [
        { id: 'l1', name: 'Level1', level: 1, color: '#111' },
        { id: 'l2', name: 'Level2', level: 2, color: '#222' },
        { id: 'l3', name: 'Level3', level: 3, color: '#333' },
      ],
    };
    m.responses = { d1: 'l2', d2: 'l3' };

    expect(m.getAverageLevel()).toBe('2.5');
    expect(m.getLevelName('d1')).toBe('Level2');
    expect(m.getLevelColor('d2')).toBe('#333');
  });
});
