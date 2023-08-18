/** @type {import('tailwindcss').Config} */
module.exports = {
	extend: {
	  },
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			
			"light",
			"dark",
			// "cupcake",
			// "bumblebee",
			// "emerald",
			// "corporate",
			// "synthwave",
			// "retro",
			// "cyberpunk",
			// "valentine",
			// "halloween",
			// "garden",
			// "forest",
			// "aqua",
			// "lofi",
			// "pastel",
			// "fantasy",
			// "wireframe",
			// "black",
			// "luxury",
			// "dracula",
			// "cmyk",
			// "autumn",
			// "business",
			// "acid",
			// "lemonade",
			// "night",
			// "coffee",
			// "winter",
			"kpz",
			{
				kpz: {
          
					"primary": "#3574ff",
							 
					"secondary": "#f000b8",
							 
					"accent": "#fca5a5",
							 
					"neutral": "#2a323c",
							 
					"base-100": "#1f2937",
							 
					"info": "#7dd3fc",
							 
					"success": "#36d399",
							 
					"warning": "#fbbf24",
							 
					"error": "#dc2828",

					".modal-box": {
						"color": "#FFFFFF",
					  },
					  ".btn-success": {
						"color": "#FFFFFF",
					  },
					// ".hero-overlay": {
					// 	"background-color": "hsl(208, 15%, 24% / var(--tw-bg-opacity))",

					// }
							 },
			},

		  ],
	  },
	  darkMode: ['class', '[data-theme="kpz"]']
}
