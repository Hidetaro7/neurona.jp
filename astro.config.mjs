import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      nesting: true,
    }),
    vue(),
  ],

  image: {
    service: passthroughImageService(),
  },
  outDir: "./docs",
});
