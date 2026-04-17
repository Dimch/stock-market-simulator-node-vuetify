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
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export const registerPlugins = app => app
  .use(pinia)
  .use(PiniaColada)
  .use(router)
  .component('EasyDataTable', DataTable)
  .use(PerfectScrollbarPlugin)
  .use(print)
  .use(Vue3Marquee)
  .use(i18n)
  .directive('maska', vMaska)
  .use(vuetify);
