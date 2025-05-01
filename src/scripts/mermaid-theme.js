// Function to update Mermaid theme based on current color scheme
function updateMermaidTheme(isDark) {
  if (typeof mermaid !== 'undefined') {
    const config = {
      theme: isDark ? 'darkMode' : 'lightMode'
    };
    mermaid.initialize(config);
    // Re-render all diagrams with new theme
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