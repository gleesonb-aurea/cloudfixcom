// ABOUTME: Simple Lighthouse runner for local URLs
// ABOUTME: Launches Chrome and audits key routes for scores
/* eslint-disable no-console */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

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

