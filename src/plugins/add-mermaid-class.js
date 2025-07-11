import { visit } from 'unist-util-visit';

/** @type {import('unified').Plugin<[], import('hast').Root>} */
export default function addMermaidClass() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Handle code blocks with language-mermaid class
      if (node.tagName === 'code' && node.properties?.className) {
        const classes = Array.isArray(node.properties.className) 
          ? node.properties.className 
          : [node.properties.className];
        
        // Look for language-mermaid in any form
        const hasMermaid = classes.some(cls => 
          typeof cls === 'string' && cls.includes('mermaid')
        );
        
        if (hasMermaid && node.children && node.children[0]) {
          const sourceCode = node.children[0].value || node.children[0].data || '';
          
          // If the code element is inside a pre element, transform the pre element
          if (node.parent?.tagName === 'pre') {
            node.parent.tagName = 'pre';
            node.parent.properties = { 
              className: ['mermaid'],
              'data-mermaid-source': sourceCode
            };
            // Move the content up to the pre element
            node.parent.children = [{ type: 'text', value: sourceCode }];
          } else {
            // If code element is standalone, transform it to pre
            node.tagName = 'pre';
            node.properties = { 
              className: ['mermaid'],
              'data-mermaid-source': sourceCode
            };
          }
        }
      }
      
      // Also check for pre elements that might contain mermaid
      if (node.tagName === 'pre' && node.properties?.className) {
        const classes = Array.isArray(node.properties.className) 
          ? node.properties.className 
          : [node.properties.className];
          
        const hasMermaid = classes.some(cls => 
          typeof cls === 'string' && cls.includes('mermaid')
        );
          
        if (hasMermaid) {
          // Make sure it has the right properties
          node.properties.className = ['mermaid'];
          if (node.children && node.children[0] && !node.properties['data-mermaid-source']) {
            const sourceCode = node.children[0].value || '';
            node.properties['data-mermaid-source'] = sourceCode;
          }
        }
      }
    });
  };
} 