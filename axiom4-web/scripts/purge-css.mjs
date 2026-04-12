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
    // Without this, PurgeCSS strips Bootstrap table/code/typography styles because
    // these elements never appear in the static Angular templates.
    {
      raw:
        "<h1><h2><h3><h4><h5><h6>" +
        "<p><br><hr><blockquote>" +
        "<pre><code><samp><kbd>" +
        "<table><thead><tbody><tfoot><tr><th><td><caption>" +
        "<ul><ol><li><dl><dt><dd>" +
        "<figure><figcaption>" +
        "<strong><em><b><i><del><ins><mark><s><sub><sup>" +
        "<a><img>",
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
      /^ng-/,
      // Prism.js syntax highlighting token classes
      /\btoken\b/,
      /^language-/,
      /^prism/,
      /^line-numbers/,
      /^line-highlight/,
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
