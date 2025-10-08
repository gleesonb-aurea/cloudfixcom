const remarkGfm = require('remark-gfm');
const rehypeHighlight = require('rehype-highlight');
const rehypeSlug = require('rehype-slug');
const path = require('path');
const remarkDemoteH1 = require('./scripts/remark-demote-h1');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkDemoteH1],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer(withMDX({
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudfix.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cloudfix.com',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  compress: true,
  poweredByHeader: false,
  webpack: (config) => {
    // Ensure TS path alias '@/*' resolves in Webpack too
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ['@']: path.resolve(__dirname),
    };
    return config;
  },
}));

module.exports = nextConfig
