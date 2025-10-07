#!/usr/bin/env node

// ABOUTME: Migrates WordPress blog posts from SQLite to MDX format for Next.js

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

// Install dependencies: npm install turndown

const wordpressDb = path.join(__dirname, '../../../cloudfixcom/wp-content/database/.ht.sqlite');
const outputDir = path.join(__dirname, '../content/blog');

class BlogPostMigrator {
  constructor() {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      linkStyle: 'inlined'
    });

    // Custom converters for WordPress-specific content
    this.turndown.addRule('shortcode', {
      filter: (node) => {
        return node.textContent && node.textContent.includes('[') && node.textContent.includes(']');
      },
      replacement: (content) => {
        // Handle WordPress shortcodes - for now, preserve as comments
        return content;
      }
    });

    this.turndown.addRule('caption', {
      filter: (node) => {
        return node.nodeName === 'FIGURE' && node.classList.contains('wp-caption');
      },
      replacement: (content, node) => {
        const img = node.querySelector('img');
        const caption = node.querySelector('figcaption')?.textContent || '';

        if (img) {
          const src = this.transformImagePath(img.src);
          const alt = img.alt || '';
          const captionText = caption ? `\n\n*${caption}*` : '';

          return `![${alt}](${src})${captionText}\n\n`;
        }
        return content;
      }
    });
  }

  transformImagePath(originalPath) {
    // Convert WordPress media URLs to Next.js public directory paths
    if (originalPath.includes('wp-content/uploads/')) {
      const filename = originalPath.split('/').pop();
      return `/media/uploads/${filename}`;
    }
    return originalPath;
  }

  extractExcerpt(content, maxLength = 160) {
    // Remove HTML tags and create a plain text excerpt
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength).trim() + '...';
  }

  extractCategoryFromContent(content, title) {
    // Simple category extraction from content or title
    // This is a basic implementation - can be enhanced
    const keywords = {
      'AWS': 'AWS',
      'cloud': 'Cloud Computing',
      'cost': 'Cost Optimization',
      'security': 'Security',
      'migration': 'Migration',
      'serverless': 'Serverless',
      'ec2': 'AWS',
      's3': 'AWS',
      'lambda': 'AWS'
    };

    const lowerContent = content.toLowerCase();
    const lowerTitle = title.toLowerCase();

    for (const [keyword, category] of Object.entries(keywords)) {
      if (lowerContent.includes(keyword.toLowerCase()) || lowerTitle.includes(keyword.toLowerCase())) {
        return category;
      }
    }

    return 'Cloud Computing'; // Default category
  }

  extractTagsFromContent(content, title) {
    // Extract tags from content
    const techTerms = [
      'AWS', 'cloud', 'serverless', 'lambda', 'ec2', 's3', 'rds', 'vpc',
      'cost optimization', 'security', 'migration', 'devops', 'monitoring',
      'backup', 'storage', 'compute', 'networking', 'databases'
    ];

    const tags = new Set();
    const lowerContent = content.toLowerCase();
    const lowerTitle = title.toLowerCase();

    techTerms.forEach(term => {
      if (lowerContent.includes(term.toLowerCase()) || lowerTitle.includes(term.toLowerCase())) {
        tags.add(term);
      }
    });

    return Array.from(tags).slice(0, 5); // Limit to 5 tags
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  processPost(post) {
    const excerpt = post.post_excerpt || this.extractExcerpt(post.post_content);
    const category = this.extractCategoryFromContent(post.post_content, post.post_title);
    const tags = this.extractTagsFromContent(post.post_content, post.post_title);
    const slug = post.post_name || this.generateSlug(post.post_title);

    // Convert HTML content to Markdown
    let mdContent = this.turndown.turndown(post.post_content);

    // Process internal links
    mdContent = mdContent.replace(
      /https?:\/\/cloudfix\.com\/([^\s\)]+)/g,
      '/$1'
    );

    // Process image references
    mdContent = mdContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, src) => {
        const newSrc = this.transformImagePath(src);
        return `![${alt}](${newSrc})`;
      }
    );

    // Generate frontmatter
    const frontmatter = {
      title: post.post_title,
      description: excerpt,
      date: post.post_date,
      modified: post.post_modified,
      category,
      tags,
      featuredImage: null, // Will be processed separately
      published: true,
      slug
    };

    // Create MDX content
    const mdxContent = `---
title: ${JSON.stringify(frontmatter.title)}
description: ${JSON.stringify(frontmatter.description)}
date: ${frontmatter.date}
modified: ${frontmatter.modified}
category: ${JSON.stringify(frontmatter.category)}
tags: ${JSON.stringify(frontmatter.tags)}
published: ${frontmatter.published}
slug: ${JSON.stringify(frontmatter.slug)}
---

${mdContent}
`;

    return {
      frontmatter,
      content: mdxContent,
      slug,
      category
    };
  }

  async migratePosts(limit = null, recentOnly = false) {
    console.log('🚀 Starting blog post migration...');

    const db = new Database(wordpressDb, { readonly: true });

    try {
      // Build query based on parameters
      let whereClause = "WHERE post_type = 'post' AND post_status = 'publish'";
      if (recentOnly) {
        whereClause += " AND post_date >= '2024-01-01'";
      }

      let limitClause = '';
      if (limit) {
        limitClause = `LIMIT ${limit}`;
      }

      const query = `
        SELECT ID, post_title, post_content, post_excerpt, post_name, post_date, post_modified
        FROM wp_posts
        ${whereClause}
        ORDER BY post_date DESC
        ${limitClause}
      `;

      const posts = db.prepare(query).all();
      console.log(`📝 Found ${posts.length} posts to migrate`);

      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Migration statistics
      let migrated = 0;
      let errors = 0;
      const categories = new Set();

      for (const post of posts) {
        try {
          const processed = this.processPost(post);
          const categoryDir = path.join(outputDir, processed.category.toLowerCase().replace(/\s+/g, '-'));

          // Create category directory if it doesn't exist
          if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
          }

          // Write MDX file
          const filePath = path.join(categoryDir, `${processed.slug}.mdx`);
          fs.writeFileSync(filePath, processed.content, 'utf8');

          migrated++;
          categories.add(processed.category);

          console.log(`✅ Migrated: ${post.post_title} → ${processed.category}/${processed.slug}.mdx`);

        } catch (error) {
          console.error(`❌ Error migrating post "${post.post_title}":`, error.message);
          errors++;
        }
      }

      console.log('\n📊 Migration Summary:');
      console.log(`======================`);
      console.log(`✅ Successfully migrated: ${migrated}`);
      console.log(`❌ Errors: ${errors}`);
      console.log(`📂 Categories created: ${categories.size}`);
      console.log(`📁 Output directory: ${outputDir}`);

      console.log('\n📋 Categories:');
      Array.from(categories).sort().forEach(cat => {
        console.log(`  - ${cat}`);
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
  const migrator = new BlogPostMigrator();

  const args = process.argv.slice(2);
  const options = {
    limit: null,
    recentOnly: false
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--limit':
        options.limit = parseInt(args[i + 1]);
        i++;
        break;
      case '--recent':
        options.recentOnly = true;
        break;
      case '--help':
        console.log(`
Blog Post Migration Tool

Usage: node migrate-blog-posts.js [options]

Options:
  --limit <number>    Limit number of posts to migrate
  --recent            Only migrate posts from 2024 onwards
  --help              Show this help message

Examples:
  node migrate-blog-posts.js --limit 5          # Migrate 5 most recent posts
  node migrate-blog-posts.js --recent           # Migrate all posts from 2024+
  node migrate-blog-posts.js                    # Migrate all published posts
        `);
        process.exit(0);
    }
  }

  await migrator.migratePosts(options.limit, options.recentOnly);
}

// Check for required dependencies
try {
  require('turndown');
} catch (error) {
  console.error('❌ Missing required dependency: turndown');
  console.log('Please install it with: npm install turndown');
  process.exit(1);
}

// Run migration if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { BlogPostMigrator };