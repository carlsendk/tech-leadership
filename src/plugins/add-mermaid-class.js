import { visit } from 'unist-util-visit';

/** @type {import('unified').Plugin<[], import('hast').Root>} */
export default function addMermaidClass() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Handle code blocks with language-mermaid class
      if (
        node.tagName === 'code' &&
        node.properties?.className?.includes('language-mermaid')
      ) {
        // If the code element is inside a pre element, transform the pre element
        if (node.parent?.tagName === 'pre') {
          node.parent.tagName = 'pre';
          node.parent.properties = { 
            className: ['mermaid'],
            'data-mermaid-source': node.children[0].value  // Store original source
          };
          // Move the content up to the pre element
          node.parent.children = [{ type: 'text', value: node.children[0].value }];
        } else {
          // If code element is standalone, transform it to pre
          node.tagName = 'pre';
          node.properties = { 
            className: ['mermaid'],
            'data-mermaid-source': node.children[0].value  // Store original source
          };
        }
      }
    });
  };
} 