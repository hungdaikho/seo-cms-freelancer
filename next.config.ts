// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Cấu hình Sass cho modules
  sassOptions: {
    includePaths: ['./src'],
    outputStyle: 'expanded',
  },

  // Tối ưu webpack cho HMR với CSS modules
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Đảm bảo CSS modules không gây reload
      config.module.rules.forEach((rule: { use: any[]; }) => {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach((useItem) => {
            if (useItem.loader && useItem.loader.includes('css-loader')) {
              useItem.options = {
                ...useItem.options,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              };
            }
          });
        }
      });

      // File watching cho SCSS
      config.watchOptions = {
        poll: false,
        aggregateTimeout: 200, // Giảm thời gian aggregate
        ignored: /node_modules/,
      };
    }

    return config;
  },

  experimental: {
    optimizeCss: false, // Tắt optimization trong dev
  },

  // Suppress React 19 compatibility warnings for Ant Design
  eslint: {
    ignoreDuringBuilds: false,
  },

  compiler: {
    // Suppress specific warnings in development
    styledComponents: true,
  },
};

export default nextConfig;