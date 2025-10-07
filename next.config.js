const remarkGfm = require('remark-gfm');
const rehypeHighlight = require('rehype-highlight');
const rehypeSlug = require('rehype-slug');
const path = require('path');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudfix.com',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    // Ensure TS path alias '@/*' resolves in Webpack too
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ['@']: path.resolve(__dirname),
    };
    return config;
  },
});

module.exports = nextConfig
