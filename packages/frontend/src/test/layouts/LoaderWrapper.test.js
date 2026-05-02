import {describe, expect, it} from 'vitest';
import {nextTick} from 'vue';
import LoaderWrapper from '@/layouts/dashboard/LoaderWrapper.vue';
import {useUIStore} from '@/stores/ui';
import {mountWithApp} from '@/test/renderWithApp';

describe('LoaderWrapper', () => {
  it('is hidden by default and becomes visible when the UI store enters the loading state', async () => {
    const {wrapper, pinia} = await mountWithApp(LoaderWrapper);
    const uiStore = useUIStore(pinia);

    expect(wrapper.classes()).toContain('page-loader');
    expect(wrapper.classes()).toContain('hidden');
    expect(wrapper.classes()).not.toContain('loading');

    uiStore.isLoading = true;
    await nextTick();

    expect(wrapper.classes()).toContain('page-loader');
    expect(wrapper.classes()).toContain('loading');
    expect(wrapper.classes()).not.toContain('hidden');
  });
});
