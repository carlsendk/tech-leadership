---
title: "Why & Purpose – Product Strategy"
description: "North‑Star definition of why the organisation exists and where the product is headed."
tags:
  - operating-model
  - alignment
  - strategy
  - purpose
  - vision
category: "Organisation Design"
date: 2025-04-30
---

## Purpose Framework

```mermaid
graph TD
    subgraph "Strategic Layer"
        A[Why]
        B[Vision]
        C[Mission]
    end
    
    subgraph "Tactical Layer"
        D[Objectives]
        E[Strategy]
        F[Initiatives]
    end
    
    subgraph "Execution Layer"
        G[Roadmap]
        H[Success Metrics]
        I[Feedback Loops]
    end
    
    A --> D & E & F
    B --> D & E & F
    C --> D & E & F
    
    D --> G & H & I
    E --> G & H & I
    F --> G & H & I
    
    style A fill:#f9d6d5
    style B fill:#d6e9f9
    style C fill:#d6f9e0
    style D fill:#f9f9d6
    style E fill:#d6f9f9
    style F fill:#f9d6f9
    style G fill:#f9d6d5
    style H fill:#d6e9f9
    style I fill:#d6f9e0
```

## Why It Matters

A crisp sense of purpose aligns every decision, from architectural trade‑offs to hiring. It provides:
- Clear decision-making framework
- Team motivation and alignment
- Customer connection
- Strategic focus

## Key Practices

### 1. From/To Vision Statement
```yaml
vision:
  from: "Current state description"
  to: "Future state aspiration"
  timeframe: "3-5 years"
  success_criteria:
    - "Measurable outcome 1"
    - "Measurable outcome 2"
    - "Measurable outcome 3"
```

### 2. Continuous Validation
- Regular user interviews
- Market research
- Competitor analysis
- Trend monitoring

### 3. Strategy Review
- Quarterly strategy sessions
- Annual vision refresh
- Continuous feedback loops
- Impact assessment

## Implementation Guide

### First 30 Days
1. Define current state
2. Craft vision statement
3. Establish metrics

### 60-90 Days
1. Communicate vision
2. Align teams
3. Start feedback loops

### Beyond 90 Days
1. Regular reviews
2. Strategy evolution
3. Impact measurement

## Anti-patterns

### 1. Vague Vision
❌ **Problem**: Unclear direction
✅ **Solution**: Specific, measurable outcomes

### 2. Static Strategy
❌ **Problem**: Outdated approach
✅ **Solution**: Regular reviews and updates

### 3. Disconnected Purpose
❌ **Problem**: Purpose not lived
✅ **Solution**: Daily alignment and decisions

## Integration Points

### With Other Practices
- Guides [Mission & Objectives](mission-objectives)
- Informs [Team Structure](decoupling_teams)
- Shapes [Values](values)

### With Tools & Systems
- Strategy documentation
- OKR systems
- Feedback platforms

## Related Topics
- [Operating Model Overview](operating_alignment_model_wiki)
- [Product Strategy](mission-product-canvas)
- [Team Structure](decoupling_teams)

> **Pro Tip:** Your purpose should be specific enough to guide decisions but broad enough to allow for innovation and adaptation.

---

## Further Reading
- "Start with Why" by Simon Sinek
- "Good to Great" by Jim Collins
- "The Advantage" by Patrick Lencioni

### Metrics
* Product/Market‑fit (PMF) survey
* Net Promoter Score (NPS)
