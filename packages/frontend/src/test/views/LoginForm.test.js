import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {defineComponent, h, nextTick, ref} from 'vue';
import {flushPromises} from '@vue/test-utils';
import LoginForm from '@/views/authentication/LoginForm.vue';
import {mountWithApp} from '@/test/renderWithApp';

const EMAIL_INPUT_SELECTOR = 'input[aria-label="email"]';
const PASSWORD_INPUT_SELECTOR = 'input[aria-label="password"]';
const FORM_SELECTOR = 'form';
const PASSWORD_TOGGLE_SELECTOR = '.v-icon';

const mountLoginForm = () => mountWithApp(LoginForm, {
  routes: [
    {
      path: '/',
      component: {template: '<div />'},
    },
    {
      path: '/register',
      component: {template: '<div />'},
    },
  ],
});

const loginFormStoreMocks = vi.hoisted(() => ({
  authStore: {
    login: vi.fn(),
  },
}));

vi.mock('@/stores/auth', () => ({
  useAdminAuthStore: () => loginFormStoreMocks.authStore,
}));

vi.mock('vee-validate', () => ({
  Form: defineComponent({
    name: 'MockVeeForm',
    inheritAttrs: false,
    setup(_, {attrs, slots}) {
      const errors = ref({});
      const isSubmitting = ref(false);

      const setErrors = (value) => {
        errors.value = {...errors.value, ...value};
      };

      const submit = async (event) => {
        event.preventDefault();
        isSubmitting.value = true;
        await attrs.onSubmit?.({}, {setErrors});
        isSubmitting.value = false;
      };

      return () => h('form', {
        class: attrs.class,
        onSubmit: submit,
      }, slots.default?.({
        errors: errors.value,
        isSubmitting: isSubmitting.value,
      }));
    },
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    loginFormStoreMocks.authStore.login.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('trims the username before submitting credentials to the auth store', async () => {
    loginFormStoreMocks.authStore.login.mockResolvedValue(undefined);

    const {wrapper} = await mountLoginForm();

    await wrapper.find(`${EMAIL_INPUT_SELECTOR}`).setValue(' admin@example.com ');
    await wrapper.find(`${PASSWORD_INPUT_SELECTOR}`).setValue('password');
    await wrapper.find(`${FORM_SELECTOR}`).trigger('submit');
    await flushPromises();

    expect(loginFormStoreMocks.authStore.login).toHaveBeenCalledWith('admin@example.com', 'password');
  });

  it('renders the API error when login fails', async () => {
    loginFormStoreMocks.authStore.login.mockRejectedValue('Invalid username or password');

    const {wrapper} = await mountLoginForm();

    await wrapper.find(`${FORM_SELECTOR}`).trigger('submit');
    await flushPromises();

    expect(loginFormStoreMocks.authStore.login).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('Invalid username or password');
  });

  it('toggles the password field visibility', async () => {
    const {wrapper} = await mountLoginForm();

    expect(wrapper.find(`${PASSWORD_INPUT_SELECTOR}`).attributes('type')).toBe('password');

    await wrapper.find(`${PASSWORD_TOGGLE_SELECTOR}`).trigger('click');
    await nextTick();

    expect(wrapper.find(`${PASSWORD_INPUT_SELECTOR}`).attributes('type')).toBe('text');
  });
});
