---
title: "Operating & Alignment Model – Deep‑Dive"
description: "Comprehensive wiki page explaining each layer of the Operating & Alignment Model, including Product Canvas missions, Wardley‑mapped objectives and Domain‑driven organisational design."
tags:
  - operating-model
  - alignment
  - engineering
  - wardley-mapping
  - product-canvas
  - ddd
category: "Organisation Design"
date: 2025-04-30
---

## Operating & Alignment Model Overview

This is the top-level guide to our operating and alignment model. Each section links to detailed wiki pages that dive deeper into specific aspects.

## Visual Overview

```mermaid
flowchart TD
  %% ───────────────────────────────── WHY & PURPOSE ───────────────────────────
  A[[Why & Purpose<br/>Product&nbsp;Strategy]]
  style A fill:#38b24a,color:#fff,font-weight:bold

  %% ───────────────────────────────── CULTURE ────────────────────────────────
  A --> B[Govern with Culture]
  style B fill:#9e9e9e,color:#fff,font-weight:bold

  %% ───────────────────────────────── VALUES ─────────────────────────────────
  subgraph Values_Block [ ]
    direction LR
    V1[Value&nbsp;1]:::val1 --> V2[Value&nbsp;2]:::val2 --> V3[Value&nbsp;3]:::val3
  end
  B --> Values_Block

  classDef val1 fill:#f9d6d5,color:#000;
  classDef val2 fill:#faf3c0,color:#000;
  classDef val3 fill:#e6e1fb,color:#000;

  %% ──────────────── MISSION & OBJECTIVES (TOP-LEVEL LAYER) ──────────────────
  Values_Block --> C[Lead by Mission & Objectives]
  style C fill:#9e9e9e,color:#fff,font-weight:bold

  %% ────────────────────────── THREE CORE ELEMENTS ───────────────────────────
  subgraph Core_Elements [ ]
    direction LR
    M[Mission<br/>(Product&nbsp;Canvas)]:::bluebox
    O[Objectives<br/>(OKRs)]:::orangebox
    S[Strategy<br/>Roadmap]:::bluebox
    M --> O --> S
  end
  C --> Core_Elements

  classDef bluebox   fill:#4fc3f7,color:#000,font-weight:bold;
  classDef orangebox fill:#e67e22,color:#fff,font-weight:bold;

  %% ───────────────────────── ALIGNMENT & LOOP ───────────────────────────────
  Core_Elements --> D[Alignment & Feedback&nbsp;Loops]
  style D fill:#9e9e9e,color:#fff,font-weight:bold

  %% ──────────────────────── OPTIMISATION PILLARS ────────────────────────────
  subgraph Optimise_For [ ]
    direction LR
    P1[Optimise for Motivation<br/>eNPS&nbsp;&amp;&nbsp;Squad Health Checks]:::pill1
    P2[Optimise for Flow<br/>DORA Metrics]:::pill2
    P3[Optimise for Cost<br/>Cost/Employee&nbsp;&amp;&nbsp;Cost/Customer]:::pill3
    P1 --> P2 --> P3
  end
  D --> Optimise_For

  classDef pill1 fill:#fff3b0,color:#000;
  classDef pill2 fill:#fad1d9,color:#000;
  classDef pill3 fill:#e6e1fb,color:#000;

  %% ───────────────────────────── FEEDBACK ───────────────────────────────────
  Optimise_For -->|"Metric&nbsp;insights"| Core_Elements

```---

## Layer‑by‑Layer Explanation

Each layer of our operating model has its own detailed wiki page. Below is an overview with links to in-depth content:

### Foundation Layer
| Layer | Purpose | Key Practices | Detailed Guide |
|-------|---------|---------------|----------------|
| **Why & Purpose – Product Strategy** | Sets the North‑Star: *why we exist* and *where we play*. | * Product Vision Board<br>* Quarterly strategy review | [Why & Purpose Deep-Dive](why-purpose) |
| **Govern with Culture** | Scales behaviour through principles rather than rules. | * Decision principles<br>* Engineering rituals | [Culture Guide](culture) |
| **Values** | Shared beliefs that guide day‑to‑day trade‑offs. | * Hire & fire by values<br>* Explicit behaviors | [Values Framework](values) |

### Core Elements
| Layer | Purpose | Key Practices | Detailed Guide |
|-------|---------|---------------|----------------|
| **Mission (Product Canvas)** | Captures *who, what, why* for a product slice. | * Product Canvas<br>* Assumption mapping | [Mission & Product Canvas](mission-product-canvas) |
| **Objectives (Wardley Mapping)** | Stress‑test bets against landscape evolution. | * User‑need mapping<br>* Strategic decisions | [Objectives & Wardley Mapping](objectives-wardley) |
| **Organization (DDD)** | Mirror domain boundaries in team topology. | * Context mapping<br>* Team boundaries | [Organization & DDD](organization-ddd) |

### Optimization & Feedback
| Layer | Purpose | Key Practices | Detailed Guide |
|-------|---------|---------------|----------------|
| **Alignment & Feedback** | Close strategy-execution gap. | * Health checks<br>* Retros | [Alignment & Feedback Loops](alignment-feedback) |
| **Optimise for Motivation** | Keep humans engaged and creative. | * eNPS tracking<br>* Squad health | [Motivation Deep-Dive](optimise-motivation) |
| **Optimise for Flow** | Ship value quickly & safely. | * CI/CD<br>* DORA metrics | [Flow Optimization](optimise-flow) |
| **Optimise for Cost** | Sustain profitability at scale. | * FinOps<br>* Unit economics | [Cost Optimization](optimise-cost) |

### Advanced Topics
- [Conway's Law & Team Design](conways-law)
- [Decoupling Teams & Dependencies](decoupling_teams)
- [Mission & Objectives Alignment](mission-objectives)

---

## Implementation Guide

1. **Start with Why**
   - Begin with [Why & Purpose](why-purpose)
   - Establish [Cultural Foundations](culture)
   - Define [Core Values](values)

2. **Build Core Elements**
   - Create [Product Canvas](mission-product-canvas)
   - Map [Strategic Objectives](objectives-wardley)
   - Design [Team Structure](organization-ddd)

3. **Optimize & Align**
   - Implement [Feedback Loops](alignment-feedback)
   - Balance [Motivation](optimise-motivation), [Flow](optimise-flow), and [Cost](optimise-cost)
   - Monitor [Team Dependencies](decoupling_teams)

4. **Advanced Implementation**
   - Apply [Conway's Law](conways-law)
   - Align [Missions & Objectives](mission-objectives)

---

## Key Metrics Dashboard

| Category | Metrics | Target | Source |
|----------|---------|--------|--------|
| **Culture & Values** | eNPS<br/>Value alignment score | > 50<br/>> 80% | Culture surveys |
| **Mission & Objectives** | OKR completion<br/>Strategy-execution gap | > 70%<br/>< 20% | OKR tool |
| **Flow & Delivery** | DORA metrics<br/>Lead time | Elite<br/>< 1 day | DevOps platform |
| **Cost & Efficiency** | Cost per customer<br/>Engineering ROI | < industry avg<br/>> 3x | FinOps dashboard |

---

## Further Reading & Resources

### Internal References
- [Team Topologies Implementation](decoupling_teams)
- [Domain-Driven Design Guide](organization-ddd)
- [Feedback Loop Design](alignment-feedback)

### External References
* **Product Canvas** – Roman Pichler  
* **Wardley Mapping** – Simon Wardley  
* **Team Topologies** – Skelton & Pais  
* **Accelerate** – Forsgren, Humble & Kim

---

> **Note:** This is a living document. Each linked page contains detailed implementation guides, examples, and metrics. Use the navigation above to dive deeper into specific areas of interest.
