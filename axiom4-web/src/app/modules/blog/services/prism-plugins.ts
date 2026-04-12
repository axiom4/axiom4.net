/**
 * Prism.js plugin imports — ORDER IS SIGNIFICANT.
 *
 * toolbar MUST be imported before copy-to-clipboard, otherwise
 * copy-to-clipboard registers its button before the toolbar is ready
 * and logs a console warning.
 *
 * Keep this file separate so that auto-formatters / import-sorters
 * operating on highlight.service.ts don't reorder these side-effect imports.
 */

// eslint-disable-next-line simple-import-sort/imports
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/toolbar/prism-toolbar';
