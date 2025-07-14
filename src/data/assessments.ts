// Assessment system data types and interfaces
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

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type?: 'questionnaire' | 'matrix' | 'checklist';
  version: string;
  category: string;
  estimatedTime: number; // minutes
  sections: AssessmentSection[];
  scoring: {
    maxScore: number;
    weights: Record<string, number>;
    recommendations: AssessmentRecommendation[];
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentResponse {
  questionId: string;
  sectionId: string;
  value: string | number;
  timestamp: Date;
}

export interface SectionScore {
  sectionId: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  responses: AssessmentResponse[];
  sectionScores: SectionScore[];
  totalScore: number;
  totalMaxScore: number;
  overallPercentage: number;
  recommendations: AssessmentRecommendation[];
  completedAt: Date;
  timeSpent: number; // minutes
}

export interface UserAssessmentProgress {
  assessmentId: string;
  currentSectionIndex: number;
  responses: AssessmentResponse[];
  startedAt: Date;
  lastSavedAt: Date;
}

// Engineering Practices Assessment Data
export const engineeringPracticesAssessment: Assessment = {
  id: 'engineering-practices',
  title: 'Engineering Practices Maturity Assessment',
  description: 'Evaluate your organization\'s engineering practices maturity across five key stages: Normalization, Standardization, Expansion, Automation, and Self-Service.',
  type: 'questionnaire',
  version: '1.0',
  category: 'Engineering Excellence',
  estimatedTime: 15,
  sections: [
    {
      id: 'normalization',
      title: 'Normalization Practices',
      description: 'Foundation: Establishing consistent basic practices across teams',
      weight: 0.2,
      questions: [
        {
          id: 'version-control',
          text: 'How mature is your version control system?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['No VCS', 'Basic Git', 'Structured Workflows', 'Advanced Branching', 'Full Automation'],
          helpText: 'Consider branching strategies, code review processes, and automation.',
          required: true
        },
        {
          id: 'development-guidelines',
          text: 'How well-established are your development guidelines?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['No Guidelines', 'Basic Rules', 'Documented Standards', 'Enforced Standards', 'Automated Enforcement'],
          helpText: 'Think about coding standards, code review processes, and documentation practices.',
          required: true
        },
        {
          id: 'standardized-systems',
          text: 'How consistent are your development tools and environments?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Ad-hoc Tools', 'Some Standards', 'Mostly Consistent', 'Highly Standardized', 'Fully Automated Setup'],
          helpText: 'Consider development environment setup, tooling consistency, and environment management.',
          required: true
        }
      ]
    },
    {
      id: 'standardization',
      title: 'Standardization Practices',
      description: 'Consistency: Creating reusable patterns and golden paths',
      weight: 0.2,
      questions: [
        {
          id: 'golden-path',
          text: 'How well-defined are your golden paths for common workflows?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['No Patterns', 'Some Templates', 'Documented Paths', 'Automated Paths', 'Self-Optimizing Paths'],
          helpText: 'Think about standardized workflows for new projects, deployments, and common development tasks.',
          required: true
        },
        {
          id: 'infrastructure-as-code',
          text: 'How mature is your Infrastructure as Code implementation?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Manual Setup', 'Some Scripts', 'Basic IaC', 'Advanced IaC', 'Full Automation'],
          helpText: 'Consider declarative infrastructure, version control of infrastructure, and automated provisioning.',
          required: true
        },
        {
          id: 'containerization',
          text: 'How consistently do you use containerization across your applications?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['No Containers', 'Some Apps', 'Most Apps', 'All Apps', 'Advanced Orchestration'],
          helpText: 'Think about Docker usage, container registries, and orchestration platforms.',
          required: true
        }
      ]
    },
    {
      id: 'expansion',
      title: 'Expansion Practices',
      description: 'Scaling: Enabling autonomous teams with end-to-end ownership',
      weight: 0.2,
      questions: [
        {
          id: 'autonomous-teams',
          text: 'How autonomous are your development teams?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Dependent Teams', 'Some Autonomy', 'Mostly Autonomous', 'High Autonomy', 'Full End-to-End Ownership'],
          helpText: 'Consider team decision-making authority, cross-functional capabilities, and ownership scope.',
          required: true
        },
        {
          id: 'continuous-integration',
          text: 'How mature is your continuous integration process?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Manual Testing', 'Basic CI', 'Automated Testing', 'Advanced CI', 'Full Quality Gates'],
          helpText: 'Think about automated testing, build automation, and quality gates.',
          required: true
        },
        {
          id: 'observability',
          text: 'How comprehensive is your observability and feedback system?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Basic Logs', 'Some Monitoring', 'Good Observability', 'Advanced Insights', 'Predictive Analytics'],
          helpText: 'Consider monitoring, logging, tracing, and alerting capabilities.',
          required: true
        }
      ]
    },
    {
      id: 'automation',
      title: 'Automation Practices',
      description: 'Intelligence: Implementing intelligent operations and self-healing systems',
      weight: 0.2,
      questions: [
        {
          id: 'automated-configuration',
          text: 'How automated is your system configuration management?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Manual Config', 'Some Automation', 'Mostly Automated', 'Full Automation', 'Self-Healing'],
          helpText: 'Think about configuration management, drift detection, and automated remediation.',
          required: true
        },
        {
          id: 'automated-provisioning',
          text: 'How automated is your resource provisioning?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Manual Provisioning', 'Script-Based', 'Template-Based', 'Policy-Based', 'AI-Driven'],
          helpText: 'Consider auto-scaling, resource optimization, and cost management automation.',
          required: true
        },
        {
          id: 'devsecops',
          text: 'How integrated is security throughout your development lifecycle?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Security Afterthought', 'Basic Scanning', 'Integrated Security', 'Shift-Left Security', 'Security by Design'],
          helpText: 'Think about security scanning, compliance automation, and vulnerability management.',
          required: true
        }
      ]
    },
    {
      id: 'self-service',
      title: 'Self-Service Practices',
      description: 'Platform: Enabling platform-driven development and citizen developers',
      weight: 0.2,
      questions: [
        {
          id: 'self-service-platform',
          text: 'How mature is your self-service developer platform?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['No Platform', 'Basic Tools', 'Developer Portal', 'Rich Platform', 'AI-Enhanced Platform'],
          helpText: 'Consider developer portals, self-service APIs, and platform automation.',
          required: true
        },
        {
          id: 'low-code-solutions',
          text: 'How effectively do you leverage low-code/no-code solutions?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['No Low-Code', 'Basic Tools', 'Some Adoption', 'Strategic Use', 'Platform Integration'],
          helpText: 'Think about business application development and citizen developer enablement.',
          required: true
        },
        {
          id: 'golden-path-evolution',
          text: 'How data-driven is your golden path optimization?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Static Paths', 'Manual Updates', 'Feedback-Driven', 'Data-Optimized', 'AI-Optimized'],
          helpText: 'Consider how you collect feedback and continuously improve your development workflows.',
          required: true
        }
      ]
    }
  ],
  scoring: {
    maxScore: 75, // 15 questions × 5 points each
    weights: {
      normalization: 0.2,
      standardization: 0.2,
      expansion: 0.2,
      automation: 0.2,
      selfService: 0.2
    },
    recommendations: [
      {
        scoreRange: [0, 30],
        title: 'Focus on Foundation',
        description: 'Your organization needs to establish basic engineering practices before advancing to higher maturity stages.',
        items: [
          'Implement consistent version control workflows',
          'Establish development guidelines and code review processes',
          'Standardize development tools and environments',
          'Create basic documentation practices'
        ],
        nextSteps: [
          '/tech-leadership/wiki/engineering-practices/normalization/',
          '/tech-leadership/blog/engineering-practices-health-check/',
          '/tech-leadership/wiki/engineering-practices/normalization/version-control/'
        ],
        priority: 'high'
      },
      {
        scoreRange: [31, 45],
        title: 'Build Consistency',
        description: 'You have solid foundations. Focus on creating reusable patterns and golden paths.',
        items: [
          'Develop golden paths for common workflows',
          'Implement Infrastructure as Code',
          'Standardize containerization practices',
          'Create template-based development workflows'
        ],
        nextSteps: [
          '/tech-leadership/wiki/engineering-practices/standardization/',
          '/tech-leadership/wiki/engineering-practices/standardization/golden-path/',
          '/tech-leadership/wiki/engineering-practices/standardization/infrastructure-as-code/'
        ],
        priority: 'high'
      },
      {
        scoreRange: [46, 60],
        title: 'Scale with Autonomy',
        description: 'Your standardization is good. Focus on enabling autonomous teams and end-to-end ownership.',
        items: [
          'Increase team autonomy and decision-making authority',
          'Implement comprehensive CI/CD pipelines',
          'Build robust observability and feedback systems',
          'Enable teams with full stack capabilities'
        ],
        nextSteps: [
          '/tech-leadership/wiki/engineering-practices/expansion/',
          '/tech-leadership/wiki/engineering-practices/expansion/autonomous-teams/',
          '/tech-leadership/blog/autonomous-teams-implementation/'
        ],
        priority: 'medium'
      },
      {
        scoreRange: [61, 70],
        title: 'Automate Operations',
        description: 'Your teams are scaling well. Focus on intelligent automation and self-healing systems.',
        items: [
          'Implement automated configuration management',
          'Build intelligent resource provisioning',
          'Integrate security throughout the development lifecycle',
          'Create predictive analytics for system health'
        ],
        nextSteps: [
          '/tech-leadership/wiki/engineering-practices/automation/',
          '/tech-leadership/wiki/engineering-practices/automation/automated-system-configuration/',
          '/tech-leadership/wiki/engineering-practices/automation/devsecops/'
        ],
        priority: 'medium'
      },
      {
        scoreRange: [71, 75],
        title: 'Enable Self-Service',
        description: 'You have excellent automation. Focus on platform-driven development and citizen developers.',
        items: [
          'Build comprehensive self-service developer platforms',
          'Enable low-code/no-code solutions strategically',
          'Implement AI-driven golden path optimization',
          'Empower citizen developers with proper governance'
        ],
        nextSteps: [
          '/tech-leadership/wiki/engineering-practices/self-service/',
          '/tech-leadership/wiki/engineering-practices/self-service/self-service-platform/',
          '/tech-leadership/blog/golden-path-evolution/'
        ],
        priority: 'low'
      }
    ]
  },
  tags: ['engineering-practices', 'maturity-assessment', 'team-health', 'continuous-improvement'],
  createdAt: '2025-01-13T00:00:00.000Z',
  updatedAt: '2025-01-13T00:00:00.000Z'
};

// Matrix Assessment Interface Extension
export interface MatrixAssessment extends Assessment {
  type: 'matrix';
  dimensions: MatrixDimension[];
  maturityLevels: MatrixLevel[];
  dimensionDetails: Record<string, Record<string, string>>;
}

export interface MatrixDimension {
  id: string;
  title: string;
  description: string;
  weight: number;
}

export interface MatrixLevel {
  id: string;
  name: string;
  description: string;
  level: number;
  color: string;
}

// Cloud Native Maturity Matrix Assessment  
export const cloudNativeMaturityAssessment: MatrixAssessment = {
  id: 'cloud-native-maturity',
  title: 'Cloud Native Maturity Matrix',
  description: 'Assess your organization\'s cloud native maturity across multiple dimensions including culture, architecture, delivery, and operations.',
  type: 'matrix',
  version: '1.0',
  category: 'Cloud Native',
  estimatedTime: 10,
  dimensions: [
    {
      id: 'culture',
      title: 'Culture',
      description: 'Organizational mindset and approach to change, learning, and collaboration',
      weight: 1.0
    },
    {
      id: 'product-management',
      title: 'Product Management',
      description: 'How products are planned, developed, and managed throughout their lifecycle',
      weight: 1.0
    },
    {
      id: 'delivery',
      title: 'Delivery',
      description: 'Methods and practices for delivering software to production',
      weight: 1.0
    },
    {
      id: 'architecture',
      title: 'Architecture',
      description: 'System design patterns and architectural approaches',
      weight: 1.0
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      description: 'Infrastructure patterns and management approaches',
      weight: 1.0
    }
  ],
  maturityLevels: [
    {
      id: 'no-process',
      name: 'No Process',
      description: 'Ad-hoc, individual-driven approaches with minimal standardization',
      level: 1,
      color: '#ef4444'
    },
    {
      id: 'waterfall',
      name: 'Waterfall',
      description: 'Traditional, sequential approaches with predictable but rigid processes',
      level: 2,
      color: '#f97316'
    },
    {
      id: 'agile',
      name: 'Agile',
      description: 'Iterative development with increased flexibility and faster feedback cycles',
      level: 3,
      color: '#eab308'
    },
    {
      id: 'cloud-native',
      name: 'Cloud Native',
      description: 'Distributed, resilient systems optimized for cloud environments',
      level: 4,
      color: '#22c55e'
    },
    {
      id: 'next',
      name: 'Next',
      description: 'Advanced, self-organizing systems with AI-driven optimization',
      level: 5,
      color: '#3b82f6'
    }
  ],
  dimensionDetails: {
    culture: {
      'no-process': 'Individualist - Work in silos, ad-hoc decision making',
      'waterfall': 'Predictive - Top-down management, risk-averse, blame culture',
      'agile': 'Iterative - Learning oriented, cross-functional collaboration',
      'cloud-native': 'Experimental - Data-driven decisions, fast failure recovery',
      'next': 'Self-Organized - Autonomous teams, continuous learning, innovation focus'
    },
    'product-management': {
      'no-process': 'Projects - Feature-driven, no customer feedback loops',
      'waterfall': 'Long-term plan - Annual planning cycles, limited customer input',
      'agile': 'Feature driven - Sprint-based delivery, regular customer interaction',
      'cloud-native': 'Data driven - Hypothesis-driven development, A/B testing',
      'next': 'AI driven - Machine learning insights, predictive customer needs'
    },
    delivery: {
      'no-process': 'Irregular releases - Manual, unpredictable deployment',
      'waterfall': 'Scheduled releases - Quarterly or annual releases',
      'agile': 'Feature driven - Sprint-based releases, some automation',
      'cloud-native': 'Continuous deployment - Automated pipelines, daily releases',
      'next': 'AI driven - Intelligent deployment strategies, self-healing systems'
    },
    architecture: {
      'no-process': 'Emergent - No planned architecture, technical debt',
      'waterfall': 'Tightly coupled - Monolithic architecture, shared databases',
      'agile': 'Client server - Service-oriented architecture, API layers',
      'cloud-native': 'Microservices - Loosely coupled, event-driven architecture',
      'next': 'Functions - Serverless, event mesh, self-adapting systems'
    },
    infrastructure: {
      'no-process': 'Single server - Physical servers, manual management',
      'waterfall': 'Multiple servers - Virtual machines, basic clustering',
      'agile': 'VMs in cloud - Cloud adoption, auto-scaling groups',
      'cloud-native': 'Containers - Kubernetes, service mesh, cloud-native services',
      'next': 'Serverless - Function-as-a-service, edge computing, AI optimization'
    }
  },
  sections: [],
  scoring: {
    maxScore: 25, // 5 questions × 5 points each
    weights: {
      'cloud-native-dimensions': 1.0
    },
    recommendations: [
      {
        scoreRange: [0, 10],
        title: 'Foundation Building',
        description: 'Focus on establishing basic processes and moving away from ad-hoc approaches.',
        items: [
          'Implement version control for all code and infrastructure',
          'Establish basic CI/CD pipelines',
          'Create cross-functional teams',
          'Adopt agile development practices'
        ],
        nextSteps: [
          '/tech-leadership/wiki/cloud-native/foundation/',
          '/tech-leadership/blog/cloud-native-getting-started/'
        ],
        priority: 'high'
      },
      {
        scoreRange: [11, 15],
        title: 'Agile Transformation',
        description: 'Mature your agile practices and begin cloud adoption.',
        items: [
          'Implement comprehensive testing strategies',
          'Adopt infrastructure as code',
          'Establish monitoring and observability',
          'Begin containerization journey'
        ],
        nextSteps: [
          '/tech-leadership/wiki/cloud-native/agile-transformation/',
          '/tech-leadership/tools/'
        ],
        priority: 'high'
      },
      {
        scoreRange: [16, 20],
        title: 'Cloud Native Adoption',
        description: 'Embrace cloud native patterns and microservices architecture.',
        items: [
          'Implement microservices architecture',
          'Adopt Kubernetes and container orchestration',
          'Implement comprehensive observability',
          'Establish chaos engineering practices'
        ],
        nextSteps: [
          '/tech-leadership/wiki/cloud-native/microservices/',
          '/tech-leadership/wiki/cloud-native/observability/'
        ],
        priority: 'medium'
      },
      {
        scoreRange: [21, 25],
        title: 'Future-Ready Organization',
        description: 'Leverage AI and automation for next-generation capabilities.',
        items: [
          'Implement AI-driven development processes',
          'Adopt serverless and edge computing',
          'Establish self-healing systems',
          'Implement predictive analytics'
        ],
        nextSteps: [
          '/tech-leadership/wiki/cloud-native/future-ready/',
          '/tech-leadership/blog/ai-driven-development/'
        ],
        priority: 'low'
      }
    ]
  },
  tags: ['cloud-native', 'maturity-assessment', 'organizational-transformation', 'devops'],
  createdAt: '2025-07-14T00:00:00.000Z',
  updatedAt: '2025-07-14T00:00:00.000Z'
};

// Export assessments array for build-time generation
export const assessments: Assessment[] = [
  engineeringPracticesAssessment,
  cloudNativeMaturityAssessment as Assessment
];