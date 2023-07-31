import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from '@astrojs/vercel/serverless';
import node from "@astrojs/node";
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],

  output: 'server',
  adapter: node({
    mode: "hybrid"
  }),


  // output: 'server',
  // adapter: node({
  //   mode: "standalone"
  // })


  // adapter: vercel(),
  // compressHTML: true,
  // build: {
  //   excludeMiddleware: true
  // }
  experimental: {
    viewTransitions: true,
  },
});