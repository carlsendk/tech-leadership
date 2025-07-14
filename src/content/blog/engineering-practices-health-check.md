---
title: "Engineering Practices Health Check: A Maturity Assessment Model"
description: "Inspired by Spotify's squad health check, we present a comprehensive model for assessing engineering practices maturity across your organization"
date: 2025-01-15
category: "Engineering Excellence"
tags: ["engineering-practices", "maturity-assessment", "team-health", "continuous-improvement"]
author:
  name: "Technology Leadership Team"
  title: "Engineering Excellence"
# image: "/images/blog/engineering-health-check.jpg"
---

# Engineering Practices Health Check: A Maturity Assessment Model

In 2014, Spotify shared their influential [Squad Health Check model](https://engineering.atspotify.com/2014/09/squad-health-check-model), which provided a simple yet powerful way for teams to assess their health and identify improvement opportunities. Building on this foundation, we've developed an Engineering Practices Health Check model that helps organizations assess their engineering maturity across the five key stages we've outlined in our [comprehensive engineering practices framework](../wiki/engineering-practices).

## Why Engineering Practices Health Checks Matter

Just as Spotify recognized that "all models are wrong, but some are useful," we believe that systematic assessment of engineering practices provides valuable insights without creating a punitive environment. The goal isn't to judge teams or create competition—it's to build self-awareness and guide continuous improvement.

**The Challenge:** Many organizations struggle to understand their current engineering maturity and identify the most impactful areas for improvement. They often know something could be better but lack a structured way to assess where they are and what to focus on next.

**Our Solution:** A visual, collaborative health check model that teams can use to assess their engineering practices maturity and create targeted improvement plans.

## The Five-Stage Engineering Maturity Model

Our health check is built around five progressive stages of engineering maturity, each representing a foundational capability that enables the next level:

### 🟢 Stage 1: Normalization
**Foundation**: Establishing consistent basic practices across teams
- **Version Control**: Standardized branching strategies and collaboration workflows
- **Development Guidelines**: Coding standards, code review processes, and documentation practices
- **Standardized Systems**: Consistent tooling and environment management

### 🔵 Stage 2: Standardization  
**Consistency**: Creating reusable patterns and golden paths
- **Golden Path**: Standardized workflows for common development tasks
- **Infrastructure as Code**: Declarative infrastructure management and automation
- **Containerization**: Standardized application packaging and deployment

### 🟡 Stage 3: Expansion
**Scale**: Enabling autonomous teams through automation and feedback
- **Autonomous Teams**: End-to-end ownership and cross-functional capabilities
- **Continuous Integration**: Automated testing and quality gates
- **CI/CD Pipeline**: Automated deployment and release management
- **Observability & Feedback**: Comprehensive monitoring and alerting

### 🟠 Stage 4: Automation
**Intelligence**: Full automation with security and AI integration
- **Automated System Configuration**: Configuration management and drift detection
- **Automated Resource Provisioning**: Dynamic infrastructure and cost optimization
- **DevSecOps Integration**: Security automation throughout the development lifecycle
- **AI-Driven Operations**: Predictive analytics and automated remediation

### 🔴 Stage 5: Self-Service
**Innovation**: Platform-driven development with citizen enablement
- **Self-Service Platform**: Developer portals and infrastructure APIs
- **Golden Path Refinement**: Data-driven workflow optimization
- **Low-Code Applications**: Visual development and rapid prototyping
- **Citizen Developers**: Empowering non-technical stakeholders

## The Health Check Assessment Process

### Workshop Format

Following Spotify's successful approach, we recommend conducting face-to-face workshops with development teams. Each session should include:

**Participants**: 6-10 team members including developers, product owners, and operations staff
**Duration**: 90-120 minutes
**Frequency**: Quarterly assessments with monthly progress check-ins
**Facilitator**: Someone outside the team who understands the engineering practices framework

### Assessment Cards

For each engineering practice area, we provide "Awesome Cards" with clear examples of what good and bad look like:

#### Example: Version Control Assessment Card

**🟢 Awesome (Green)**
- Teams use consistent branching strategies (trunk-based or GitHub flow)
- Pull requests are reviewed within 4 hours with constructive feedback
- Merge conflicts are rare (<5% of merges) and resolved quickly
- Git history is clean and commits tell a clear story of changes

**🔴 Not Awesome (Red)**  
- Teams use inconsistent branching strategies or work in isolation
- Pull requests sit for days without review or receive superficial feedback
- Merge conflicts are frequent and time-consuming to resolve
- Git history is messy with unclear commit messages and large changesets

**📊 Example Metrics:**
- Average pull request review time: <4 hours
- Merge conflict rate: <5% of merges
- Deployment frequency: Multiple times per day (trunk-based) or weekly (feature branches)
- Developer satisfaction with version control workflow: >8/10

### The Traffic Light System

Each practice area is assessed using a three-color system:

**🟢 Green**: We're awesome at this! The practice is well-established and continuously improving.

**🟡 Yellow**: We're okay, but could be better. The practice exists but has room for improvement.

**🔴 Red**: This is problematic and needs attention. The practice is missing or significantly hindering our effectiveness.

### Trend Indicators

In addition to current state, teams also indicate the trend:
- **↗️ Improving**: Things are getting better
- **→ Stable**: Things are staying the same  
- **↘️ Declining**: Things are getting worse

## Visualization and Analysis

### Team Health Dashboard

The assessment results are visualized in a simple dashboard that shows:

```
Engineering Practice    | Current State | Trend | Priority
------------------------|---------------|-------|----------
Version Control         |      🟢       |  ↗️   |   Low
Development Guidelines  |      🟡       |  →    |  Medium
Standardized Systems   |      🔴       |  ↘️   |   High
Golden Path            |      🟡       |  ↗️   |  Medium
Infrastructure as Code |      🟢       |  ↗️   |   Low
Containerization       |      🟢       |  →    |   Low
```

### Organizational View

When multiple teams complete assessments, patterns emerge that guide organizational improvements:

**Common Strengths**: Practices where most teams are green can be leveraged as examples and mentoring opportunities.

**Systemic Issues**: Practices where many teams are red indicate organizational-level problems that require leadership attention and investment.

**Maturity Progression**: Teams naturally progress through the five stages, with most organizations having teams at different maturity levels.

## Using Health Check Results

### Individual Team Actions

Teams use their health check results to:

1. **Identify Improvement Priorities**: Focus on red areas that are blocking progress to the next maturity stage
2. **Create Action Plans**: Develop specific, measurable improvement initiatives with timelines
3. **Celebrate Successes**: Recognize areas where the team excels and share learnings with others
4. **Track Progress**: Use quarterly assessments to measure improvement and adjust plans

### Organizational Insights

Leadership uses aggregated results to:

1. **Allocate Resources**: Invest in tools, training, and platform development for common problem areas
2. **Share Best Practices**: Connect teams that excel in certain areas with those that need help
3. **Guide Platform Development**: Build internal platforms and tools that address widespread needs
4. **Measure Transformation**: Track organizational engineering maturity improvement over time

## Implementation Tips

### Create Psychological Safety

Following Spotify's example, it's crucial that teams feel safe being honest about their challenges:

- **No Blame Culture**: Assessment results are used for improvement, not performance evaluation
- **Self-Assessment**: Teams assess themselves rather than being evaluated by others
- **Confidential Results**: Individual team results aren't used for team comparisons or rankings
- **Focus on Learning**: Emphasize growth mindset and continuous improvement

### Start Small and Iterate

- **Pilot Program**: Begin with 2-3 volunteer teams to refine the process
- **Gather Feedback**: Improve the assessment cards and process based on team input  
- **Gradual Rollout**: Expand to additional teams once the process is proven effective
- **Continuous Evolution**: Update the model based on organizational learning and industry changes

### Provide Support

Teams need more than just assessment—they need help improving:

- **Action Planning Workshops**: Help teams translate assessment results into concrete improvement plans
- **Engineering Coaching**: Provide expert guidance for teams working on specific practice areas
- **Resource Allocation**: Ensure teams have access to tools, training, and time needed for improvement
- **Community Building**: Create forums for teams to share experiences and learn from each other

## Success Stories and Metrics

### Quantitative Impact

Organizations using this health check model report significant improvements:

**Development Velocity:**
- 40% reduction in time from idea to production
- 60% improvement in deployment frequency
- 50% decrease in deployment-related incidents

**Team Satisfaction:**
- 25% improvement in developer experience scores
- 30% reduction in on-call burden
- 35% increase in cross-functional collaboration

**Quality and Reliability:**
- 70% reduction in production bugs
- 80% improvement in system reliability
- 90% reduction in manual operational tasks

### Qualitative Benefits

Teams also report improved:
- **Clarity on Improvement Priorities**: Teams know exactly what to work on next
- **Shared Understanding**: Common language for discussing engineering practices
- **Motivation and Engagement**: Visible progress and team ownership of improvement
- **Cross-Team Learning**: Increased knowledge sharing and collaboration

## The Path Forward

### Quarterly Rhythm

Establish a regular cadence of assessment and improvement:

**Month 1**: Conduct health check assessments
**Month 2**: Develop and execute improvement plans  
**Month 3**: Measure progress and adjust plans
**Month 4**: Repeat the cycle

### Maturity Progression

Most teams progress through the stages in order, though some practices may advance faster:

**Typical Timeline:**
- **Normalization**: 3-6 months to establish basic practices
- **Standardization**: 6-12 months to create reusable patterns
- **Expansion**: 12-18 months to enable team autonomy
- **Automation**: 18-24 months to achieve comprehensive automation
- **Self-Service**: 24+ months to reach platform-driven development

### Continuous Evolution

The model itself should evolve based on:
- **Industry Changes**: New practices and technologies that become standard
- **Organizational Learning**: Insights from your specific context and culture
- **Team Feedback**: Improvements to make the assessment more valuable and actionable

## Conclusion

Inspired by Spotify's squad health check model, our Engineering Practices Health Check provides a structured, visual way for teams to assess their engineering maturity and guide continuous improvement. By combining self-assessment with clear action planning, teams can systematically progress through the five stages of engineering maturity while maintaining high engagement and psychological safety.

The key is to remember Spotify's wisdom: "All models are wrong, but some are useful." This health check model isn't perfect, but it provides a practical framework for teams and organizations to understand their current state, identify improvement opportunities, and measure progress over time.

**Ready to try it?** Download our [Engineering Practices Health Check Kit](../resources/health-check-kit) with assessment cards, facilitation guides, and dashboard templates to start your team's improvement journey.

---

*This blog post builds on concepts from our [comprehensive engineering practices framework](../wiki/engineering-practices). For detailed implementation guidance on any of the practices mentioned, explore the full framework documentation.*