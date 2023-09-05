import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from '@astrojs/vercel/serverless';
// import node from "@astrojs/node";
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],

  // output: 'server',
  // adapter: node({
  //   mode: "hybrid"
  // }),



  // output: 'static',
  // compressHTML: true,
  // // trailingSlash: 'always',
  // build: {
  //   // Example: Generate `page.html` instead of `page/index.html` during build.
  //   format: 'file'
  // },

  // output: 'server',
  //   compressHTML: true,
  // adapter: node({
  //   mode: "standalone"
  // }),

  output: 'server',
  adapter: vercel({
    analytics: true,
    functionPerRoute: false
  }),
  compressHTML: true,
  build: {
    excludeMiddleware: true
  },
});