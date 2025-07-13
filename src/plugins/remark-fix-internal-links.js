import { visit } from 'unist-util-visit';
import path from 'path';

/**
 * Remark plugin to fix relative internal links to work with base path
 * Transforms various relative link patterns to absolute paths
 */
export default function remarkFixInternalLinks() {
  return (tree, file) => {
    // Get the current file path to resolve relative links
    const currentFilePath = file.history[0] || '';
    const isWikiFile = currentFilePath.includes('/wiki/');
    const isBlogFile = currentFilePath.includes('/blog/');
    
    visit(tree, 'link', (node) => {
      if (node.url && typeof node.url === 'string') {
        // Skip external links, anchors, and already absolute links
        if (node.url.startsWith('http') || node.url.startsWith('#') || node.url.startsWith('/tech-leadership/')) {
          return;
        }
        
        let newUrl = node.url;
        
        // Handle different relative link patterns
        if (node.url.startsWith('../wiki/')) {
          // Links to wiki from blog or other locations
          newUrl = node.url.replace('../wiki/', '/tech-leadership/wiki/');
        } else if (node.url.startsWith('../blog/')) {
          // Links to blog from wiki or other locations
          newUrl = node.url.replace('../blog/', '/tech-leadership/blog/');
        } else if (node.url.startsWith('./')) {
          // Same directory links (./file)
          if (isWikiFile) {
            // Extract current directory from file path
            const relativePath = currentFilePath.replace(/.*\/src\/content\/wiki\//, '');
            const currentDir = path.dirname(relativePath);
            const fileName = node.url.substring(2); // Remove './'
            
            if (currentDir === '.') {
              newUrl = `/tech-leadership/wiki/${fileName}`;
            } else {
              newUrl = `/tech-leadership/wiki/${currentDir}/${fileName}`;
            }
          } else if (isBlogFile) {
            const fileName = node.url.substring(2); // Remove './'
            newUrl = `/tech-leadership/blog/${fileName}`;
          }
        } else if (node.url.startsWith('../')) {
          // Parent directory links (../something)
          if (isWikiFile) {
            // For wiki files, resolve relative to wiki root
            const cleanPath = node.url.replace('../', '');
            newUrl = `/tech-leadership/wiki/${cleanPath}`;
          }
        } else if (!node.url.includes('/') && !node.url.includes('://')) {
          // Sibling file links (just filename, no path separators)
          if (isWikiFile) {
            // Extract current directory from file path
            const relativePath = currentFilePath.replace(/.*\/src\/content\/wiki\//, '');
            const currentDir = path.dirname(relativePath);
            
            if (currentDir === '.') {
              newUrl = `/tech-leadership/wiki/${node.url}`;
            } else {
              newUrl = `/tech-leadership/wiki/${currentDir}/${node.url}`;
            }
          } else if (isBlogFile) {
            newUrl = `/tech-leadership/blog/${node.url}`;
          }
        }
        
        // Add trailing slash if not present and no anchor
        if (newUrl !== node.url && !newUrl.endsWith('/') && !newUrl.includes('#')) {
          newUrl += '/';
        }
        
        // Update the node URL
        node.url = newUrl;
      }
    });
  };
}