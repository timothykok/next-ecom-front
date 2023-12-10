/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
	plugins: [require('daisyui')]
};
