import path from "path";
import glob from "glob-all";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import purgecssFromTsx from "@fullhuman/purgecss-from-tsx";

function isProd() {
  return process.env.NODE_ENV === "production";
}

const safeClasses = ["wallpapers-list-header masonry-col"].flatMap((classes) =>
  classes.split(" ")
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }].concat(
      isProd() ? [] : [{ hostname: "localhost" }, { hostname: "127.0.0.1" }]
    ),
  },
  webpack(/** @type {import('webpack').Configuration} */ config) {
    config.optimization = config.optimization || {};
    config.plugins = config.plugins || [];

    if (isProd()) {
      config.plugins.push(
        new PurgeCSSPlugin({
          paths: glob.sync(`${path.resolve(`./src`)}/**/*`, { nodir: true }),
          extractors: [
            { extractor: purgecssFromTsx(), extensions: ["tsx", "jsx"] },
          ],
          safelist: ["img"].concat(safeClasses),
        })
      );
      config.optimization.minimize = true;
    }

    return config;
  },
};

if (isProd()) {
  nextConfig.swcMinify = true;
  nextConfig.compress = true;
}

export default nextConfig;
