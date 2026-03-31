import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath: "/LiveifyWeb",
  serverExternalPackages: ['@takumi-rs/image-response'],
  reactStrictMode: true,
};

export default withMDX(config);
