# Mermaid Color Test - Dark Mode

<div style="background-color: #0f172a; padding: 2rem; border-radius: 8px; margin: 1rem 0;">

Test diagram using your app's color scheme for dark mode.

```mermaid
%%{ init: { 
  'theme': 'base', 
  'themeVariables': {
    'primaryColor': '#2dd4bf',
    'primaryTextColor': '#f1f5f9',
    'primaryBorderColor': '#64748b',
    'secondaryColor': '#5eead4',
    'tertiaryColor': '#99f6e4',
    'mainBkg': '#0f172a',
    'nodeBkg': '#1e293b',
    'clusterBkg': '#334155',
    'nodeTextColor': '#f1f5f9',
    'nodeBorder': '#64748b',
    'clusterBorder': '#64748b',
    'titleColor': '#f1f5f9',
    'border2': '#64748b',
    'fontWeight': '500',
    'lineColor': '#cbd5e1',
    'edgeLabelBackground': '#1e293b',
    'node1': '#2dd4bf',
    'node2': '#5eead4',
    'node3': '#99f6e4',
    'node4': '#14b8a6',
    'node5': '#0d9488',
    'node6': '#64748b',
    'node7': '#94a3b8'
  }
} }%%
flowchart TD
    A[Primary Teal - node1] --> B[Light Teal - node2]
    B --> C[Lighter Teal - node3]
    C --> D[Medium Teal - node4]
    D --> E[Dark Teal - node5]
    E --> F[Medium Gray - node6]
    F --> G[Light Gray - node7]
    
    subgraph "Example Subgraph"
        H[Default Node Style]
        I[Another Node]
        J[Third Node]
    end
    
    G --> H
    H --> I
    I --> J
```

## Your App's Color Scheme (Dark Mode):
- **Primary**: Light teal scale (`#2dd4bf` to `#0d9488`)
- **Neutral**: Gray scale (`#64748b` to `#94a3b8`)
- **Background**: Dark navy with dark gray nodes
- **Text**: Light for high contrast
- **Arrows**: Light gray (`#cbd5e1`) - visible on dark background

</div>