# Mermaid Color Test - Light Mode

Test diagram using your app's color scheme for light mode.

```mermaid
%%{ init: { 
  'theme': 'base', 
  'themeVariables': {
    'primaryColor': '#0d9488',
    'primaryTextColor': '#0f172a',
    'primaryBorderColor': '#64748b',
    'secondaryColor': '#14b8a6',
    'tertiaryColor': '#2dd4bf',
    'mainBkg': '#ffffff',
    'nodeBkg': '#f8fafc',
    'clusterBkg': '#f1f5f9',
    'nodeTextColor': '#0f172a',
    'nodeBorder': '#475569',
    'clusterBorder': '#475569',
    'titleColor': '#0f172a',
    'border2': '#475569',
    'fontWeight': '500',
    'lineColor': '#334155',
    'edgeLabelBackground': '#f8fafc',
    'node1': '#0d9488',
    'node2': '#14b8a6',
    'node3': '#2dd4bf',
    'node4': '#0f766e',
    'node5': '#115e59',
    'node6': '#475569',
    'node7': '#1e293b'
  }
} }%%
flowchart TD
    A[Primary Teal - node1] --> B[Secondary Teal - node2]
    B --> C[Light Teal - node3]
    C --> D[Dark Teal - node4]
    D --> E[Darker Teal - node5]
    E --> F[Medium Gray - node6]
    F --> G[Dark Gray - node7]
    
    subgraph "Example Subgraph"
        H[Default Node Style]
        I[Another Node]
        J[Third Node]
    end
    
    G --> H
    H --> I
    I --> J
```

## Your App's Color Scheme (Light Mode):
- **Primary**: Teal scale (`#0d9488` to `#115e59`) 
- **Neutral**: Gray scale (`#475569` to `#1e293b`)
- **Background**: White with light gray nodes
- **Text**: Dark for high contrast
- **Arrows**: Dark gray (`#334155`) - visible on white