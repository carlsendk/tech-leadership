export type DoraRating = 'Elite' | 'High' | 'Medium' | 'Low';

export interface DoraResult {
  overall: DoraRating;
  deploymentFreq: DoraRating;
  leadTime: DoraRating;
  mttr: DoraRating;
  changeFailure: DoraRating;
}

export function calculateDora(
  deploymentsPerWeek: number,
  leadTimeHours: number,
  mttrHours: number,
  changeFailureRate: number
): DoraResult {
  const deploymentFreq = getDeploymentFreqRating(deploymentsPerWeek);
  const leadTime = getLeadTimeRating(leadTimeHours);
  const mttr = getMTTRRating(mttrHours);
  const changeFailure = getChangeFailureRating(changeFailureRate);
  const overall = getOverallRating([deploymentFreq, leadTime, mttr, changeFailure]);
  return { overall, deploymentFreq, leadTime, mttr, changeFailure };
}

function getDeploymentFreqRating(deploymentsPerWeek: number): DoraRating {
  if (deploymentsPerWeek >= 7) return 'Elite';
  if (deploymentsPerWeek >= 1) return 'High';
  if (deploymentsPerWeek >= 0.25) return 'Medium';
  return 'Low';
}

function getLeadTimeRating(hours: number): DoraRating {
  if (hours <= 1) return 'Elite';
  if (hours <= 24) return 'High';
  if (hours <= 168) return 'Medium';
  return 'Low';
}

function getMTTRRating(hours: number): DoraRating {
  if (hours <= 1) return 'Elite';
  if (hours <= 24) return 'High';
  if (hours <= 168) return 'Medium';
  return 'Low';
}

function getChangeFailureRating(percentage: number): DoraRating {
  if (percentage <= 5) return 'Elite';
  if (percentage <= 10) return 'High';
  if (percentage <= 15) return 'Medium';
  return 'Low';
}

function getOverallRating(ratings: DoraRating[]): DoraRating {
  const eliteCount = ratings.filter(r => r === 'Elite').length;
  const highCount = ratings.filter(r => r === 'High').length;
  if (eliteCount >= 3) return 'Elite';
  if (eliteCount + highCount >= 3) return 'High';
  if (ratings.filter(r => r === 'Low').length <= 1) return 'Medium';
  return 'Low';
}
