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

// Proxy configuration helper functions
const backendUrl = () => `http://localhost:${process.env.BACKEND_PORT}`;
const backendConf = () => ({
  target: backendUrl(),
  changeOrigin: true,
});
const proxyConf = paths => paths.reduce((acc, path) => ({
  ...acc,
  [path]: backendConf()
}), {});

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
    port: process.env.FRONTEND_PORT || 3000,
    proxy: proxyConf([
      '/health',
      '/admin',
      '/csrf-token',
      '/stock-market',
    ]),
    // Below is needed for Docker and WSL compatibility
    host: true,
    watch: {
      usePolling: true,
    },
  },
})
