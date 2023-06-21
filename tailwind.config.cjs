/** @type {import('tailwindcss').Config} */
module.exports = {
	extend: {
		animation: {
		  marquee: 'marquee 25s linear infinite',
		},
		keyframes: {
		  marquee: {
			'0%': { transform: 'translateX(0%)' },
			'100%': { transform: 'translateX(-100%)' },
		  }
		},
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
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"black",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
			"kpz",
			{
				kpz: {
          
					"primary": "#2563eb",
							 
					"secondary": "#f000b8",
							 
					"accent": "#fca5a5",
							 
					"neutral": "#6b7280",
							 
					"base-100": "#1f2937",
							 
					"info": "#7dd3fc",
							 
					"success": "#36d399",
							 
					"warning": "#fbbf24",
							 
					"error": "#e11d48",
							 },
			},
		  ],
	  },
}
