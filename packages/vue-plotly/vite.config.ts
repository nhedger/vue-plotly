import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            name: 'vue-plotly',
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: (format) => `vue-plotly.${format}.js`,
        },
        rollupOptions: {
            external: ['vue', 'plotly.js-dist'],
            output: {
                globals: {
                    'vue': 'Vue',
                    'plotly.js-dist': 'Plotly',
                },
            },
        },
    },
    plugins: [vue()],
});
