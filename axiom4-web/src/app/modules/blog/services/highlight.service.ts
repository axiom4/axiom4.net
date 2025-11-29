import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import * as Prism from 'prismjs';
import mermaid from 'mermaid';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
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
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-apacheconf';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-cmake';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-properties';
import 'prismjs/components/prism-clike';

@Injectable()
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
        mermaid
          .render(id, code)
          .then((renderResult) => {
            element.innerHTML = renderResult.svg;
            element.setAttribute('data-processed', 'true');
            const svg = element.querySelector('svg');
            if (svg) {
              svg.setAttribute(
                'style',
                'background-color: white; padding: 10px; margin: 10px; width: 100%; height: auto;'
              );
            }
          })
          .catch((e) => console.error('Mermaid render error:', e));
      });
    }
  }
}
