import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  images: {
    domains: [
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "pixarlaravel.s3.ap-southeast-1.amazonaws.com",
      "lh3.googleusercontent.com",
      "localhost",
      "127.0.0.1",
      "i.pravatar.cc",
    ],
  },
  ...(process.env.FRAMEWORK_PROVIDER === "graphql" && {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: "graphql-let/loader" }],
      });

      config.module.rules.push({
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      });

      return config;
    },
  }),
  ...(process.env.APPLICATION_MODE === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

export default withNextIntl(nextConfig);
