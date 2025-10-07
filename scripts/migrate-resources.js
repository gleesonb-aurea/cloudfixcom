#!/usr/bin/env node

// ABOUTME: Migrates WordPress resources (custom post type) to structured JSON format for Next.js

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const wordpressDb = path.join(__dirname, '../../../cloudfixcom/wp-content/database/.ht.sqlite');
const outputDir = path.join(__dirname, '../content/resources');
const outputDataFile = path.join(outputDir, 'resources.json');

class ResourceMigrator {
  constructor() {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
  }

  extractResourceType(title, content) {
    // Determine resource type based on title and content
    const lowerTitle = title.toLowerCase();
    const lowerContent = content.toLowerCase();

    if (lowerTitle.includes('case study') || lowerContent.includes('case study')) {
      return 'case-study';
    }
    if (lowerTitle.includes('whitepaper') || lowerContent.includes('whitepaper')) {
      return 'whitepaper';
    }
    if (lowerTitle.includes('webinar') || lowerContent.includes('webinar')) {
      return 'webinar';
    }
    if (lowerTitle.includes('ebook') || lowerContent.includes('ebook')) {
      return 'ebook';
    }
    if (lowerTitle.includes('guide') || lowerContent.includes('guide')) {
      return 'guide';
    }
    if (lowerTitle.includes('calculator') || lowerContent.includes('calculator')) {
      return 'calculator';
    }
    if (lowerTitle.includes('template') || lowerContent.includes('template')) {
      return 'template';
    }

    return 'resource'; // Default type
  }

  extractCategory(title, content) {
    // Extract category based on content analysis
    const lowerContent = content.toLowerCase();
    const lowerTitle = title.toLowerCase();

    const categories = {
      'Cost Optimization': ['cost', 'saving', 'optimization', 'reduce', 'budget'],
      'Security': ['security', 'compliance', 'risk', 'threat', 'vulnerability'],
      'Migration': ['migration', 'move', 'transfer', 'migrate'],
      'DevOps': ['devops', 'automation', 'cicd', 'deployment', 'infrastructure'],
      'Monitoring': ['monitoring', 'observability', 'metrics', 'logging', 'alerting'],
      'Storage': ['storage', 'backup', 's3', 'ebs', 'database'],
      'Compute': ['compute', 'ec2', 'lambda', 'serverless', 'instances'],
      'Networking': ['networking', 'vpc', 'cdn', 'load balancer', 'dns']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerTitle.includes(keyword) || lowerContent.includes(keyword))) {
        return category;
      }
    }

    return 'General'; // Default category
  }

  extractTags(title, content) {
    // Extract relevant tags from content
    const techTerms = [
      'AWS', 'cloud', 'cost optimization', 'security', 'migration', 'devops',
      'monitoring', 'storage', 'compute', 'networking', 'EC2', 'S3', 'Lambda',
      'RDS', 'VPC', 'CloudWatch', 'CloudFormation', 'Terraform', 'serverless',
      'containers', 'Kubernetes', 'backup', 'disaster recovery', 'compliance'
    ];

    const tags = new Set();
    const lowerContent = content.toLowerCase();
    const lowerTitle = title.toLowerCase();

    techTerms.forEach(term => {
      if (lowerContent.includes(term.toLowerCase()) || lowerTitle.includes(term.toLowerCase())) {
        tags.add(term);
      }
    });

    return Array.from(tags).slice(0, 8); // Limit to 8 tags
  }

  extractDownloadUrl(content) {
    // Look for download links in the content
    const urlRegex = /https?:\/\/[^\s\)]+\.(pdf|zip|docx?|xlsx?|pptx?)/gi;
    const matches = content.match(urlRegex);
    return matches ? matches[0] : null;
  }

  extractFeaturedImage(content) {
    // Look for images that could be featured
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    const match = imgRegex.exec(content);
    if (match) {
      return this.transformImagePath(match[1]);
    }
    return null;
  }

  transformImagePath(originalPath) {
    // Convert WordPress media URLs to Next.js public directory paths
    if (originalPath.includes('wp-content/uploads/')) {
      const filename = originalPath.split('/').pop();
      return `/media/uploads/${filename}`;
    }
    return originalPath;
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  extractExcerpt(content, maxLength = 200) {
    // Remove HTML tags and create a plain text excerpt
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength).trim() + '...';
  }

  processResource(resource) {
    const excerpt = resource.post_excerpt || this.extractExcerpt(resource.post_content);
    const resourceType = this.extractResourceType(resource.post_title, resource.post_content);
    const category = this.extractCategory(resource.post_title, resource.post_content);
    const tags = this.extractTags(resource.post_title, resource.post_content);
    const slug = resource.post_name || this.generateSlug(resource.post_title);
    const downloadUrl = this.extractDownloadUrl(resource.post_content);
    const featuredImage = this.extractFeaturedImage(resource.post_content);

    // Convert HTML content to Markdown
    let mdContent = this.turndown.turndown(resource.post_content);

    // Process internal links
    mdContent = mdContent.replace(
      /https?:\/\/cloudfix\.com\/([^\s\)]+)/g,
      '/$1'
    );

    return {
      id: resource.ID,
      title: resource.post_title,
      description: excerpt,
      content: mdContent,
      type: resourceType,
      category,
      tags,
      slug,
      date: resource.post_date,
      modified: resource.post_modified,
      downloadUrl,
      featuredImage,
      published: true
    };
  }

  async migrateResources() {
    console.log('🚀 Starting resources migration...');

    const db = new Database(wordpressDb, { readonly: true });

    try {
      const query = `
        SELECT ID, post_title, post_content, post_excerpt, post_name, post_date, post_modified
        FROM wp_posts
        WHERE post_type = 'resources' AND post_status = 'publish'
        ORDER BY post_date DESC
      `;

      const resources = db.prepare(query).all();
      console.log(`📚 Found ${resources.length} resources to migrate`);

      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Process resources
      const processedResources = [];
      let migrated = 0;
      let errors = 0;
      const categories = new Set();
      const types = new Set();

      for (const resource of resources) {
        try {
          const processed = this.processResource(resource);
          processedResources.push(processed);
          categories.add(processed.category);
          types.add(processed.type);
          migrated++;

          console.log(`✅ Migrated: ${resource.post_title} → ${processed.type}/${processed.category}`);

        } catch (error) {
          console.error(`❌ Error migrating resource "${resource.post_title}":`, error.message);
          errors++;
        }
      }

      // Write resources data to JSON file
      const resourcesData = {
        resources: processedResources,
        metadata: {
          total: processedResources.length,
          categories: Array.from(categories),
          types: Array.from(types),
          lastUpdated: new Date().toISOString()
        }
      };

      fs.writeFileSync(outputDataFile, JSON.stringify(resourcesData, null, 2), 'utf8');

      console.log('\n📊 Migration Summary:');
      console.log(`=======================`);
      console.log(`✅ Successfully migrated: ${migrated}`);
      console.log(`❌ Errors: ${errors}`);
      console.log(`📂 Categories created: ${categories.size}`);
      console.log(`📋 Resource types: ${types.size}`);
      console.log(`📁 Output file: ${outputDataFile}`);

      console.log('\n📋 Categories:');
      Array.from(categories).sort().forEach(cat => {
        console.log(`  - ${cat}`);
      });

      console.log('\n📋 Resource Types:');
      Array.from(types).sort().forEach(type => {
        console.log(`  - ${type}`);
      });

    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      process.exit(1);
    } finally {
      db.close();
    }
  }
}

// Command line interface
async function main() {
  const migrator = new ResourceMigrator();
  await migrator.migrateResources();
}

// Run migration if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ResourceMigrator };