import {describe, expect, it} from 'vitest';
import {defineComponent} from 'vue';
import App from '@/App.vue';
import {mountWithApp} from './renderWithApp';

describe('frontend test foundation', () => {
  it('mounts the app shell with isolated router, pinia, and plugin instances', async () => {
    const HomePage = defineComponent({
      template: '<div data-test="frontend-ready">Frontend tests are ready</div>',
    });

    const {wrapper, router, pinia} = await mountWithApp(App, {
      routes: [
        {
          path: '/',
          component: HomePage,
        },
      ],
      initialRoute: '/',
    });

    expect(router.currentRoute.value.path).toBe('/');
    expect(pinia).toBeTruthy();
    expect(wrapper.find('[data-test="frontend-ready"]').text()).toBe('Frontend tests are ready');
  });
});
