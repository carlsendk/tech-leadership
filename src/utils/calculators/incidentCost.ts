export interface IncidentCostResult {
  revenueLoss: number;
  teamCost: number;
  impactMultiplier: number;
  totalCost: number;
}

export function calculateIncidentCost(
  durationHours: number,
  revenuePerHour: number,
  peopleInvolved: number,
  hourlyRate: number,
  impactLevel: number
): IncidentCostResult {
  const revenueLoss = durationHours * revenuePerHour;
  const teamCost = durationHours * peopleInvolved * hourlyRate;
  const impactMultipliers: Record<number, number> = {
    1: 1.2,
    2: 1.5,
    3: 2.0,
    4: 3.0
  };
  const multiplier = impactMultipliers[impactLevel] ?? 1;
  const totalDirectCost = revenueLoss + teamCost;
  const totalCost = totalDirectCost * multiplier;
  return { revenueLoss, teamCost, impactMultiplier: multiplier, totalCost };
}
