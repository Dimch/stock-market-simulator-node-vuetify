import {mount} from '@vue/test-utils';
import {createMemoryHistory, createRouter} from 'vue-router';
import {createGlobalAppConfig} from '@/plugins';
import {createAppVuetify} from '@/plugins/vuetify';
import {createAppPinia} from '@/stores';

const DefaultRouteComponent = {
  template: '<div />',
};

export const createTestRouter = ({
  routes = [{path: '/', component: DefaultRouteComponent}],
  initialRoute = '/',
} = {}) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });

  return {router, initialRoute};
};

const mergeGlobalConfig = (base, overrides = {}) => ({
  ...base,
  ...overrides,
  plugins: [...(base.plugins || []), ...(overrides.plugins || [])],
  components: {
    ...(base.components ?? {}),
    ...(overrides.components ?? {}),
  },
  directives: {
    ...(base.directives ?? {}),
    ...(overrides.directives ?? {}),
  },
  stubs: {
    ...(base.stubs ?? {}),
    ...(overrides.stubs ?? {}),
  },
  mocks: {
    ...(base.mocks ?? {}),
    ...(overrides.mocks ?? {}),
  },
  provide: {
    ...(base.provide ?? {}),
    ...(overrides.provide ?? {}),
  },
});

export const createTestAppContext = async ({
  router,
  pinia,
  routes,
  initialRoute,
  vuetify,
  global,
} = {}) => {
  const testRouter = router || createTestRouter({routes, initialRoute}).router;
  const resolvedInitialRoute = initialRoute ?? '/';
  const testPinia = pinia || createAppPinia(testRouter);
  const testVuetify = vuetify || createAppVuetify();

  await testRouter.push(resolvedInitialRoute);
  await testRouter.isReady();

  const baseGlobal = createGlobalAppConfig({
    router: testRouter,
    pinia: testPinia,
    vuetify: testVuetify,
  });

  return {
    router: testRouter,
    pinia: testPinia,
    vuetify: testVuetify,
    global: mergeGlobalConfig(baseGlobal, global),
  };
};

export const mountWithApp = async (component, options = {}) => {
  const {mountOptions = {}, ...contextOptions} = options;
  const context = await createTestAppContext(contextOptions);
  const global = mergeGlobalConfig(context.global, mountOptions.global);
  const wrapper = mount(component, {
    ...mountOptions,
    global,
  });

  return {
    wrapper,
    ...context,
  };
};
