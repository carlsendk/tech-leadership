export function directMatrixAssessment() {
  return {
    isLoading: true,
    currentAssessment: null as any,
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

    updateResponse(dimensionId: string, levelId: string) {
      this.responses[dimensionId] = levelId;
    },

    getProgress() {
      if (!this.currentAssessment?.dimensions) return 0;
      return Math.round((Object.keys(this.responses).length / this.currentAssessment.dimensions.length) * 100);
    },

    getDimensionCount() {
      return this.currentAssessment?.dimensions?.length || 0;
    },

    isComplete() {
      if (!this.currentAssessment?.dimensions) return false;
      return Object.keys(this.responses).length >= this.currentAssessment.dimensions.length;
    },

    completeAssessment() {
      if (!this.isComplete()) return;

      this.showResults = true;
      this.assessmentResult = {
        id: 'result-' + Date.now(),
        assessmentId: this.currentAssessment.id,
        assessmentTitle: this.currentAssessment.title,
        type: 'matrix',
        responses: this.responses,
        completedAt: new Date(),
        timeSpent: this.startTime ? Math.round((new Date().getTime() - this.startTime.getTime()) / 60000) : 0,
      };
    },

    getAverageLevel() {
      if (!this.currentAssessment?.dimensions) return 0;

      let total = 0;
      let count = 0;

      this.currentAssessment.dimensions.forEach((dimension: any) => {
        const levelId = this.responses[dimension.id];
        if (levelId) {
          const level = this.currentAssessment.maturityLevels.find((l: any) => l.id === levelId);
          if (level) {
            total += level.level;
            count++;
          }
        }
      });

      return count > 0 ? (total / count).toFixed(1) : 0;
    },

    getLevelColor(dimensionId: string) {
      const levelId = this.responses[dimensionId];
      if (!levelId) return '#6b7280';

      const level = this.currentAssessment?.maturityLevels?.find((l: any) => l.id === levelId);
      return level?.color || '#6b7280';
    },

    getLevelName(dimensionId: string) {
      const levelId = this.responses[dimensionId];
      if (!levelId) return 'Not selected';

      const level = this.currentAssessment?.maturityLevels?.find((l: any) => l.id === levelId);
      return level?.name || 'Unknown';
    },

    getLevelNumber(dimensionId: string) {
      const levelId = this.responses[dimensionId];
      if (!levelId) return 0;

      const level = this.currentAssessment?.maturityLevels?.find((l: any) => l.id === levelId);
      return level?.level || 0;
    },

    downloadResults() {
      if (!this.assessmentResult) return;

      const results = {
        ...this.assessmentResult,
        dimensions: this.currentAssessment?.dimensions?.map((dimension: any) => ({
          id: dimension.id,
          title: dimension.title,
          selectedLevel: this.responses[dimension.id],
          levelName: this.getLevelName(dimension.id),
          levelNumber: this.getLevelNumber(dimension.id),
          color: this.getLevelColor(dimension.id),
        })) || [],
        averageLevel: this.getAverageLevel(),
      };

      const content = JSON.stringify(results, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `matrix-assessment-${this.assessmentResult.assessmentId}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  };
}

