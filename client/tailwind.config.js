/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				'primary': "#00A3DC",
				'white': "#f8fafc",
				'gray': "#e2e8f0",
			}
		},
	},
	plugins: [],
}

