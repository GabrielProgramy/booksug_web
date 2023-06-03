/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				scrollbar: {
					base: '#C6A6D5',
					thumb: '#40254D',
				},
				brand: {
					100: '#C6A6D5',
					200: '#AA62CC',
					300: '#804999',
					400: '#40254D',
					500: '#473C4D',
					black: '#1E1E1E'
				}
			}
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('tailwind-scrollbar')
	],
}

