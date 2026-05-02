import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import axios from 'axios';
import {useCsrfStore} from '@/stores/csrf';

describe('csrf store', () => {
  let getSpy;

  beforeEach(() => {
    setActivePinia(createPinia());
    getSpy = vi.spyOn(axios, 'get');
  });

  it('fetches and stores the csrf token', async () => {
    getSpy.mockResolvedValue({data: {csrfToken: 'csrf-token-123'}});

    const store = useCsrfStore();
    await store.fetchToken();

    expect(getSpy).toHaveBeenCalledWith('/csrf-token');
    expect(store.token).toBe('csrf-token-123');
  });

  it('keeps the current token unchanged when fetching fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchError = new Error('request failed');
    getSpy.mockRejectedValue(fetchError);

    const store = useCsrfStore();
    store.$patch({token: 'existing-token'});

    await store.fetchToken();

    expect(consoleError).toHaveBeenCalledWith('CSRF Token fetch error:', fetchError);
    expect(store.token).toBe('existing-token');
  });
});


