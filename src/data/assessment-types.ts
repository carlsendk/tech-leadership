// Assessment Types and Base Interfaces
export type AssessmentType = 'questionnaire' | 'matrix' | 'checklist';

export interface BaseAssessment {
  id: string;
  title: string;
  description: string;
  type: AssessmentType;
  version: string;
  category: string;
  estimatedTime: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Questionnaire-style assessment (like our current engineering practices)
export interface QuestionnaireAssessment extends BaseAssessment {
  type: 'questionnaire';
  sections: AssessmentSection[];
  scoring: {
    maxScore: number;
    weights: Record<string, number>;
    recommendations: AssessmentRecommendation[];
  };
}

// Matrix-style assessment (like Container Solutions maturity matrix)
export interface MatrixAssessment extends BaseAssessment {
  type: 'matrix';
  dimensions: MatrixDimension[];
  maturityLevels: MaturityLevel[];
  scoring: {
    interpretation: string;
    recommendations: MatrixRecommendation[];
  };
}

// Matrix-specific types
export interface MatrixDimension {
  id: string;
  title: string;
  description: string;
  weight: number;
}

export interface MaturityLevel {
  id: string;
  name: string;
  description: string;
  level: number;
  color: string;
}

export interface MatrixRecommendation {
  title: string;
  description: string;
  applicableWhen: {
    averageLevel?: number;
    specificDimensions?: Array<{
      dimensionId: string;
      maxLevel: number;
    }>;
  };
  actions: string[];
  priority: 'high' | 'medium' | 'low';
}

// Existing questionnaire types (from assessments.ts)
export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'scale' | 'multiple-choice' | 'yes-no' | 'text';
  min?: number;
  max?: number;
  labels?: string[];
  options?: string[];
  helpText?: string;
  required?: boolean;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  weight: number;
}

export interface AssessmentRecommendation {
  scoreRange: [number, number];
  title: string;
  description: string;
  items: string[];
  nextSteps: string[];
  priority: 'high' | 'medium' | 'low';
}

// Response and result types
export interface MatrixResponse {
  dimensionId: string;
  levelId: string;
  timestamp: Date;
}

export interface MatrixResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  responses: MatrixResponse[];
  dimensionScores: Array<{
    dimensionId: string;
    level: number;
    levelName: string;
  }>;
  averageLevel: number;
  recommendations: MatrixRecommendation[];
  completedAt: Date;
}

// Checklist-style assessment (for future use)
export interface ChecklistAssessment extends BaseAssessment {
  type: 'checklist';
  categories: ChecklistCategory[];
}

export interface ChecklistCategory {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  weight: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
  required: boolean;
  weight: number;
}