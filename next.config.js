const remarkGfm = require('remark-gfm');
const rehypeHighlight = require('rehype-highlight');
const rehypeSlug = require('rehype-slug');
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
});

module.exports = nextConfig
