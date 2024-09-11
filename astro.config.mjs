// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), icon()],
    site: 'https://akazad13.github.io',
    base: '',
});