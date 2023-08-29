/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
	extend: {
	  },
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		keyframes: {
			wiggle: {
			  '0%, 100%': { transform: 'rotate(-3deg)' },
			  '50%': { transform: 'rotate(3deg)' },
			},
			beat: {
				'0%, 100%': { transform: 'scale(95%)' },
				'50%': { transform: 'scale(100%)' },
			  },
			  animatedgradient: {
				'0%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
				'100%': { backgroundPosition: '0% 50%' },
			  },
		  },
		extend: {
			backgroundSize: {
				'300%': '300%',
			  },
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite',
				beat: 'beat 1s ease-in-out infinite',
				gradient: 'animatedgradient 3s ease infinite alternate',
			  },
			  textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			  },
		},
	},
	plugins: [require("daisyui")
,
plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
	  {
		'text-shadow': (value) => ({
		  textShadow: value,
		}),
	  },
	  { values: theme('textShadow') }
	)
  }),
],
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
          
					"primary": "#0046df",
							 
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
