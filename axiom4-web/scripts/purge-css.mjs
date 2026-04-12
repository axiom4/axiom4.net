/**
 * Post-build PurgeCSS pass.
 *
 * Angular bundles the entire Bootstrap CSS (~250 KiB unminified) even though
 * the app uses only a fraction of Bootstrap components. This script runs
 * PurgeCSS on the production CSS output to remove selectors that are
 * never referenced in any Angular template or TypeScript file.
 *
 * Run: node scripts/purge-css.mjs
 * (called automatically from the `build` npm script)
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { PurgeCSS } from "purgecss";

const rootDir = resolve(import.meta.dirname, "..");
const distDir = join(rootDir, "dist", "axiom4-web", "browser");

// ── Find the hashed styles CSS file ─────────────────────────────────────────
const cssFile = readdirSync(distDir)
  .map((f) => join(distDir, f))
  .find((f) => /styles-[A-Z0-9]+\.css$/.test(f));

if (!cssFile) {
  console.error("purge-css: no styles-*.css found in", distDir);
  process.exit(1);
}

const originalSize = readFileSync(cssFile).length;

// ── PurgeCSS configuration ───────────────────────────────────────────────────
const [result] = await new PurgeCSS().purge({
  // Scan all Angular templates and TypeScript sources for class name usage.
  // Also scan the used ng-bootstrap compiled modules so that classes emitted
  // by ng-bootstrap's own HTML templates are not stripped.
  content: [
    `${rootDir}/src/**/*.html`,
    `${rootDir}/src/**/*.ts`,
    // ng-bootstrap components that are actually imported by the app
    `${rootDir}/node_modules/@ng-bootstrap/ng-bootstrap/fesm2022/ng-bootstrap-ng-bootstrap-carousel.mjs`,
    `${rootDir}/node_modules/@ng-bootstrap/ng-bootstrap/fesm2022/ng-bootstrap-ng-bootstrap-pagination.mjs`,
    `${rootDir}/node_modules/@ng-bootstrap/ng-bootstrap/fesm2022/ng-bootstrap-ng-bootstrap-modal.mjs`,
    `${rootDir}/node_modules/@ng-bootstrap/ng-bootstrap/fesm2022/ng-bootstrap-ng-bootstrap-offcanvas.mjs`,
    // Stub covering all HTML elements that marked renders at runtime via [innerHTML].
    // IMPORTANT: class attributes must be inside valid elements so PurgeCSS's HTML
    // extractor can parse them. Dangling class="..." text outside elements is ignored.
    {
      raw: `
        <!-- HTML elements rendered by marked (no Bootstrap classes added by marked) -->
        <h1></h1><h2></h2><h3></h3><h4></h4><h5></h5><h6></h6>
        <p></p><br><hr>
        <a href=""></a>
        <img src="" class="img-fluid">
        <strong></strong><em></em><b></b><i></i>
        <del></del><ins></ins><mark></mark><s></s><sub></sub><sup></sup>
        <ul><li></li></ul><ol><li></li></ol>
        <dl><dt></dt><dd></dd></dl>
        <figure class="figure"><figcaption class="figure-caption"></figcaption></figure>

        <!-- Bootstrap classes added by MarkedPipe renderer to markdown-rendered elements -->
        <blockquote class="blockquote"><p></p></blockquote>
        <table class="table table-bordered table-sm">
          <thead class="table-dark"><tr><th></th></tr></thead>
          <tbody><tr><td></td></tr></tbody>
          <tfoot><tr><td></td></tr></tfoot>
          <caption></caption>
        </table>
        <pre class="line-numbers"><code class="language-bash language-python language-javascript language-typescript language-html language-css language-json language-yaml language-sql language-java language-c language-cpp language-csharp language-go language-rust language-php language-ruby language-swift language-kotlin language-shell language-diff language-docker language-nginx language-ini language-markup"></code></pre>
        <!-- Prism.js plugin classes added at runtime -->
        <div class="line-numbers line-highlight code-toolbar toolbar toolbar-item copy-to-clipboard-button line-numbers-rows">
          <span class="token keyword string number boolean null undefined regex url function class-name property builtin char escape inserted deleted tag attr-name attr-value selector comment prolog doctype cdata entity operator punctuation important bold italic"></span>
        </div>
      `,
      extension: "html",
    },
  ],
  css: [cssFile],

  safelist: {
    // ── Exact class names toggled by Bootstrap JS / ng-bootstrap ─────────
    standard: [
      // Visibility state
      "show",
      "hide",
      "open",
      "close",
      // Interactivity state
      "active",
      "disabled",
      "focus",
      // Transition helpers
      "fade",
      "in",
      "out",
      "collapse",
      "collapsing",
      "collapsed",
      // Carousel motion classes (toggled by ng-bootstrap)
      "carousel-item-next",
      "carousel-item-prev",
      "carousel-item-start",
      "carousel-item-end",
      // Backdrop overlays
      "modal-backdrop",
      "offcanvas-backdrop",
      // Form validation
      "was-validated",
      "is-valid",
      "is-invalid",
      // Angular router
      "router-outlet",
    ],

    // ── Patterns: keep any selector whose text contains a match ──────────
    greedy: [
      // Bootstrap CSS custom properties declared in :root
      /--bs-/,
      // ng-bootstrap host elements (e.g. ngb-carousel, ngb-pagination)
      /ngb-/,
      // Angular built-in directive classes (ng-star-inserted, ng-animating…)
      // Note: no ^ anchor — CSS selectors start with "." so ".ng-*" won't match /^ng-/
      /\bng-/,
      // Prism.js syntax highlighting token classes
      /\btoken\b/,
      // Note: no ^ anchor — ".language-python" etc. start with "." not "l"
      /\blanguage-/,
      /\bprism/,
      /\bline-numbers\b/,
      /\bline-highlight\b/,
      /\btoolbar\b/,
      /\bcode-toolbar\b/,
    ],
  },

  // Keep CSS custom property (variable) declarations in :root.
  // Bootstrap uses --bs-* variables extensively in calc() and component styles;
  // setting this to true would incorrectly remove them.
  variables: false,
});

// ── Write back in place (same filename) ─────────────────────────────────────
writeFileSync(cssFile, result.css);

const newSize = Buffer.byteLength(result.css);
const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
console.log(
  `purge-css: ${Math.round(originalSize / 1024)} KiB → ${Math.round(newSize / 1024)} KiB  (-${saved}%)  [${cssFile.split("/").pop()}]`,
);
