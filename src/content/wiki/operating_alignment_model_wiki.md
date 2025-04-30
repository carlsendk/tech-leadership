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

## Visual Overview

```mermaid
flowchart TD
  %% WHY & PURPOSE
  A[[Why & Purpose<br/>Product Strategy]]
  style A fill:#38b24a,color:#fff,fontWeight:bold

  %% CULTURE
  A --> B[Govern with Culture]
  style B fill:#9e9e9e,color:#fff,fontWeight:bold

  %% VALUES
  subgraph Values_Block [ ]
    direction LR
    V1[Values]:::val1 --> V2[Values]:::val2 --> V3[Values]:::val3
  end
  B --> Values_Block
  classDef val1 fill:#f9d6d5,color:#000;
  classDef val2 fill:#faf3c0,color:#000;
  classDef val3 fill:#e6e1fb,color:#000;

  %% MISSION & OBJECTIVES LAYER
  Values_Block --> C[Lead by Mission & Objectives]
  style C fill:#9e9e9e,color:#fff,fontWeight:bold

  %% THREE CORE ELEMENTS
  subgraph Core_Elements[ ]
    direction LR
    M[Mission<br/>(Product Canvas)]:::bluebox --> O[Objectives<br/>(Wardley Mapping)]:::orangebox --> G[Organization<br/>(Domain‑driven design)]:::bluebox
  end
  C --> Core_Elements
  classDef bluebox fill:#4fc3f7,color:#000,fontWeight:bold;
  classDef orangebox fill:#e67e22,color:#fff,fontWeight:bold;

  %% ALIGNMENT LOOP
  Core_Elements --> D[Alignment & Feedback Loops]
  style D fill:#9e9e9e,color:#fff,fontWeight:bold

  %% OPTIMISATION PILLARS
  subgraph Optimise_For [ ]
    direction LR
    P1[Optimise for Motivation<br/>eNPS & Squad Health Check]:::pill1
    P2[Optimise for Flow<br/>DORA Metrics]:::pill2
    P3[Optimise for Cost<br/>Cost/Employee & Cost/Customer]:::pill3
  end
  D --> Optimise_For
  classDef pill1 fill:#fff3b0,color:#000;
  classDef pill2 fill:#fad1d9,color:#000;
  classDef pill3 fill:#e6e1fb,color:#000;

  %% FEEDBACK
  Optimise_For -->|"Metric insights"| Core_Elements
```

---

## Layer‑by‑Layer Explanation

| Layer | Purpose | Key Practices | Typical Metrics |
|-------|---------|---------------|-----------------|
| **Why & Purpose – Product Strategy** | Sets the North‑Star: *why we exist* and *where we play*. | * Product Vision Board<br>* Quarterly strategy review | Product/Market‑fit survey, NPS, strategic theme progress |
| **Govern with Culture** | Scales behaviour through principles rather than rules. | * Decision principles (“disagree & commit”, “default to open”)<br>* Rituals: demos, incident post‑mortems | Qualitative culture pulse, value‑behaviour audits |
| **Values** | Shared beliefs that guide day‑to‑day trade‑offs. | * Hire & fire by values<br>* Translate into explicit behaviours | “Values drift” pulse, onboarding survey |
| **Lead by Mission & Objectives** | Frame work around *mission problems* and measurable outcomes. | * OKRs or NCTs<br>* Mission statements visible on team canvas | OKR score, outcome dashboards |
| **Mission (Product Canvas)** | Captures *who, what, why* for a product slice. | * Roman Pichler Product Canvas<br>* Assumption mapping workshops | Canvas completeness, validation status |
| **Objectives (Wardley Mapping)** | Stress‑test bets against landscape evolution. | * User‑need mapping<br>* Build/Buy/Commoditise decisions | Map refresh cadence, decision lead time |
| **Organization (Domain‑driven design)** | Mirror domain boundaries in team topology (“Conway’s Law” in your favour). | * Context maps<br>* Domain events & bounded contexts | Team/coupling score, deployment ownership |
| **Alignment & Feedback Loops** | Close the gap between strategy and execution continuously. | * Squad Health Check<br>* Quarterly bets retro | Lead‑time to decision, learning cycle time |
| **Optimise for Motivation** | Keep humans engaged and creative. | * eNPS<br>* Squad Health Check | eNPS trend, Psychological safety index |
| **Optimise for Flow** | Ship value quickly & safely. | * CI/CD automation<br>* Trunk‑based development | DORA metrics (DF, LT, CFR, MTTR) |
| **Optimise for Cost** | Sustain profitability at scale. | * FinOps culture<br>* Cost‑per‑customer dashboard | Cost/Employee, Cost/Customer, Cloud unit cost |

---

## Putting It Into Practice

1. **Map → Mission**  
   *Run an initial Wardley Mapping workshop to reveal user needs and capabilities. Feed critical needs into the Product Canvas as squad missions.*

2. **Mission → Objectives**  
   *Write squad‑level OKRs that express desired *outcomes* rather than outputs.*

3. **Objectives → Organization**  
   *Shred monolith ownership by aligning squads with bounded contexts; document interfaces with AsyncAPI.*

4. **Alignment Cycle**  
   *Spin monthly health checks and DORA reviews; feed insights back into maps and missions.*

5. **Metric Guard‑rails**  
   *Treat Motivation, Flow, and Cost as a “balanced score‑card” — optimising one must not tank the others.*

---

## Further Reading

* **Product Canvas** – Roman Pichler  
* **Wardley Mapping** – Wardley Maps Community Book  
* **DDD & Team Topologies** – Skelton & Pais  
* **DORA Metrics** – Accelerate, Forsgren et al.  
* **Squad Health Check** – Spotify Labs Blog  

> *Mermaid diagrams render natively in GitHub, GitLab, Notion, etc.  
> If your wiki does not support Mermaid, include a screenshot or use a plugin.*
