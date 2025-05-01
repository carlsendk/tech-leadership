---
title: "Organization – Domain‑Driven Design"
description: "Structuring teams around bounded contexts to exploit Conway's Law positively."
tags:
  - operating-model
  - alignment
  - ddd
  - team-structure
  - bounded-context
  - domain-modeling
category: "Organisation Design"
date: 2025-04-30
---

## Domain-Driven Organization

```mermaid
graph TD
    A[Domain] --> B[Subdomains]
    B --> C[Contexts]
    C --> D[Models]
    D --> E[Entities]
    E --> F[Value Objects]
    F --> G[Aggregates]
    G --> H[Services]
    H --> I[Repositories]
```

## Core DDD Concepts

### 1. Bounded Context
- Clear linguistic boundaries
- Explicit interfaces
- Own data model

### 2. Context Map
```mermaid
%%{
  init: {
    'theme': 'dark',
    'themeVariables': {
      'primaryColor': '#0d9488',
      'primaryTextColor': '#f1f5f9',
      'primaryBorderColor': '#475569',
      'lineColor': '#94a3b8',
      'secondaryColor': '#2dd4bf',
      'tertiaryColor': '#14b8a6'
    }
  }
}%%
graph LR
    A[Orders Context] -->|Customer Info| B[Customer Context]
    B -->|Shared Kernel| C[Auth Context]
    A -->|Conformist| D[Shipping Context]
    
    style A fill:#0d9488,stroke:#475569,color:#f1f5f9
    style B fill:#0f766e,stroke:#475569,color:#f1f5f9
    style C fill:#14b8a6,stroke:#475569,color:#f1f5f9
    style D fill:#2dd4bf,stroke:#475569,color:#f1f5f9
```

### 3. Domain Events
```yaml
event:
  name: "OrderPlaced"
  version: "1.0"
  timestamp: "2024-01-20T10:00:00Z"
  data:
    orderId: "ORD-123"
    customerId: "CUST-456"
    items:
      - productId: "PROD-789"
        quantity: 2
    total: 99.98
```

## Team Topology Patterns

### 1. Stream-Aligned Teams
```yaml
team:
  name: "Order Management"
  type: "stream-aligned"
  bounded_context: "orders"
  owns:
    - "order-service"
    - "order-api"
    - "order-db"
  interfaces:
    upstream:
      - "customer-context"
      - "product-context"
    downstream:
      - "shipping-context"
      - "billing-context"
```

### 2. Enabling Teams
```yaml
team:
  name: "Developer Experience"
  type: "enabling"
  supports:
    - "CI/CD practices"
    - "Testing frameworks"
    - "Development tools"
  interfaces:
    customers:
      - "all stream-aligned teams"
```

### 3. Platform Teams
```yaml
team:
  name: "Cloud Platform"
  type: "platform"
  provides:
    - "Kubernetes clusters"
    - "Observability stack"
    - "Security controls"
  interfaces:
    customers:
      - "all engineering teams"
```

## Context Mapping Patterns

### 1. Partnership
- Shared success
- Joint planning
- Two-way alignment

### 2. Customer-Supplier
- Clear upstream/downstream
- Service level agreements
- Formal interfaces

### 3. Conformist
- Follow upstream model
- Minimal translation
- Accept dependencies

## Implementation Guide

### 1. Domain Discovery
```markdown
# Event Storming Workshop

## Participants
- Domain experts
- Tech leads
- Product owners

## Process
1. Map business events
2. Identify aggregates
3. Draw context boundaries

## Outputs
- Event flow
- Context map
- Team boundaries
```

### 2. Team Formation
```yaml
steps:
  - identify_domains:
      method: "Event storming"
      output: "Context map"
  
  - align_teams:
      method: "Team topologies"
      output: "Team structure"
  
  - define_interfaces:
      method: "API design"
      output: "Interface contracts"
```

### 3. Interface Design
```markdown
# Context Interface Template

## API Contract
- Endpoints
- Data models
- Error handling

## Integration Pattern
- Sync/Async
- Protocol
- SLAs

## Evolution Strategy
- Versioning
- Migration
- Deprecation
```

## Common Anti-patterns

### 1. Big Ball of Mud
❌ **Problem**: No clear boundaries
✅ **Solution**: Explicit contexts and interfaces

### 2. Shared Database
❌ **Problem**: Hidden coupling through data
✅ **Solution**: Context-owned data, API access

### 3. God Context
❌ **Problem**: Too broad responsibility
✅ **Solution**: Split by subdomain

## Measuring Success

| Metric | Good | Warning | Action Needed |
|--------|------|---------|---------------|
| Context Independence | > 90% | 70-90% | < 70% |
| API Stability | < 1 break/quarter | 1-3 breaks/quarter | > 3 breaks/quarter |
| Team Autonomy | > 80% | 60-80% | < 60% |

## Integration Points

### With Other Practices
- Supports [Team Decoupling](decoupling_teams)
- Enables [Flow Optimization](optimise-flow)
- Guides [Mission & Objectives](mission-objectives)

### With Tools & Systems
- API gateways
- Event buses
- Service mesh

## Related Topics
- [Conway's Law](conways-law)
- [Operating Model Overview](operating_alignment_model_wiki)
- [Alignment & Feedback](alignment-feedback)

> **Pro Tip:** Start with a rough context map and refine it as you learn more about the domain. Perfect boundaries aren't as important as clear ones.

---

## Further Reading
- "Domain-Driven Design" by Eric Evans
- "Team Topologies" by Matthew Skelton & Manuel Pais
- "Building Microservices" by Sam Newman
