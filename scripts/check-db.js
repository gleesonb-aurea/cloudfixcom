#!/usr/bin/env node

// ABOUTME: Simple script to check WordPress database structure

const Database = require('better-sqlite3');
const path = require('path');

const wordpressDb = path.join(__dirname, '../../../cloudfixcom/wp-content/database/.ht.sqlite');

function checkDatabase() {
  console.log('🔍 Checking WordPress database structure...');

  const db = new Database(wordpressDb, { readonly: true });

  try {
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table'
      ORDER BY name
    `).all();

    console.log('\n📋 Available Tables:');
    tables.forEach(table => {
      console.log(`  - ${table.name}`);
    });

    // Check posts table structure
    if (tables.find(t => t.name === 'wp_posts')) {
      const postCount = db.prepare('SELECT COUNT(*) as count FROM wp_posts').get();
      console.log(`\n📝 Total posts in wp_posts: ${postCount.count}`);

      const publishedPosts = db.prepare(`
        SELECT COUNT(*) as count FROM wp_posts
        WHERE post_status = 'publish'
      `).get();
      console.log(`✅ Published posts: ${publishedPosts.count}`);

      const postTypes = db.prepare(`
        SELECT DISTINCT post_type, COUNT(*) as count
        FROM wp_posts
        GROUP BY post_type
        ORDER BY count DESC
      `).all();

      console.log('\n📊 Posts by type:');
      postTypes.forEach(type => {
        console.log(`  ${type.post_type}: ${type.count}`);
      });
    }

  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  } finally {
    db.close();
  }
}

checkDatabase();