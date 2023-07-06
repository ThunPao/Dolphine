import { vitePreprocess } from '@astrojs/svelte';
// const production = !process.env.ROLLUP_WATCH

export default {
	preprocess: vitePreprocess(),
	// dev: !production,
}
