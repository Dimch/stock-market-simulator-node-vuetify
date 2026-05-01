import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';

const httpClientMocks = vi.hoisted(() => ({
  axiosCreate: vi.fn(),
  retry: vi.fn(),
}));

describe('http client', () => {
  let axiosInstance;
  let requestInterceptor;
  let retryOptions;
  let resetClients;
  let useClient;
  let useCsrfStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    vi.resetModules();
    requestInterceptor = null;
    retryOptions = null;
    httpClientMocks.axiosCreate.mockReset();
    httpClientMocks.retry.mockReset();

    axiosInstance = {
      interceptors: {
        request: {
          use: vi.fn((handler) => {
            requestInterceptor = handler;
          }),
        },
      },
    };

    httpClientMocks.axiosCreate.mockReturnValue(axiosInstance);
    httpClientMocks.retry.mockImplementation((instance, options) => {
      retryOptions = options;
      return instance;
    });

    vi.doMock('axios', () => ({
      default: {
        create: httpClientMocks.axiosCreate,
      },
    }));

    vi.doMock('axios-retry', () => ({
      default: httpClientMocks.retry,
    }));

    ({useCsrfStore} = await import('@/stores/csrf'));
    ({resetClients, useClient} = await import('@/api/httpClient'));
    resetClients();
  });

  it('adds the csrf token header to outgoing requests', async () => {
    const csrfStore = useCsrfStore();
    csrfStore.$patch({token: 'csrf-token-123'});

    const client = useClient('/admin');
    const request = await requestInterceptor({headers: {}});

    expect(client).toBe(axiosInstance);
    expect(httpClientMocks.axiosCreate).toHaveBeenCalledWith({baseURL: '/admin'});
    expect(request.headers['x-csrf-token']).toBe('csrf-token-123');
    expect(httpClientMocks.retry).toHaveBeenCalledTimes(1);
    expect(retryOptions.retries).toBe(1);
  });

  it('refreshes the csrf token when the retry handler runs after a 419 response', async () => {
    const csrfStore = useCsrfStore();
    const fetchToken = vi.spyOn(csrfStore, 'fetchToken').mockResolvedValue(undefined);

    useClient('/admin');

    expect(retryOptions.retryCondition({response: {status: 419, data: 'invalid csrf token'}})).toBe(true);
    expect(retryOptions.retryCondition({response: {status: 500, data: 'boom'}})).toBe(false);

    await retryOptions.onRetry();
    expect(fetchToken).toHaveBeenCalledTimes(1);
  });

  it('skips csrf wiring when the client is configured without csrf support', () => {
    const client = useClient('/health', {csrf: false});

    expect(client).toBe(axiosInstance);
    expect(axiosInstance.interceptors.request.use).not.toHaveBeenCalled();
    expect(httpClientMocks.retry).not.toHaveBeenCalled();
  });

  it('reuses clients for the same base URL', () => {
    const firstClient = useClient('/stock-market');
    const secondClient = useClient('/stock-market');

    expect(firstClient).toBe(secondClient);
    expect(httpClientMocks.axiosCreate).toHaveBeenCalledTimes(1);
  });

  it('applies API wrappers around the axios instance', () => {
    const wrappedClient = {getStocks: vi.fn()};
    const api = vi.fn(() => wrappedClient);

    const client = useClient('/admin', {api});

    expect(api).toHaveBeenCalledWith(axiosInstance);
    expect(client).toBe(wrappedClient);
  });
});




