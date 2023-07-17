import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from '@astrojs/vercel/serverless';
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: 'server',
  // adapter: vercel(),
  adapter: node({
    mode: "standalone"
  })

  // compressHTML: true,
  // build: {
  //   excludeMiddleware: true
  // }
});