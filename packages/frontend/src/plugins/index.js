/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router';

import {PiniaColada} from '@pinia/colada';
import DataTable from 'vue3-easy-data-table';
import {PerfectScrollbarPlugin} from 'vue3-perfect-scrollbar';
import Vue3Marquee from 'vue3-marquee';
// print
import print from 'vue3-print-nb';
// i18
import {createI18n} from 'vue-i18n';
import messages from '@/utils/locales/messages';
import {vMaska} from 'maska/vue';

export const createAppI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export const createGlobalAppConfig = ({
  router: appRouter = router,
  pinia: appPinia = pinia,
  vuetify: appVuetify = vuetify,
  i18n = createAppI18n(),
} = {}) => ({
  plugins: [
    appPinia,
    PiniaColada,
    appRouter,
    PerfectScrollbarPlugin,
    print,
    Vue3Marquee,
    i18n,
    appVuetify,
  ],
  components: {
    EasyDataTable: DataTable,
  },
  directives: {
    maska: vMaska,
  },
});

export const registerPlugins = (app, options = {}) => {
  const {plugins, components, directives} = createGlobalAppConfig(options);

  for (const plugin of plugins) {
    app.use(plugin);
  }

  for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
  }

  for (const [name, directive] of Object.entries(directives)) {
    app.directive(name, directive);
  }

  return app;
};
