export function directQuestionnaireAssessment() {
  return {
    isLoading: true,
    currentAssessment: null as any,
    currentSectionIndex: 0,
    responses: {} as Record<string, any>,
    showResults: false,
    assessmentResult: null as any,
    startTime: null as Date | null,

    async loadAssessment() {
      try {
        this.isLoading = true;
        const assessmentId = window.location.pathname.split('/').filter(p => p).pop();
        const response = await fetch(`/tech-leadership/assessments/${assessmentId}.json`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.currentAssessment = await response.json();
        this.currentSectionIndex = 0;
        this.responses = {};
        this.startTime = new Date();
        this.showResults = false;
      } catch (error: any) {
        console.error('Failed to load assessment:', error);
        alert(`Failed to load assessment: ${error.message}`);
      } finally {
        this.isLoading = false;
      }
    },

    getCurrentSection() {
      return this.currentAssessment?.sections?.[this.currentSectionIndex] || null;
    },

    getProgress() {
      if (!this.currentAssessment?.sections) return 0;
      return Math.round(((this.currentSectionIndex + 1) / this.currentAssessment.sections.length) * 100);
    },

    updateResponse(questionId: string, value: string | number) {
      this.responses[questionId] = value;
    },

    isSectionComplete() {
      const currentSection = this.getCurrentSection();
      if (!currentSection) return false;

      const requiredQuestions = currentSection.questions.filter((q: any) => q.required);
      return requiredQuestions.every((q: any) => this.responses[q.id] !== undefined && this.responses[q.id] !== '');
    },

    nextSection() {
      if (this.isSectionComplete() && this.currentSectionIndex < (this.currentAssessment?.sections?.length || 0) - 1) {
        this.currentSectionIndex++;
      }
    },

    previousSection() {
      if (this.currentSectionIndex > 0) {
        this.currentSectionIndex--;
      }
    },

    completeAssessment() {
      if (!this.isSectionComplete()) return;

      this.showResults = true;
      this.assessmentResult = {
        id: 'result-' + Date.now(),
        assessmentId: this.currentAssessment.id,
        assessmentTitle: this.currentAssessment.title,
        type: 'questionnaire',
        responses: this.responses,
        completedAt: new Date(),
        timeSpent: this.startTime ? Math.round((new Date().getTime() - this.startTime.getTime()) / 60000) : 0,
      };
    },

    getOverallScore() {
      if (!this.currentAssessment?.sections) return 0;

      let totalScore = 0;
      let totalQuestions = 0;

      this.currentAssessment.sections.forEach((section: any) => {
        section.questions.forEach((question: any) => {
          if (this.responses[question.id]) {
            totalScore += parseInt(this.responses[question.id]);
            totalQuestions++;
          }
        });
      });

      return totalQuestions > 0 ? (totalScore / totalQuestions).toFixed(1) : 0;
    },

    getCompletionPercentage() {
      if (!this.currentAssessment?.sections) return 0;

      let totalQuestions = 0;
      let answeredQuestions = 0;

      this.currentAssessment.sections.forEach((section: any) => {
        section.questions.forEach((question: any) => {
          totalQuestions++;
          if (this.responses[question.id]) {
            answeredQuestions++;
          }
        });
      });

      return Math.round((answeredQuestions / totalQuestions) * 100);
    },

    getSectionScores() {
      if (!this.currentAssessment?.sections) return [] as any[];

      return this.currentAssessment.sections.map((section: any) => {
        let sectionScore = 0;
        let questionCount = 0;

        section.questions.forEach((question: any) => {
          if (this.responses[question.id]) {
            sectionScore += parseInt(this.responses[question.id]);
            questionCount++;
          }
        });

        return {
          id: section.id,
          title: section.title,
          description: section.description,
          score: questionCount > 0 ? sectionScore / questionCount : 0,
        };
      });
    },

    getHighestScoringSection() {
      const sections = this.getSectionScores();
      return sections.reduce((highest: any, section: any) => (section.score > (highest?.score || 0) ? section : highest), null);
    },

    getMaturityLevelText() {
      const score = parseFloat(this.getOverallScore());
      if (score >= 4.5) return 'Advanced (Self-Service)';
      if (score >= 3.5) return 'Mature (Automation)';
      if (score >= 2.5) return 'Developing (Expansion)';
      if (score >= 1.5) return 'Basic (Standardization)';
      return 'Initial (Normalization)';
    },

    getMaturityDescription() {
      const score = parseFloat(this.getOverallScore());
      if (score >= 4.5) return 'Your organization has reached advanced maturity with self-service capabilities and autonomous systems.';
      if (score >= 3.5) return 'Your organization has mature practices with extensive automation and efficient workflows.';
      if (score >= 2.5) return 'Your organization is developing with expanding practices and growing consistency.';
      if (score >= 1.5) return 'Your organization has basic standardization with some consistent practices in place.';
      return 'Your organization is in the initial stage, focusing on normalizing basic practices.';
    },

    getRecommendationsByScore() {
      const totalScore = this.getTotalScore();
      const recommendations = this.currentAssessment?.recommendations || [];

      for (const rec of recommendations as any[]) {
        if (totalScore >= rec.scoreRange[0] && totalScore <= rec.scoreRange[1]) {
          return rec;
        }
      }

      return {
        title: 'Keep Improving',
        description: 'Continue building on your current practices.',
        items: ['Review and refine existing processes'],
        nextSteps: [],
        priority: 'medium',
      };
    },

    getTotalScore() {
      if (!this.currentAssessment?.sections) return 0;

      let totalScore = 0;
      let totalQuestions = 0;

      this.currentAssessment.sections.forEach((section: any) => {
        section.questions.forEach((question: any) => {
          if (this.responses[question.id]) {
            totalScore += parseInt(this.responses[question.id]);
            totalQuestions++;
          }
        });
      });

      return totalScore;
    },

    getTopRecommendations() {
      const recommendation = this.getRecommendationsByScore();
      return recommendation.items || [];
    },

    getActionItems() {
      const sections = this.getSectionScores();
      const actionItems: any[] = [];

      sections.forEach((section: any) => {
        if (section.score < 3) {
          if (section.id === 'normalization') {
            actionItems.push({
              title: 'Establish Version Control Standards',
              description: 'Implement consistent branching strategies and code review processes',
              priority: 'high',
            });
          } else if (section.id === 'standardization') {
            actionItems.push({
              title: 'Create Golden Path Documentation',
              description: 'Document and standardize common workflows and patterns',
              priority: 'high',
            });
          } else if (section.id === 'expansion') {
            actionItems.push({
              title: 'Scale Practices Across Teams',
              description: 'Ensure consistent implementation across all development teams',
              priority: 'medium',
            });
          } else if (section.id === 'automation') {
            actionItems.push({
              title: 'Implement CI/CD Pipelines',
              description: 'Automate testing, building, and deployment processes',
              priority: 'high',
            });
          } else if (section.id === 'self-service') {
            actionItems.push({
              title: 'Enable Self-Service Capabilities',
              description: 'Provide tools and platforms for autonomous operations',
              priority: 'low',
            });
          }
        }
      });

      return actionItems.slice(0, 6); // Limit to 6 items
    },

    getLinkTitle(link: string) {
      const pathParts = link.split('/').filter(part => part && part !== 'tech-leadership');
      if (pathParts.length >= 2) {
        const lastPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        return lastPart
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return 'Knowledge Base Article';
    },

    getLinkDescription(link: string) {
      if (link.includes('/wiki/')) {
        return 'Wiki article with detailed guidance';
      } else if (link.includes('/blog/')) {
        return 'Blog post with practical insights';
      } else if (link.includes('/tools/')) {
        return 'Interactive tool or calculator';
      }
      return 'Knowledge base resource';
    },

    restartAssessment() {
      this.showResults = false;
      this.assessmentResult = null;
      this.currentSectionIndex = 0;
      this.responses = {};
      this.startTime = new Date();
    },

    downloadResults() {
      if (!this.assessmentResult) return;

      const detailedResults = {
        ...this.assessmentResult,
        overallScore: this.getOverallScore(),
        completionPercentage: this.getCompletionPercentage(),
        maturityLevel: this.getMaturityLevelText(),
        maturityDescription: this.getMaturityDescription(),
        sectionBreakdown: this.getSectionScores(),
        recommendations: this.getTopRecommendations(),
        actionItems: this.getActionItems(),
        generatedAt: new Date().toISOString(),
      };

      const content = JSON.stringify(detailedResults, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `engineering-practices-assessment-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  };
}

