export interface CodeQualityResult {
  overallScore: number;
  level: string;
  testScore: number;
  reviewScore: number;
  staticScore: number;
}

export function calculateCodeQuality(
  testCoverage: number,
  codeReviewCoverage: number,
  staticAnalysisScore: number
): CodeQualityResult {
  const overallScore = Math.round(
    testCoverage * 0.4 + codeReviewCoverage * 0.3 + staticAnalysisScore * 0.3
  );
  const level =
    overallScore >= 90 ? 'Excellent' :
    overallScore >= 80 ? 'Good' :
    overallScore >= 70 ? 'Fair' :
    overallScore >= 60 ? 'Poor' : 'Critical';
  return {
    overallScore,
    level,
    testScore: testCoverage,
    reviewScore: codeReviewCoverage,
    staticScore: staticAnalysisScore
  };
}
