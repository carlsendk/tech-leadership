import { describe, it, expect } from 'vitest';
import { calculateDora } from '../src/utils/calculators/dora';
import { calculateCodeQuality } from '../src/utils/calculators/codeQuality';
import { calculateIncidentCost } from '../src/utils/calculators/incidentCost';
import { calculateTechDebt } from '../src/utils/calculators/techDebt';

// DORA metric tests

describe('calculateDora', () => {
  it.each([
    { deployments: 7, expected: 'Elite' },
    { deployments: 1, expected: 'High' },
    { deployments: 0.25, expected: 'Medium' },
    { deployments: 0.1, expected: 'Low' }
  ])(
    'classifies deployment frequency $deployments as $expected',
    ({ deployments, expected }) => {
      const result = calculateDora(deployments, 1, 1, 5);
      expect(result.deploymentFreq).toBe(expected);
    }
  );

  it.each([
    { hours: 1, expected: 'Elite' },
    { hours: 24, expected: 'High' },
    { hours: 168, expected: 'Medium' },
    { hours: 169, expected: 'Low' }
  ])('classifies lead time $hours as $expected', ({ hours, expected }) => {
    const result = calculateDora(7, hours, 1, 5);
    expect(result.leadTime).toBe(expected);
  });

  it.each([
    { hours: 1, expected: 'Elite' },
    { hours: 24, expected: 'High' },
    { hours: 168, expected: 'Medium' },
    { hours: 169, expected: 'Low' }
  ])('classifies MTTR $hours as $expected', ({ hours, expected }) => {
    const result = calculateDora(7, 1, hours, 5);
    expect(result.mttr).toBe(expected);
  });

  it.each([
    { rate: 5, expected: 'Elite' },
    { rate: 10, expected: 'High' },
    { rate: 15, expected: 'Medium' },
    { rate: 16, expected: 'Low' }
  ])('classifies change failure rate $rate as $expected', ({ rate, expected }) => {
    const result = calculateDora(7, 1, 1, rate);
    expect(result.changeFailure).toBe(expected);
  });

  it('computes overall ratings', () => {
    expect(calculateDora(7, 1, 1, 5).overall).toBe('Elite');
    expect(calculateDora(1, 24, 24, 10).overall).toBe('High');
    expect(calculateDora(1, 168, 168, 15).overall).toBe('Medium');
    expect(calculateDora(0.1, 200, 200, 20).overall).toBe('Low');
  });
});

// Code quality calculator tests

describe('calculateCodeQuality', () => {
  it.each([
    { scores: [90, 90, 90], overall: 90, level: 'Excellent' },
    { scores: [80, 80, 80], overall: 80, level: 'Good' },
    { scores: [70, 70, 70], overall: 70, level: 'Fair' },
    { scores: [60, 60, 60], overall: 60, level: 'Poor' },
    { scores: [50, 50, 50], overall: 50, level: 'Critical' }
  ])('calculates level $level for scores $scores', ({ scores, overall, level }) => {
    const [t, r, s] = scores;
    const result = calculateCodeQuality(t, r, s);
    expect(result.overallScore).toBe(overall);
    expect(result.level).toBe(level);
  });

  it('rounds to nearest integer', () => {
    const result = calculateCodeQuality(90, 80, 75); // 82.5 => 83
    expect(result.overallScore).toBe(83);
    expect(result.level).toBe('Good');
  });
});

// Incident cost calculator tests

describe('calculateIncidentCost', () => {
  it('computes cost with impact multiplier', () => {
    const result = calculateIncidentCost(2, 1000, 3, 50, 2);
    expect(result).toEqual({
      revenueLoss: 2000,
      teamCost: 300,
      impactMultiplier: 1.5,
      totalCost: 3450
    });
  });

  it('defaults multiplier to 1 when impact level unknown', () => {
    const result = calculateIncidentCost(2, 100, 1, 100, 0);
    expect(result.impactMultiplier).toBe(1);
    expect(result.totalCost).toBe(result.revenueLoss + result.teamCost);
  });
});

// Tech debt calculator tests

describe('calculateTechDebt', () => {
  it('calculates annual cost and lost hours', () => {
    const result = calculateTechDebt(5, 100000, 10);
    expect(result).toEqual({
      annualCost: 50000,
      lostHours: 1040,
      equivalentDevs: 0.5
    });
  });

  it('returns zeros when tax is 0%', () => {
    const result = calculateTechDebt(5, 100000, 0);
    expect(result).toEqual({ annualCost: 0, lostHours: 0, equivalentDevs: 0 });
  });
});

