import { describe, it, expect } from 'vitest';
import addMermaidClass from '../src/plugins/add-mermaid-class.js';

function runPlugin(tree: any) {
  const transformer = addMermaidClass();
  transformer(tree as any);
}

describe('addMermaidClass plugin', () => {
  it('transforms code block inside pre to pre.mermaid', () => {
    const codeNode = {
      type: 'element',
      tagName: 'code',
      properties: { className: ['language-mermaid'] },
      children: [{ type: 'text', value: 'graph TD;' }],
    };
    const preNode = {
      type: 'element',
      tagName: 'pre',
      children: [codeNode],
    };
    // link parent references for plugin
    codeNode.parent = preNode;
    const tree = { type: 'root', children: [preNode] };

    runPlugin(tree);

    expect(preNode.tagName).toBe('pre');
    expect(preNode.properties).toEqual({ className: ['mermaid'] });
    expect(preNode.children).toEqual([{ type: 'text', value: 'graph TD;' }]);
  });

  it('transforms standalone mermaid code to pre.mermaid', () => {
    const codeNode = {
      type: 'element',
      tagName: 'code',
      properties: { className: ['language-mermaid'] },
      children: [{ type: 'text', value: 'graph TD;' }],
    };
    const tree = { type: 'root', children: [codeNode] };

    runPlugin(tree);

    expect(tree.children[0].tagName).toBe('pre');
    expect(tree.children[0].properties).toEqual({ className: ['mermaid'] });
    expect(tree.children[0].children).toEqual([{ type: 'text', value: 'graph TD;' }]);
  });

  it('ignores non-mermaid code blocks', () => {
    const codeNode = {
      type: 'element',
      tagName: 'code',
      properties: { className: ['language-js'] },
      children: [{ type: 'text', value: 'console.log("hi")' }],
    };
    const preNode = {
      type: 'element',
      tagName: 'pre',
      children: [codeNode],
    };
    codeNode.parent = preNode;
    const tree = { type: 'root', children: [preNode] };
    const original = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'pre',
          children: [
            {
              type: 'element',
              tagName: 'code',
              properties: { className: ['language-js'] },
              children: [{ type: 'text', value: 'console.log("hi")' }],
            },
          ],
        },
      ],
    };

    runPlugin(tree);
    delete codeNode.parent;

    expect(tree).toEqual(original);
  });
});
