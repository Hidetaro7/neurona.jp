import fg from "fast-glob";
import { basename, dirname } from "path";
import Image from "@11ty/eleventy-img";

const optimizeImages = async () => {
  const images = await fg(["src/**/*.{jpeg,jpg,png,webp,gif,tiff,avif,svg}"], {
    ignore: ["docs", "**/node_modules"],
  });
  for (const image of images) {
    await Image(image, {
      filenameFormat: () => basename(image),
      formats: [null],
      sharpOptions: {
        animated: true,
      },
      outputDir: dirname(image).replace(/^src/, "dist"),
    });
  }
};

export default (eleventyConfig) => {
  /* if (process.env.NODE_ENV === "production") {
    eleventyConfig.addPlugin(CacheBuster({ outputDirectory: "docs" }));
  } */
  eleventyConfig.addFilter("formatDate", (date) =>
    date.toLocaleDateString("ja-JP")
  );
  eleventyConfig.addFilter("markdown", function (value) {
    let markdown = require("markdown-it")({
      html: true,
    });
    return markdown.render(value);
  });
  eleventyConfig.addPassthroughCopy("src/**/*.{js,mp4,mp3,webm,webmanifest}");
  eleventyConfig.addPassthroughCopy("src/download/");
  eleventyConfig.addPassthroughCopy("CNAME");
  // NOTE: live reload not working when use postcss-cli directly
  eleventyConfig.setBrowserSyncConfig({ files: ["docs/style"] });
  eleventyConfig.addShortcode(
    "metadataFormat",
    function (primaryData, altData) {
      return !primaryData ? altData : primaryData;
    }
  );
  eleventyConfig.on("beforeBuild", optimizeImages);
  return {
    dir: {
      input: "src",
      output: "docs",
      data: "_data",
    },
    jsDataFileSuffix: ".data",
  };
};
