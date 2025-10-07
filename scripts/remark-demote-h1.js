// Simple Remark plugin to demote any H1 headings in MDX content to H2
// Prevents multiple H1s when pages render their own <h1>

module.exports = function remarkDemoteH1() {
  return function transformer(tree) {
    function walk(node) {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'heading' && node.depth === 1) {
        node.depth = 2;
      }
      const children = node.children;
      if (Array.isArray(children)) {
        for (const child of children) walk(child);
      }
    }
    walk(tree);
  };
};

