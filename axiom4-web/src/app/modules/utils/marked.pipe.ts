import { Pipe, PipeTransform } from '@angular/core';
import { marked, Renderer } from 'marked';

// Custom renderer that adds Bootstrap classes to elements produced by marked.
// Without this the canonical Bootstrap styling (e.g. .table) never applies
// because marked outputs plain elements and PurgeCSS removes unused classes.
const renderer = new Renderer();

renderer.table = ({ header, rows }) => {
  const headerHtml = header
    .map((cell) => `<th>${cell.text}</th>`)
    .join('');
  const bodyHtml = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell.text}</td>`).join('')}</tr>`)
    .join('');
  return (
    `<div class="table-responsive">` +
    `<table class="table table-bordered table-sm">` +
    `<thead class="table-dark"><tr>${headerHtml}</tr></thead>` +
    `<tbody>${bodyHtml}</tbody>` +
    `</table></div>`
  );
};

renderer.blockquote = ({ text }) =>
  `<blockquote class="blockquote ps-3 border-start border-secondary"><p>${text}</p></blockquote>`;

renderer.image = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<img src="${href}" alt="${text}"${titleAttr} class="img-fluid">`;
};

@Pipe({
  name: 'marked',
  standalone: true,
})
export class MarkedPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return value ?? '';

    const marked_result = marked.parse(value, { async: false, renderer });

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
