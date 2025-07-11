// Mermaid theme configuration for your app's teal color scheme

// Light theme variables
const lightTheme = {
  primaryColor: '#0d9488',
  primaryTextColor: '#0f172a',
  primaryBorderColor: '#64748b',
  secondaryColor: '#14b8a6',
  tertiaryColor: '#2dd4bf',
  mainBkg: '#ffffff',
  nodeBkg: '#f8fafc',
  clusterBkg: '#fefefe',
  nodeTextColor: '#0f172a',
  nodeBorder: '#475569',
  clusterBorder: '#64748b',
  titleColor: '#0f172a',
  border2: '#475569',
  fontWeight: '500',
  lineColor: '#334155',
  edgeLabelBackground: '#f8fafc',
  node1: '#0d9488',
  node2: '#14b8a6',
  node3: '#2dd4bf',
  node4: '#0f766e',
  node5: '#115e59',
  node6: '#475569',
  node7: '#1e293b'
};

// Dark theme variables
const darkTheme = {
  primaryColor: '#2dd4bf',
  primaryTextColor: '#f1f5f9',
  primaryBorderColor: '#64748b',
  secondaryColor: '#5eead4',
  tertiaryColor: '#99f6e4',
  mainBkg: '#0f172a',
  nodeBkg: '#1e293b',
  clusterBkg: '#334155',
  nodeTextColor: '#f1f5f9',
  nodeBorder: '#64748b',
  clusterBorder: '#64748b',
  titleColor: '#f1f5f9',
  border2: '#64748b',
  fontWeight: '500',
  lineColor: '#cbd5e1',
  edgeLabelBackground: '#1e293b',
  node1: '#2dd4bf',
  node2: '#5eead4',
  node3: '#99f6e4',
  node4: '#14b8a6',
  node5: '#0d9488',
  node6: '#64748b',
  node7: '#94a3b8'
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

let isInitialized = false;

function applyMermaidTheme(isDark = false) {
  // Wait for mermaid to be available
  if (typeof window.mermaid === 'undefined') {
    console.log('Mermaid not yet available, retrying...');
    setTimeout(() => applyMermaidTheme(isDark), 100);
    return;
  }

  console.log('Applying Mermaid theme:', isDark ? 'dark' : 'light');

  const config = {
    ...commonConfig,
    themeVariables: isDark ? darkTheme : lightTheme
  };

  // Initialize mermaid with new config
  window.mermaid.initialize(config);

  // Find all mermaid elements
  const mermaidElements = document.querySelectorAll('.mermaid');
  console.log(`Found ${mermaidElements.length} .mermaid elements`);

  // Also check for other possible selectors
  const preElements = document.querySelectorAll('pre');
  console.log(`Found ${preElements.length} pre elements total`);
  
  const codeElements = document.querySelectorAll('code.language-mermaid');
  console.log(`Found ${codeElements.length} code.language-mermaid elements`);

  // Re-render all diagrams
  mermaidElements.forEach(async (element, index) => {
    try {
      // Get original source code
      let source = element.getAttribute('data-mermaid-source') || 
                  element.getAttribute('data-graph-code') ||
                  element.textContent;

      console.log(`Diagram ${index + 1} - data-mermaid-source:`, element.getAttribute('data-mermaid-source'));
      console.log(`Diagram ${index + 1} - textContent:`, element.textContent);
      console.log(`Diagram ${index + 1} - innerHTML:`, element.innerHTML.substring(0, 100) + '...');

      // Skip if no source or already contains SVG
      if (!source || source.includes('<svg') || source.includes('</svg>')) {
        console.log(`Diagram ${index + 1} - Skipping: no source or contains SVG`);
        return;
      }

      source = source.trim();
      if (!source) {
        console.log(`Diagram ${index + 1} - Skipping: empty source after trim`);
        return;
      }

      console.log(`Rendering diagram ${index + 1}:`, source.substring(0, 50) + '...');

      // Generate unique ID for this render
      const id = `mermaid-${Date.now()}-${index}`;
      
      // Render the diagram
      const { svg } = await window.mermaid.render(id, source);
      
      // Replace content with new SVG
      element.innerHTML = svg;
      
      console.log(`Successfully rendered diagram ${index + 1}`);
      
    } catch (error) {
      console.error(`Failed to render diagram ${index + 1}:`, error);
    }
  });

  isInitialized = true;
}

// Function to detect current theme
function detectTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches || 
         document.documentElement.classList.contains('dark');
}

// Initialize when page loads
function initializeMermaid() {
  console.log('Initializing Mermaid theme system...');
  
  // Check what elements we have on the page
  const allMermaid = document.querySelectorAll('.mermaid');
  const allPre = document.querySelectorAll('pre');
  const allCode = document.querySelectorAll('code');
  
  console.log(`Page scan: ${allMermaid.length} .mermaid, ${allPre.length} pre, ${allCode.length} code elements`);
  
  // Log details of all pre elements
  allPre.forEach((pre, index) => {
    console.log(`Pre ${index + 1}: class="${pre.className}", content="${pre.textContent.substring(0, 50)}..."`);
  });
  
  // Store original source code for all diagrams
  allMermaid.forEach((element, index) => {
    console.log(`Processing .mermaid element ${index + 1}:`);
    console.log(`  - Current class: "${element.className}"`);
    console.log(`  - Current content: "${element.textContent.substring(0, 50)}..."`);
    console.log(`  - Has data-mermaid-source: ${!!element.getAttribute('data-mermaid-source')}`);
    
    if (!element.getAttribute('data-mermaid-source')) {
      const source = element.textContent || element.innerText;
      if (source && !source.includes('<svg')) {
        element.setAttribute('data-mermaid-source', source.trim());
        console.log(`  - Stored source for diagram ${index + 1}: "${source.substring(0, 30)}..."`);
      } else {
        console.log(`  - No source to store (empty or contains SVG)`);
      }
    } else {
      console.log(`  - Already has stored source`);
    }
  });

  // Apply initial theme
  const isDark = detectTheme();
  console.log(`Initial theme detected: ${isDark ? 'dark' : 'light'}`);
  applyMermaidTheme(isDark);
}

// Wait for DOM and run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMermaid);
} else {
  initializeMermaid();
}

// Watch for theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  console.log('System theme changed to:', e.matches ? 'dark' : 'light');
  if (isInitialized) {
    applyMermaidTheme(e.matches);
  }
});

// Watch for manual theme toggles
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('Manual theme changed to:', isDark ? 'dark' : 'light');
      if (isInitialized) {
        applyMermaidTheme(isDark);
      }
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});

console.log('Mermaid theme script loaded');