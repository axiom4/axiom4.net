(function () {
  'use strict';

  var mermaidInitialized = false;

  // Inject CSS to constrain mermaid diagrams regardless of SVG inline attributes
  var style = document.createElement('style');
  style.textContent = [
    '.mermaid { max-width: 100%; overflow-x: auto; }',
    '.mermaid svg { display: block; max-width: 100%; height: auto !important; }',
  ].join('\n');
  document.head.appendChild(style);

  function ensureMermaid(callback) {
    if (window.mermaid) {
      callback();
      return;
    }
    var script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    script.onload = function () {
      if (!mermaidInitialized) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          flowchart: { useMaxWidth: false, htmlLabels: true },
          sequence: { useMaxWidth: false },
          gantt: { useMaxWidth: false },
          er: { useMaxWidth: false },
          pie: { useMaxWidth: false },
          mindmap: { useMaxWidth: false },
        });
        mermaidInitialized = true;
      }
      callback();
    };
    script.onerror = function () {
      console.error('admin-mermaid: failed to load mermaid from CDN');
    };
    document.head.appendChild(script);
  }

  function renderMermaid() {
    var elements = document.querySelectorAll(
      '.mermaid:not([data-processed])'
    );
    if (elements.length === 0) return;

    ensureMermaid(function () {
      elements.forEach(function (el, idx) {
        var code = el.textContent || '';
        var id = 'mermaid-admin-' + Date.now() + '-' + idx;
        window.mermaid
          .render(id, code)
          .then(function (result) {
            el.innerHTML = result.svg;
            el.setAttribute('data-processed', 'true');
            el.style.maxWidth = '100%';
            el.style.overflowX = 'auto';
            var svg = el.querySelector('svg');
            if (svg) {
              svg.style.display = 'block';
              svg.style.height = 'auto';
            }
          })
          .catch(function (e) {
            console.error('admin-mermaid render error:', e);
          });
      });
    });
  }

  function observeAll() {
    // Martor generates preview containers with IDs like "martor-<field>-preview"
    // We observe the whole document body to catch any preview container.
    var observer = new MutationObserver(function (mutations) {
      var hasMermaid = mutations.some(function (m) {
        return Array.from(m.addedNodes).some(function (node) {
          return node.nodeType === 1 &&
            (node.classList && node.classList.contains('mermaid') ||
              (node.querySelector && node.querySelector('.mermaid')));
        });
      });
      if (hasMermaid) renderMermaid();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    observeAll();
    renderMermaid();
  });
})();
