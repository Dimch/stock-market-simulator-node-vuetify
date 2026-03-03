// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts-next';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'vue-router/vite';
import {VueRouterAutoImports} from 'vue-router/unplugin';
import Vuetify, {transformAssetUrls} from 'vite-plugin-vuetify';

// Utilities
import {defineConfig} from 'vite';
import {fileURLToPath, URL} from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Layouts(),
    Vue({
      template: {transformAssetUrls},
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    Fonts({
      fontsource: {
        families: [
          'Fira Sans',
          'Barlow',
          'Open Sans',
          'Roboto',
        ],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
    ],
    entries: ['./src/**/*.vue'],
  },
  define: {'process.env': { }},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/health': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/csrf-token': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/stock-market': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
