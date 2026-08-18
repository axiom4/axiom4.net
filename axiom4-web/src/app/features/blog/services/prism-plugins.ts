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

// @formatter:off
/* prettier-ignore-start */
// prettier-ignore
import 'prismjs/plugins/line-highlight/prism-line-highlight';
// prettier-ignore
import 'prismjs/plugins/line-numbers/prism-line-numbers';
// prettier-ignore
import 'prismjs/plugins/toolbar/prism-toolbar';
// prettier-ignore
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
/* prettier-ignore-end */
