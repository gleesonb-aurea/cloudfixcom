#!/usr/bin/env node

// ABOUTME: Analyzes WordPress SQLite database to inventory blog posts and resources for migration

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const wordpressDb = path.join(__dirname, '../../../cloudfixcom/wp-content/database/.ht.sqlite');
const outputPath = path.join(__dirname, '../docs/content-inventory.json');

function analyzeWordPressContent() {
  console.log('🔍 Analyzing WordPress content...');

  const db = new Database(wordpressDb, { readonly: true });

  try {
    // Get all posts and resources, filter by status in code
    const postsQuery = db.prepare(`
      SELECT
        ID,
        post_title,
        post_content,
        post_excerpt,
        post_name,
        post_date,
        post_modified,
        post_type,
        post_status
      FROM wp_posts
      WHERE post_type IN ('post', 'resource')
      ORDER BY post_date DESC
    `);

    const posts = postsQuery.all();

    // Analyze content statistics
    const stats = {
      totalPosts: posts.filter(p => p.post_type === 'post').length,
      totalResources: posts.filter(p => p.post_type === 'resource').length,
      recentPosts2024: posts.filter(p => p.post_type === 'post' && p.post_date.startsWith('2024')).length,
      recentPosts2025: posts.filter(p => p.post_type === 'post' && p.post_date.startsWith('2025')).length,
      totalWordCount: 0,
      postsWithExcerpt: 0,
      postsWithCategories: 0,
      postsWithTags: 0
    };

    // Detailed content inventory
    const inventory = {
      summary: stats,
      blogPosts: [],
      resources: [],
      categories: new Set(),
      tags: new Set(),
      analysisDate: new Date().toISOString()
    };

    posts.forEach(post => {
      // Only include published posts
      if (post.post_status !== 'publish') return;

      const wordCount = post.post_content ? post.post_content.split(/\s+/).length : 0;

      stats.totalWordCount += wordCount;
      if (post.post_excerpt) stats.postsWithExcerpt++;

      // For SQLite version without term relationships, we'll extract categories from content
      // in a more sophisticated migration script
      const hasCategories = false; // Will analyze in migration script
      const hasTags = false; // Will analyze in migration script

      const postData = {
        id: post.ID,
        title: post.post_title,
        slug: post.post_name,
        excerpt: post.post_excerpt,
        content: post.post_content ? post.post_content.substring(0, 200) + '...' : '', // Truncated for preview
        date: post.post_date,
        modified: post.post_modified,
        wordCount,
        categories: [], // Will extract from content/meta in migration script
        tags: [], // Will extract from content/meta in migration script
        hasFeaturedImage: false // Will check media later
      };

      if (post.post_type === 'post') {
        inventory.blogPosts.push(postData);
      } else if (post.post_type === 'resources') {
        inventory.resources.push(postData);
      }
    });

    // Convert Sets to Arrays for JSON serialization
    inventory.categories = Array.from(inventory.categories);
    inventory.tags = Array.from(inventory.tags);

    // Save inventory to file
    fs.writeFileSync(outputPath, JSON.stringify(inventory, null, 2));

    // Print summary
    console.log('\n📊 Content Analysis Summary:');
    console.log(`========================`);
    console.log(`📝 Blog Posts: ${stats.totalPosts}`);
    console.log(`📚 Resources: ${stats.totalResources}`);
    console.log(`📅 Recent Posts (2024): ${stats.recentPosts2024}`);
    console.log(`📅 Recent Posts (2025): ${stats.recentPosts2025}`);
    console.log(`📖 Total Word Count: ${stats.totalWordCount.toLocaleString()}`);
    console.log(`📋 Posts with Excerpts: ${stats.postsWithExcerpt}`);
    console.log(`🏷️  Posts with Categories: ${stats.postsWithCategories}`);
    console.log(`🏷️  Posts with Tags: ${stats.postsWithTags}`);
    console.log(`📂 Unique Categories: ${inventory.categories.length}`);
    console.log(`🏷️  Unique Tags: ${inventory.tags.length}`);
    console.log(`\n📄 Full inventory saved to: ${outputPath}`);

    // Show top categories
    console.log('\n📈 Top Categories:');
    const categoryCounts = {};
    inventory.blogPosts.forEach(post => {
      post.categories.forEach(cat => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    });

    Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count} posts`);
      });

  } catch (error) {
    console.error('❌ Error analyzing database:', error.message);
    process.exit(1);
  } finally {
    db.close();
  }
}

// Check if required dependencies are available
try {
  require('better-sqlite3');
} catch (error) {
  console.error('❌ Missing required dependency: better-sqlite3');
  console.log('Please install it with: npm install better-sqlite3');
  process.exit(1);
}

// Run analysis
if (require.main === module) {
  analyzeWordPressContent();
}

module.exports = { analyzeWordPressContent };