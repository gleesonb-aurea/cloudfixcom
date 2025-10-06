#!/usr/bin/env node

/**
 * WordPress to Next.js Site Analyzer
 * Analyzes the WordPress site structure and creates a migration plan
 */

const fs = require('fs');
const path = require('path');

const WORDPRESS_URL = 'https://cloudfix.com';

// Site structure based on analysis
const siteStructure = {
  mainPages: [
    { title: 'Home', url: '/', priority: 1 },
    { title: 'Pricing', url: '/pricing/', priority: 1 },
    { title: 'Assessment', url: '/assessment/', priority: 1 },
    { title: 'About Us', url: '/about/', priority: 2 },
    { title: 'Leadership', url: '/leadership/', priority: 2 },
    { title: 'Contact', url: '/contact/', priority: 2 },
    { title: 'Success Stories', url: '/success-stories/', priority: 1 },
  ],

  solutions: [
    { title: 'CloudFix – Cost Optimization', url: '/cloudfix/', priority: 1 },
    { title: 'RightSpend – Discount Optimization', url: '/rightspend/', priority: 1 },
    { title: 'QueryLens – Database Upgrade', url: '/querylens/', priority: 1 },
    { title: 'MCP Servers', url: '/mcp-servers/', priority: 2 },
  ],

  services: [
    { title: 'Cost Optimization Services', url: '/cost-optimization-services/', priority: 2 },
  ],

  partnerships: [
    { title: 'AWS Partnership', url: '/aws-partnership/', priority: 2 },
    { title: 'Become a Referral Partner', url: '/become-a-referral-partner/', priority: 3 },
    { title: 'Partner Opportunity', url: '/partner-opportunity/', priority: 3 },
  ],

  resources: [
    { title: 'All Resources', url: '/resources/', priority: 1 },
    { title: 'Blog', url: '/blog/', priority: 1 },
    { title: 'Podcast', url: '/podcast/', priority: 2 },
    { title: 'Livestream', url: '/livestream/', priority: 2 },
    { title: 'Videos', url: '/videos/', priority: 2 },
    { title: 'Webinar Index', url: '/webinar/', priority: 2 },
    { title: 'News & Events', url: '/news-events/', priority: 3 },
  ],

  legal: [
    { title: 'Privacy Policy', url: '/privacy/', priority: 3 },
    { title: 'Terms of Service', url: '/terms-of-service/', priority: 3 },
  ],
};

// Create migration plan
const migrationPlan = {
  phase1_core: {
    name: 'Core Pages - Week 1',
    pages: [
      ...siteStructure.mainPages.filter(p => p.priority === 1),
      ...siteStructure.solutions.filter(p => p.priority === 1),
    ],
  },

  phase2_secondary: {
    name: 'Secondary Pages - Week 2',
    pages: [
      ...siteStructure.mainPages.filter(p => p.priority === 2),
      ...siteStructure.solutions.filter(p => p.priority === 2),
      ...siteStructure.services,
      ...siteStructure.partnerships.filter(p => p.priority === 2),
    ],
  },

  phase3_content: {
    name: 'Content & Resources - Week 3',
    pages: [
      ...siteStructure.resources,
    ],
    notes: [
      'Set up MDX blog system',
      'Create dynamic routing for blog posts',
      'Migrate existing blog content',
      'Set up podcast/video pages',
    ],
  },

  phase4_final: {
    name: 'Final Pages & Polish - Week 4',
    pages: [
      ...siteStructure.mainPages.filter(p => p.priority === 3),
      ...siteStructure.partnerships.filter(p => p.priority === 3),
      ...siteStructure.legal,
    ],
    notes: [
      'Final QA testing',
      'Performance optimization',
      'SEO verification',
      'Set up redirects',
    ],
  },
};

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    wordpress_url: WORDPRESS_URL,
    site_structure: siteStructure,
    migration_plan: migrationPlan,
    stats: {
      total_pages: Object.values(siteStructure).flat().length,
      priority_1: Object.values(siteStructure).flat().filter(p => p.priority === 1).length,
      priority_2: Object.values(siteStructure).flat().filter(p => p.priority === 2).length,
      priority_3: Object.values(siteStructure).flat().filter(p => p.priority === 3).length,
    },
  };

  return report;
}

// Main execution
console.log('🔍 Analyzing CloudFix WordPress site...\n');

const report = generateReport();

// Save to file
const outputPath = path.join(__dirname, '..', 'SITE_ANALYSIS.json');
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

console.log('📊 Site Analysis Complete!\n');
console.log(`Total Pages: ${report.stats.total_pages}`);
console.log(`Priority 1 (Core): ${report.stats.priority_1} pages`);
console.log(`Priority 2 (Secondary): ${report.stats.priority_2} pages`);
console.log(`Priority 3 (Final): ${report.stats.priority_3} pages\n`);

console.log('📅 Migration Plan:\n');
Object.entries(migrationPlan).forEach(([key, phase]) => {
  console.log(`${phase.name}:`);
  console.log(`  - ${phase.pages.length} pages`);
  if (phase.notes) {
    console.log(`  - ${phase.notes.length} additional tasks`);
  }
  console.log();
});

console.log(`✅ Analysis saved to: ${outputPath}\n`);
