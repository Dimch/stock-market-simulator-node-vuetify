import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ref} from 'vue';
import {createPinia, setActivePinia} from 'pinia';
import {createRateLimit} from '@/test/factories';
import {UiTitleCardStub, VChipStub} from '@/test/stubs/components';
import {createVDataTableStub} from '@/test/stubs/tables';

const VDataTableStub = createVDataTableStub({
  testId: 'rate-limit-table',
  renderRow: ({h, item, slots}) => h('tr', [
    h('td', item.title),
    h('td', item.description),
    h('td', item.salt),
    h('td', String(item.value)),
    h('td', slots['item.percentage']?.({value: item.percentage})),
    h('td', String(item.max)),
    h('td', item.updatedAt),
  ]),
});

describe('RateLimitList', () => {
  let RateLimitList;
  let mountWithApp;
  let refresh;
  let intervalSpy;

  const rateLimits = [
    createRateLimit({title: 'Low', percentage: 0.4}),
    createRateLimit({title: 'Medium', percentage: 0.5}),
    createRateLimit({title: 'High', percentage: 0.9}),
  ];

  beforeEach(async () => {
    vi.resetModules();
    setActivePinia(createPinia());

    refresh = vi.fn();
    intervalSpy = vi.fn();

    vi.doMock('@/api/adminApi', () => ({
      useRateLimitQuery: () => ({
        data: ref(rateLimits),
        refresh,
      }),
    }));

    vi.doMock('@/helper', () => ({
      useInterval: intervalSpy,
    }));

    ({default: RateLimitList} = await import('@/views/widgets/RateLimitList.vue'));
    ({mountWithApp} = await import('@/test/renderWithApp'));
  }, 30_000);

  it('renders rate-limit rows with threshold-based chip colors and polling', async () => {
    const {wrapper} = await mountWithApp(RateLimitList, {
      mountOptions: {
        global: {
          stubs: {
            UiTitleCard: UiTitleCardStub,
            VChip: VChipStub,
            VDataTable: VDataTableStub,
          },
        },
      },
    });

    expect(wrapper.text()).toContain('Rate Limit Configurations');
    expect(wrapper.text()).toContain('Low');
    expect(wrapper.text()).toContain('Medium');
    expect(wrapper.text()).toContain('High');

    const chips = wrapper.findAll('[data-test="chip"]');
    expect(chips[0].attributes('data-color')).toBe('success');
    expect(chips[0].text()).toBe('40%');
    expect(chips[1].attributes('data-color')).toBe('warning');
    expect(chips[1].text()).toBe('50%');
    expect(chips[2].attributes('data-color')).toBe('error');
    expect(chips[2].text()).toBe('90%');

    expect(intervalSpy).toHaveBeenCalledWith(refresh, 10 * 1000);
  });
});
