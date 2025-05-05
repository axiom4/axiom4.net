import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';
import mermaid from 'mermaid';

@Pipe({
  name: 'marked',
  standalone: true,
})
export class MarkedPipe implements PipeTransform {
  transform(value: any): any {
    if (value && value.length > 0) {
      let marked_result = marked(value);

      if (typeof marked_result !== 'string') {
        return value;
      }

      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        themeVariables: {
          primaryColor: '#ffcc00',
          edgeLabelBackground: '#ffffff',
          tertiaryColor: '#ffffff',
        },
      });

      marked_result = marked_result.replace(
        /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
        (match, code) => {
          const mermaidCode = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
          return `<div class="mermaid">${mermaidCode}</div>`;
        }
      );

      setTimeout(() => {
        const mermaidElements = document.querySelectorAll('.mermaid');
        mermaidElements.forEach((element, idx) => {
          const code = element.textContent || '';
          mermaid.render(`mermaid-${idx}`, code).then((renderResult) => {
            element.innerHTML = renderResult.svg;
            const svg = element.querySelector('svg');
            if (svg) {
              svg.setAttribute(
                'style',
                'background-color: white; padding: 10px; margin: 10px; width: 100%; height: auto;'
              );
            }
          });
        });
      }, 0);
      return marked_result;
    }
    return value;
  }
}
