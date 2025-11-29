import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'marked',
  standalone: true,
})
export class MarkedPipe implements PipeTransform {
  transform(value: any): any {
    if (value && value.length > 0) {
      let marked_result = marked.parse(value, { async: false });

      if (typeof marked_result !== 'string') {
        return value;
      }

      marked_result = marked_result.replace(
        /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
        (match, code) => {
          const mermaidCode = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
          return `<div class="mermaid">${mermaidCode}</div>`;
        }
      );

      return marked_result;
    }
    return value;
  }
}
