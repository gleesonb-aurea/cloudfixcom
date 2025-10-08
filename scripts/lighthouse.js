// ABOUTME: Simple Lighthouse runner for local URLs
// ABOUTME: Launches Chrome and audits key routes for scores
/* eslint-disable no-console */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

/**
 * Run a Lighthouse audit against the specified URL and print key category scores.
 *
 * @param {string} url - The fully qualified URL to audit (including protocol and host).
 */
async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'info', output: 'json', port: chrome.port };
  const config = { extends: 'lighthouse:default' };
  const runnerResult = await lighthouse(url, options, config);
  await chrome.kill();
  const { lhr } = runnerResult;
  console.log(`Lighthouse for ${url}`);
  console.log('Performance:', Math.round(lhr.categories.performance.score * 100));
  console.log('Accessibility:', Math.round(lhr.categories.accessibility.score * 100));
  console.log('Best Practices:', Math.round(lhr.categories['best-practices'].score * 100));
  console.log('SEO:', Math.round(lhr.categories.seo.score * 100));
}

/**
 * Run Lighthouse audits for a predefined set of routes using a base URL.
 *
 * The base URL is taken from process.argv[2] if provided, otherwise 'http://localhost:3000'.
 * Audits are performed sequentially for the routes: '/', '/features', '/pricing', '/blog', '/resources', '/podcast', and '/videos'.
 */
async function main() {
  const base = process.argv[2] || 'http://localhost:3000';
  const paths = ['/', '/features', '/pricing', '/blog', '/resources', '/podcast', '/videos'];
  for (const p of paths) {
    await runLighthouse(`${base}${p}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
