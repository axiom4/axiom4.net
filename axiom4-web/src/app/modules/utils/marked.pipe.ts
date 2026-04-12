import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'marked',
  standalone: true,
})
export class MarkedPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return value ?? '';

    const marked_result = marked.parse(value, { async: false });

    if (typeof marked_result !== 'string') {
      return value;
    }

    return marked_result.replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      (_match, code) => {
        const mermaidCode = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
        return `<div class="mermaid">${mermaidCode}</div>`;
      },
    );
  }
}
