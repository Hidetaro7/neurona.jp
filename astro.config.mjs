import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://neurona.jp',
  output: 'static',
  srcDir: './src',
  publicDir: './src/public',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
  ],
  outDir: './dist',
  image: {
    // Configure image optimization
    formats: ['webp'],
    quality: 80,
  },
});
