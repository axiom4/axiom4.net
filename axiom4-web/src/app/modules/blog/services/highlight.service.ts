import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import * as Prism from 'prismjs';
import mermaid from 'mermaid';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-vim';

@Injectable()
export class HighlightService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
      this.renderMermaid();
    }
  }

  renderMermaid() {
    if (isPlatformBrowser(this.platformId)) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        themeVariables: {
          primaryColor: '#ffcc00',
          edgeLabelBackground: '#ffffff',
          tertiaryColor: '#ffffff',
        },
      });

      const mermaidElements = document.querySelectorAll('.mermaid');
      mermaidElements.forEach((element, idx) => {
        // Check if already rendered (mermaid adds data-processed attribute or changes class)
        if (element.getAttribute('data-processed')) {
          return;
        }
        const code = element.textContent || '';
        // Ensure unique ID for each diagram
        const id = `mermaid-${Date.now()}-${idx}`;
        mermaid.render(id, code).then((renderResult) => {
          element.innerHTML = renderResult.svg;
          element.setAttribute('data-processed', 'true');
          const svg = element.querySelector('svg');
          if (svg) {
            svg.setAttribute(
              'style',
              'background-color: white; padding: 10px; margin: 10px; width: 100%; height: auto;'
            );
          }
        }).catch(e => console.error('Mermaid render error:', e));
      });
    }
  }
}
