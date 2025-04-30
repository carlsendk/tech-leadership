---
title: "Mission – Product Canvas"
description: "Capturing who, what and why for a product slice using Roman Pichler's Product Canvas."
tags:
  - operating-model
  - alignment
  - product
  - strategy
  - canvas
category: "Organisation Design"
date: 2025-04-30
---

## Product Canvas Framework

```mermaid
graph TD
    subgraph "Strategic Layer"
        A[Vision]
        B[Target Group]
        C[Business Goals]
    end
    
    subgraph "Tactical Layer"
        D[User Needs]
        E[Product Features]
        F[Value Props]
    end
    
    subgraph "Execution Layer"
        G[Roadmap]
        H[Success Metrics]
        I[Release Plan]
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

## Canvas Sections

### 1. Vision
- Long-term change in the world
- Market opportunity
- Competitive advantage
- Success criteria

### 2. Target Group
- Primary users
- Secondary users
- User personas
- Market segments

### 3. Needs
- User problems
- Pain points
- Desired gains
- Jobs to be done

### 4. Product
- Key features
- Value propositions
- Differentiators
- Technical requirements

### 5. Business Goals
- Revenue targets
- Market share
- Growth metrics
- Success indicators

## Implementation Guide

### First 30 Days
1. Train on canvas usage
2. Create initial canvas
3. Gather stakeholder input

### 60-90 Days
1. Regular reviews
2. Update based on feedback
3. Align with strategy

### Beyond 90 Days
1. Continuous refinement
2. Impact measurement
3. Strategy evolution

## Anti-patterns

### 1. Static Canvas
❌ **Problem**: Canvas becomes outdated
✅ **Solution**: Monthly reviews and updates

### 2. Feature Focus
❌ **Problem**: Ignoring user needs
✅ **Solution**: Start with user problems

### 3. Isolated Planning
❌ **Problem**: Not connected to strategy
✅ **Solution**: Link to business objectives

## Integration Points

### With Other Practices
- Informs [Mission & Objectives](mission-objectives)
- Guides [Team Structure](decoupling_teams)
- Supports [Flow Optimization](optimise-flow)

### With Tools & Systems
- Product management tools
- User research platforms
- Analytics systems

## Related Topics
- [Operating Model Overview](operating_alignment_model_wiki)
- [Product Strategy](why-purpose)
- [Team Structure](decoupling_teams)

> **Pro Tip:** Keep the canvas visible on the team wall (or Miro) and revisit monthly. Focus on the connections between sections, not just filling them in.

---

## Further Reading
- "Product Strategy" by Roman Pichler
- "Product-Led Growth" by Wes Bush
- "Inspired" by Marty Cagan
