#!/usr/bin/env node

// ABOUTME: Test script for media migration with limited sample

const fs = require('fs');
const path = require('path');

const wordpressUploadsDir = '/mnt/c/Users/bill/Studio/cloudfixcom/wp-content/uploads';
const nextPublicDir = path.join(__dirname, '../public/media/uploads');

async function testMediaMigration() {
  console.log('🧪 Testing media migration with sample files...');

  // Find a few sample images to test with
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const sampleFiles = [];

  function findSampleFiles(dir, maxDepth = 2, currentDepth = 0) {
    if (currentDepth >= maxDepth || sampleFiles.length >= 5) return;

    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        if (sampleFiles.length >= 5) break;

        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory() && currentDepth < maxDepth - 1) {
          findSampleFiles(itemPath, maxDepth, currentDepth + 1);
        } else if (stats.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (imageExtensions.includes(ext)) {
            sampleFiles.push(itemPath);
            console.log(`  Found sample: ${item}`);
          }
        }
      }
    } catch (error) {
      console.log(`  Skipping directory ${dir}: ${error.message}`);
    }
  }

  findSampleFiles(wordpressUploadsDir);

  if (sampleFiles.length === 0) {
    console.log('❌ No sample images found for testing');
    return;
  }

  console.log(`📁 Found ${sampleFiles.length} sample files to test with:`);
  sampleFiles.forEach(file => {
    console.log(`  - ${path.relative(wordpressUploadsDir, file)}`);
  });

  // Test the main migration script
  const { MediaMigrator } = require('./migrate-media.js');

  // Create a migrator instance for testing
  const migrator = new MediaMigrator();

  // Override the processDirectory method to only process our sample files
  const originalProcessFile = migrator.processFile.bind(migrator);
  migrator.processFile = async function(filePath, relativePath) {
    // Only process our sample files
    if (!sampleFiles.includes(filePath)) {
      return { skipped: true, reason: 'Not in test sample' };
    }
    return originalProcessFile(filePath, relativePath);
  };

  // Run migration on just the parent directories of our sample files
  console.log('\n🚀 Running test migration...');

  // Process each sample file individually
  for (const sampleFile of sampleFiles) {
    const relativePath = path.relative(wordpressUploadsDir, sampleFile);
    const result = await migrator.processFile(sampleFile, relativePath);

    if (result.success) {
      console.log(`✅ Successfully migrated: ${relativePath}`);
    } else {
      console.log(`❌ Failed to migrate: ${relativePath} - ${result.error}`);
    }
  }

  // Save test manifest
  migrator.saveManifest();

  console.log('\n📊 Test migration completed!');
  console.log(`📋 Manifest saved to: content/media-manifest.json`);
  console.log(`📁 Files available at: /media/uploads/`);
}

// Run test
testMediaMigration().catch(console.error);