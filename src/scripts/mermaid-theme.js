// Function to update Mermaid theme based on current color scheme
// Light theme variables (using your app's teal color scheme)
const lightTheme = {
  // Core colors using your app's teal palette
  primaryColor: '#0d9488',        // Primary teal from your app
  primaryTextColor: '#0f172a',    // Dark text for high contrast
  primaryBorderColor: '#64748b',  // Medium gray for borders
  secondaryColor: '#14b8a6',      // Secondary teal
  tertiaryColor: '#2dd4bf',       // Light teal
  
  // Background colors
  mainBkg: '#ffffff',             // Pure white background
  nodeBkg: '#f8fafc',            // Very light gray for nodes
  clusterBkg: '#fefefe',         // Very light background for subgraphs (arrow visibility)
  
  // Text and borders
  nodeTextColor: '#0f172a',       // Dark text for readability
  nodeBorder: '#475569',          // Darker border for definition
  clusterBorder: '#64748b',       // Medium border for subgraphs
  titleColor: '#0f172a',          // Dark titles
  border2: '#475569',             // Secondary borders
  fontWeight: '500',              // Medium weight for readability
  lineColor: '#334155',           // Dark arrows for light background
  edgeLabelBackground: '#f8fafc', // Light background for edge labels
  
  // Node variety (your teal scale + grays)
  node1: '#0d9488',               // Primary teal
  node2: '#14b8a6',               // Secondary teal
  node3: '#2dd4bf',               // Light teal  
  node4: '#0f766e',               // Dark teal
  node5: '#115e59',               // Darker teal
  node6: '#475569',               // Medium gray
  node7: '#1e293b',               // Dark gray
  
  // Component-specific colors
  labelBackgroundColor: '#f8fafc',
  compositeBackground: '#fefefe', // Very light for subgraphs
  noteBkgColor: '#f0fdfa',        // Light teal for notes
  noteTextColor: '#0f172a',
  noteBorderColor: '#14b8a6',     // Teal border for notes
  classText: '#0f172a',
  
  // Actor/sequence diagram colors
  actorBkg: '#f8fafc',
  actorBorder: '#64748b',
  actorTextColor: '#0f172a',
  messageBorderColor: '#64748b',
  messageTextColor: '#0f172a',
  
  // Gantt/timeline colors
  sectionBkgColor: '#f8fafc',
  altSectionBkgColor: '#f1f5f9',
  taskBorderColor: '#64748b',
  taskTextColor: '#0f172a',
  taskTextOutsideColor: '#0f172a',
  taskTextLightColor: '#0f172a',
  sectionBkgColor2: '#0d9488',
  gridColor: '#e2e8f0',           // Lighter grid
  doneTaskBkgColor: '#14b8a6',
  doneTaskBorderColor: '#0d9488',
  activeTaskBorderColor: '#2dd4bf',
  activeTaskBkgColor: '#14b8a6',
  
  // Pie chart colors (your teal scale)
  pie1: '#0d9488',
  pie2: '#14b8a6',
  pie3: '#2dd4bf',
  pie4: '#0f766e',
  pie5: '#115e59',
  pie6: '#475569',
  pie7: '#1e293b',
  pieTitleTextSize: '25px',
  pieTitleTextColor: '#0f172a',
  journeyHover: '#2dd4bf'
};

// Dark theme variables (using your app's light teal palette for dark mode)
const darkTheme = {
  // Core colors using your app's light teal palette for dark mode
  primaryColor: '#2dd4bf',        // Light teal for dark backgrounds
  primaryTextColor: '#f1f5f9',    // Light text for high contrast
  primaryBorderColor: '#64748b',  // Medium gray - visible on dark
  secondaryColor: '#5eead4',      // Lighter teal
  tertiaryColor: '#99f6e4',       // Very light teal
  
  // Background colors
  mainBkg: '#0f172a',             // Dark navy background
  nodeBkg: '#1e293b',            // Lighter dark for nodes
  clusterBkg: '#334155',         // Medium dark for subgraphs (light arrow visibility)
  
  // Text and borders  
  nodeTextColor: '#f1f5f9',       // Light text for readability
  nodeBorder: '#64748b',          // Medium border visible on dark
  clusterBorder: '#64748b',       // Consistent border for subgraphs
  titleColor: '#f1f5f9',          // Light titles
  border2: '#64748b',             // Secondary borders
  fontWeight: '500',              // Medium weight for readability
  lineColor: '#cbd5e1',           // Light arrows for dark background
  edgeLabelBackground: '#1e293b', // Dark background for edge labels
  
  // Node variety (your light teal scale for dark mode)
  node1: '#2dd4bf',               // Primary light teal
  node2: '#5eead4',               // Lighter teal
  node3: '#99f6e4',               // Very light teal
  node4: '#14b8a6',               // Medium teal
  node5: '#0d9488',               // Darker teal
  node6: '#64748b',               // Medium gray
  node7: '#94a3b8',               // Light gray
  
  // Component-specific colors
  labelBackgroundColor: '#1e293b',
  compositeBackground: '#334155', // Medium dark for subgraphs
  noteBkgColor: '#134e4a',        // Dark teal for notes
  noteTextColor: '#f1f5f9',
  noteBorderColor: '#2dd4bf',     // Light teal border for notes
  classText: '#f1f5f9',
  
  // Actor/sequence diagram colors
  actorBkg: '#1e293b',
  actorBorder: '#64748b',
  actorTextColor: '#f1f5f9',
  messageBorderColor: '#64748b',
  messageTextColor: '#f1f5f9',
  
  // Gantt/timeline colors
  sectionBkgColor: '#1e293b',
  altSectionBkgColor: '#334155',
  taskBorderColor: '#64748b',
  taskTextColor: '#f1f5f9',
  taskTextOutsideColor: '#f1f5f9',
  taskTextLightColor: '#f1f5f9',
  sectionBkgColor2: '#2dd4bf',
  gridColor: '#475569',           // Darker grid for dark mode
  doneTaskBkgColor: '#14b8a6',
  doneTaskBorderColor: '#0d9488',
  activeTaskBorderColor: '#5eead4',
  activeTaskBkgColor: '#2dd4bf',
  
  // Pie chart colors (your light teal scale for dark mode)
  pie1: '#2dd4bf',
  pie2: '#5eead4',
  pie3: '#99f6e4',
  pie4: '#14b8a6',
  pie5: '#0d9488',
  pie6: '#64748b',
  pie7: '#94a3b8',
  pieTitleTextSize: '25px',
  pieTitleTextColor: '#f1f5f9',
  journeyHover: '#5eead4'
};

const commonConfig = {
  startOnLoad: false,
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
  theme: 'base',
  flowchart: {
    curve: 'basis',
    padding: 20,
    useMaxWidth: true,
    htmlLabels: true,
    diagramPadding: 8,
    nodeSpacing: 50,
    rankSpacing: 50
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 30,
    actorMargin: 100,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: false,
    bottomMarginAdj: 1,
    useMaxWidth: true,
    rightAngles: false,
    showSequenceNumbers: false,
    actorFontSize: 14,
    actorFontWeight: 500,
    noteFontSize: 14,
    messageFontSize: 14
  },
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 14,
    sectionFontSize: 14,
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d'
  }
};

function updateMermaidTheme(isDark) {
  if (typeof window.mermaid !== 'undefined') {
    const config = {
      ...commonConfig,
      themeVariables: isDark ? darkTheme : lightTheme
    };
    window.mermaid.initialize(config);
    
    // Force re-render all diagrams with new theme
    document.querySelectorAll('.mermaid').forEach(async (element) => {
      let graphCode = element.getAttribute('data-graph-code');
      
      // If no stored code, extract from existing SVG or text content
      if (!graphCode) {
        const svgElement = element.querySelector('svg');
        if (svgElement) {
          // Try to find original code in data attributes or extract from title
          graphCode = element.getAttribute('data-original-code') || 
                     element.textContent.trim() ||
                     svgElement.getAttribute('aria-labelledby');
        } else {
          graphCode = element.textContent.trim();
        }
        
        if (graphCode) {
          element.setAttribute('data-graph-code', graphCode);
        }
      }
      
      if (graphCode && graphCode.trim() && !graphCode.includes('<svg')) {
        try {
          const { svg } = await window.mermaid.render(`mermaid-${Date.now()}-${Math.random()}`, graphCode);
          element.innerHTML = svg;
        } catch (error) {
          console.error('Failed to render Mermaid diagram:', error, 'Code:', graphCode);
        }
      }
    });
  }
}

// Initialize when both DOM and mermaid are ready
function initializeMermaidWithTheme() {
  if (typeof window.mermaid === 'undefined') {
    // Wait for mermaid to be available
    setTimeout(initializeMermaidWithTheme, 100);
    return;
  }

  // Store original graph code before first render
  document.querySelectorAll('.mermaid').forEach((element) => {
    if (!element.getAttribute('data-graph-code')) {
      element.setAttribute('data-graph-code', element.textContent);
    }
  });
  
  // Initial render with appropriate theme
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches || 
                 document.documentElement.classList.contains('dark');
  updateMermaidTheme(isDark);
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMermaidWithTheme);
} else {
  initializeMermaidWithTheme();
}

// Watch for system color scheme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => updateMermaidTheme(e.matches));

// Watch for manual theme toggles (assuming a 'dark' class on html element)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const isDark = document.documentElement.classList.contains('dark');
      updateMermaidTheme(isDark);
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
}); 