import path from "path";
import glob from "glob-all";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import purgecssFromTsx from "@fullhuman/purgecss-from-tsx";

function isProd() {
  return process.env.NODE_ENV === "production";
}

const safeClasses = [
  "wallpapers-list-header masonry-col",
  "autofill:!bg-black dark:peer-focus:text-primary dark:placeholder:text-current",
  "dark:text-white duration-200 ease-linear focus:placeholder:opacity-100 leading-[1.6]",
  "motion-reduce:transition-none outline-none peer peer-focus:text-primary placeholder:italic",
  "placeholder:opacity-70 placeholder:text-current transition-all w-full",
  "border-neutral-500 dark\:border-neutral-400 pr-0 py-0 p-2.5 mr-1",
].flatMap((classes) => classes.split(" "));

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
          paths: glob.sync(`${path.resolve(`./`)}/**/*.{tsx,jsx}`, {
            nodir: true,
          }),
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
