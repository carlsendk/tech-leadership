// Function to update Mermaid theme based on current color scheme
// Light theme variables (must match Astro config)
const lightTheme = {
  primaryColor: '#0d9488',
  primaryTextColor: '#1e293b',
  primaryBorderColor: '#94a3b8',
  secondaryColor: '#2dd4bf',
  tertiaryColor: '#14b8a6',
  mainBkg: '#ffffff',
  nodeBkg: '#f8fafc',
  clusterBkg: '#f1f5f9',
  nodeTextColor: '#1e293b',
  nodeBorder: '#94a3b8',
  clusterBorder: '#94a3b8',
  titleColor: '#1e293b',
  border2: '#94a3b8',
  fontWeight: '500',
  node1: '#0d9488',
  node2: '#14b8a6',
  node3: '#2dd4bf',
  node4: '#0f766e',
  node5: '#115e59',
  node6: '#134e4a',
  node7: '#042f2e',
  labelBackgroundColor: '#f8fafc',
  compositeBackground: '#f1f5f9',
  noteBkgColor: '#f8fafc',
  noteTextColor: '#1e293b',
  noteBorderColor: '#94a3b8',
  classText: '#1e293b',
  actorBkg: '#f8fafc',
  actorBorder: '#94a3b8',
  actorTextColor: '#1e293b',
  messageBorderColor: '#94a3b8',
  messageTextColor: '#1e293b',
  sectionBkgColor: '#f8fafc',
  altSectionBkgColor: '#f1f5f9',
  taskBorderColor: '#94a3b8',
  taskTextColor: '#1e293b',
  taskTextOutsideColor: '#1e293b',
  taskTextLightColor: '#1e293b',
  sectionBkgColor2: '#0d9488',
  gridColor: '#94a3b8',
  doneTaskBkgColor: '#0d9488',
  doneTaskBorderColor: '#0f766e',
  activeTaskBorderColor: '#2dd4bf',
  activeTaskBkgColor: '#14b8a6',
  pie1: '#0d9488',
  pie2: '#0f766e',
  pie3: '#14b8a6',
  pie4: '#2dd4bf',
  pie5: '#115e59',
  pie6: '#134e4a',
  pie7: '#042f2e',
  pieTitleTextSize: '25px',
  pieTitleTextColor: '#1e293b',
  journeyHover: '#2dd4bf'
};

// Dark theme variables (must match Astro config)
const darkTheme = {
  primaryColor: '#0d9488',
  primaryTextColor: '#f1f5f9',
  primaryBorderColor: '#475569',
  secondaryColor: '#2dd4bf',
  tertiaryColor: '#14b8a6',
  mainBkg: '#0f172a',
  nodeBkg: '#1e293b',
  clusterBkg: '#0f172a',
  nodeTextColor: '#f1f5f9',
  nodeBorder: '#475569',
  clusterBorder: '#475569',
  titleColor: '#f1f5f9',
  border2: '#475569',
  fontWeight: '500',
  node1: '#0d9488',
  node2: '#14b8a6',
  node3: '#2dd4bf',
  node4: '#0f766e',
  node5: '#115e59',
  node6: '#134e4a',
  node7: '#042f2e',
  labelBackgroundColor: '#1e293b',
  compositeBackground: '#0f172a',
  noteBkgColor: '#1e293b',
  noteTextColor: '#f1f5f9',
  noteBorderColor: '#475569',
  classText: '#f1f5f9',
  actorBkg: '#1e293b',
  actorBorder: '#475569',
  actorTextColor: '#f1f5f9',
  messageBorderColor: '#475569',
  messageTextColor: '#f1f5f9',
  sectionBkgColor: '#1e293b',
  altSectionBkgColor: '#0f172a',
  taskBorderColor: '#475569',
  taskTextColor: '#f1f5f9',
  taskTextOutsideColor: '#f1f5f9',
  taskTextLightColor: '#f1f5f9',
  sectionBkgColor2: '#0d9488',
  gridColor: '#475569',
  doneTaskBkgColor: '#0d9488',
  doneTaskBorderColor: '#0f766e',
  activeTaskBorderColor: '#2dd4bf',
  activeTaskBkgColor: '#14b8a6',
  pie1: '#0d9488',
  pie2: '#0f766e',
  pie3: '#14b8a6',
  pie4: '#2dd4bf',
  pie5: '#115e59',
  pie6: '#134e4a',
  pie7: '#042f2e',
  pieTitleTextSize: '25px',
  pieTitleTextColor: '#f1f5f9',
  journeyHover: '#2dd4bf'
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
  if (typeof mermaid !== 'undefined') {
    const config = {
      ...commonConfig,
      themeVariables: isDark ? darkTheme : lightTheme
    };
    mermaid.initialize(config);
    document.querySelectorAll('.mermaid').forEach(async (element) => {
      const graphCode = element.getAttribute('data-graph-code') || element.textContent;
      try {
        const { svg } = await mermaid.render(`mermaid-${Math.random()}`, graphCode);
        element.innerHTML = svg;
      } catch (error) {
        console.error('Failed to render Mermaid diagram:', error);
      }
    });
  }
}

// Watch for system color scheme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
updateMermaidTheme(mediaQuery.matches);
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

// Store original graph code before first render
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mermaid').forEach((element) => {
    element.setAttribute('data-graph-code', element.textContent);
  });
}); 