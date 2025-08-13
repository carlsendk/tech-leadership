export interface TechDebtResult {
  annualCost: number;
  lostHours: number;
  equivalentDevs: number;
}

export function calculateTechDebt(
  teamSize: number,
  avgSalary: number,
  techDebtTax: number
): TechDebtResult {
  const debtTax = techDebtTax / 100;
  const totalSalaryCost = teamSize * avgSalary;
  const annualCost = totalSalaryCost * debtTax;
  const workingHoursPerYear = 2080;
  const lostHours = teamSize * workingHoursPerYear * debtTax;
  const equivalentDevs = lostHours / workingHoursPerYear;
  return { annualCost, lostHours, equivalentDevs };
}
