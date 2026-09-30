// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.jumptrackerpro.com',
	integrations: [
		starlight({
			title: 'JumpTracker Pro Help',
			logo: { src: './src/assets/logo.svg', alt: 'JumpTracker Pro' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			description: 'Guides and case studies for JumpTracker Pro.',
			// Each section autogenerates from its folder in src/content/docs/.
			// To add a topic, drop a .md file in the folder; no config change needed.
			sidebar: [
				{ label: 'Start Here', items: [{ autogenerate: { directory: 'start' } }] },
				{ label: 'Technical Guides', items: [{ autogenerate: { directory: 'technical' } }] },
				{ label: 'Case Studies', items: [{ autogenerate: { directory: 'case-studies' } }] },
			],
		}),
	],
});
