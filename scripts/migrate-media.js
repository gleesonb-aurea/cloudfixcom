#!/usr/bin/env node

// ABOUTME: Migrates WordPress media assets to Next.js public directory with optimization

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

// Install dependencies: npm install sharp

const wordpressUploadsDir = '/mnt/c/Users/bill/Studio/cloudfixcom/wp-content/uploads';
const nextPublicDir = path.join(__dirname, '../public/media/uploads');
const manifestPath = path.join(__dirname, '../content/media-manifest.json');

class MediaMigrator {
  constructor() {
    this.manifest = {
      migrated: [],
      errors: [],
      summary: {
        totalFiles: 0,
        migratedFiles: 0,
        skippedFiles: 0,
        errorFiles: 0,
        totalSizeOriginal: 0,
        totalSizeOptimized: 0,
        compressionRatio: 0
      },
      lastUpdated: new Date().toISOString()
    };

    // Supported image formats for optimization
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'];

    // Skip certain file types
    this.skipExtensions = ['.php', '.html', '.htm', '.css', '.js', '.txt', '.log'];
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(fileBuffer).digest('hex');
  }

  async optimizeImage(inputPath, outputPath, format = 'jpeg') {
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      // Skip if already optimized or very small
      if (metadata.size < 1024 || format === 'gif') {
        fs.copyFileSync(inputPath, outputPath);
        return {
          originalSize: metadata.size,
          optimizedSize: metadata.size,
          compression: false
        };
      }

      // Optimization strategy based on image type
      let optimizedImage = image;

      if (format === 'jpeg' || format === 'jpg') {
        optimizedImage = image
          .jpeg({ quality: 85, progressive: true })
          .resize(metadata.width, metadata.height, {
            fit: 'inside',
            withoutEnlargement: true
          });
      } else if (format === 'png') {
        optimizedImage = image
          .png({ compressionLevel: 9, progressive: true, palette: true });
      } else if (format === 'webp') {
        optimizedImage = image
          .webp({ quality: 85 });
      } else {
        // For other formats, just copy
        fs.copyFileSync(inputPath, outputPath);
        return {
          originalSize: metadata.size,
          optimizedSize: metadata.size,
          compression: false
        };
      }

      await optimizedImage.toFile(outputPath);

      const optimizedStats = fs.statSync(outputPath);
      const wasCompressed = optimizedStats.size < metadata.size;

      return {
        originalSize: metadata.size,
        optimizedSize: optimizedStats.size,
        compression: wasCompressed,
        originalDimensions: { width: metadata.width, height: metadata.height },
        format
      };
    } catch (error) {
      console.error(`❌ Error optimizing image ${inputPath}:`, error.message);
      throw error;
    }
  }

  async processFile(filePath, relativePath) {
    const ext = path.extname(filePath).toLowerCase();
    const filename = path.basename(filePath, ext);
    const stats = fs.statSync(filePath);

    // Skip directories and unsupported files
    if (stats.isDirectory() || this.skipExtensions.includes(ext)) {
      return { skipped: true, reason: 'Unsupported file type' };
    }

    try {
      // Create output directory structure
      const outputPath = path.join(nextPublicDir, relativePath);
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      let fileResult = {
        originalPath: `/wp-content/uploads/${relativePath.replace(/\\/g, '/')}`,
        nextjsPath: `/media/uploads/${relativePath.replace(/\\/g, '/')}`,
        filename: filename + ext,
        size: stats.size,
        modified: stats.mtime.toISOString(),
        hash: this.getFileHash(filePath)
      };

      // Optimize images
      if (this.supportedFormats.includes(ext)) {
        const optimization = await this.optimizeImage(filePath, outputPath, ext.slice(1));

        fileResult = {
          ...fileResult,
          ...optimization,
          wasOptimized: optimization.compression,
          sizeBefore: optimization.originalSize,
          sizeAfter: optimization.optimizedSize,
          compressionRatio: optimization.originalSize > 0
            ? ((optimization.originalSize - optimization.optimizedSize) / optimization.originalSize * 100).toFixed(2) + '%'
            : '0%'
        };

        this.manifest.summary.totalSizeOriginal += optimization.originalSize;
        this.manifest.summary.totalSizeOptimized += optimization.optimizedSize;
      } else {
        // Copy non-image files as-is
        fs.copyFileSync(filePath, outputPath);
        fileResult.fileType = 'document';
      }

      this.manifest.migrated.push(fileResult);
      this.manifest.summary.migratedFiles++;

      return { success: true, file: fileResult };

    } catch (error) {
      const errorResult = {
        originalPath: filePath,
        relativePath,
        error: error.message,
        size: stats.size
      };

      this.manifest.errors.push(errorResult);
      this.manifest.summary.errorFiles++;

      console.error(`❌ Error processing file ${relativePath}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  async processDirectory(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    const results = [];

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const itemRelativePath = path.join(relativePath, item);
      const stats = fs.statSync(itemPath);

      this.manifest.summary.totalFiles++;

      if (stats.isDirectory()) {
        // Recursively process subdirectories
        const subResults = await this.processDirectory(itemPath, itemRelativePath);
        results.push(...subResults);
      } else {
        // Process files
        const result = await this.processFile(itemPath, itemRelativePath);
        results.push(result);

        if (result.success) {
          console.log(`✅ Migrated: ${itemRelativePath}`);
          if (result.file?.wasOptimized) {
            console.log(`   📊 Optimized: ${result.file.sizeBefore} → ${result.file.sizeAfter} (${result.file.compressionRatio} saved)`);
          }
        }
      }
    }

    return results;
  }

  async generateWebpVersions() {
    console.log('\n🖼️  Generating WebP versions for better performance...');

    let webpGenerated = 0;

    for (const file of this.manifest.migrated) {
      if (file.format && ['jpeg', 'jpg', 'png'].includes(file.format.toLowerCase())) {
        try {
          const originalPath = path.join(nextPublicDir, file.nextjsPath.replace('/media/uploads/', ''));
          const webpPath = originalPath.replace(/\.[^/.]+$/, '.webp');

          await sharp(originalPath)
            .webp({ quality: 85 })
            .toFile(webpPath);

          file.webpPath = file.nextjsPath.replace(/\.[^/.]+$/, '.webp');
          webpGenerated++;

        } catch (error) {
          console.warn(`⚠️  Could not generate WebP for ${file.filename}:`, error.message);
        }
      }
    }

    console.log(`✅ Generated ${webpGenerated} WebP versions`);
    return webpGenerated;
  }

  saveManifest() {
    // Calculate final statistics
    if (this.manifest.summary.totalSizeOriginal > 0) {
      this.manifest.summary.compressionRatio =
        ((this.manifest.summary.totalSizeOriginal - this.manifest.summary.totalSizeOptimized) /
         this.manifest.summary.totalSizeOriginal * 100).toFixed(2) + '%';
    }

    // Save manifest
    fs.writeFileSync(manifestPath, JSON.stringify(this.manifest, null, 2), 'utf8');
    console.log(`\n📋 Media migration manifest saved to: ${manifestPath}`);
  }

  async migrateMedia(options = {}) {
    console.log('🚀 Starting media migration...');
    console.log(`📁 Source: ${wordpressUploadsDir}`);
    console.log(`📁 Destination: ${nextPublicDir}`);

    const startTime = Date.now();

    // Check if source directory exists
    if (!fs.existsSync(wordpressUploadsDir)) {
      throw new Error(`Source directory not found: ${wordpressUploadsDir}`);
    }

    // Ensure destination directory exists
    if (!fs.existsSync(nextPublicDir)) {
      fs.mkdirSync(nextPublicDir, { recursive: true });
    }

    try {
      // Process all files recursively
      await this.processDirectory(wordpressUploadsDir);

      // Generate WebP versions for better performance
      if (!options.skipWebp) {
        await this.generateWebpVersions();
      }

      // Save migration manifest
      this.saveManifest();

      const duration = (Date.now() - startTime) / 1000;

      // Display summary
      console.log('\n📊 Migration Summary:');
      console.log('========================');
      console.log(`⏱️  Duration: ${duration.toFixed(2)} seconds`);
      console.log(`📁 Total files processed: ${this.manifest.summary.totalFiles}`);
      console.log(`✅ Successfully migrated: ${this.manifest.summary.migratedFiles}`);
      console.log(`❌ Errors: ${this.manifest.summary.errorFiles}`);

      if (this.manifest.summary.totalSizeOriginal > 0) {
        console.log(`📦 Original size: ${this.formatBytes(this.manifest.summary.totalSizeOriginal)}`);
        console.log(`📦 Optimized size: ${this.formatBytes(this.manifest.summary.totalSizeOptimized)}`);
        console.log(`📈 Total compression: ${this.manifest.summary.compressionRatio}`);
      }

      if (this.manifest.errors.length > 0) {
        console.log('\n❌ Errors encountered:');
        this.manifest.errors.slice(0, 10).forEach(error => {
          console.log(`  - ${error.originalPath}: ${error.error}`);
        });

        if (this.manifest.errors.length > 10) {
          console.log(`  ... and ${this.manifest.errors.length - 10} more errors`);
        }
      }

      console.log(`\n🎉 Media migration completed successfully!`);
      console.log(`📁 Files available at: /media/uploads/`);

    } catch (error) {
      console.error('❌ Media migration failed:', error.message);
      throw error;
    }
  }
}

// Command line interface
async function main() {
  const migrator = new MediaMigrator();

  const args = process.argv.slice(2);
  const options = {
    skipWebp: false
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--skip-webp':
        options.skipWebp = true;
        break;
      case '--help':
        console.log(`
Media Asset Migration Tool

Usage: node migrate-media.js [options]

Options:
  --skip-webp         Skip WebP version generation
  --help              Show this help message

Description:
  Migrates all media assets from WordPress uploads directory to Next.js public directory.
  Optimizes images for web delivery and generates WebP versions for better performance.
  Creates a manifest file with detailed migration information.

Examples:
  node migrate-media.js                    # Full migration with WebP generation
  node migrate-media.js --skip-webp        # Migration without WebP versions
        `);
        process.exit(0);
    }
  }

  await migrator.migrateMedia(options);
}

// Check for required dependencies
try {
  require('sharp');
} catch (error) {
  console.error('❌ Missing required dependency: sharp');
  console.log('Please install it with: npm install sharp');
  process.exit(1);
}

// Run migration if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { MediaMigrator };