import axios from 'axios';
import rax from 'axios-retry';
import {defaults, get} from 'lodash/fp';
import {useCsrfStore} from '@/stores/csrf.js';

const clients = {};

export const data = get('data');

const isInvalidCsrfError = err => err.response?.status === 419 && err.response?.data === 'invalid csrf token';

const defaultConfig = defaults({api: null, csrf: true});

export const useClient = (baseURL = '', config) => {
  const {api, csrf} = defaultConfig(config);
  let client = clients[baseURL];
  if (client) return client;
  
  const axiosInstance = axios.create({baseURL});
  if (csrf) {
    // set CSRF token for each request
    axiosInstance.interceptors.request.use(async(req) => {
      const csrfStore = useCsrfStore();
      req.headers['x-csrf-token'] = csrfStore.token;
      return req;
    });
    // extract and return data from each response
    rax(axiosInstance, {
      retries: 1,
      retryCondition: isInvalidCsrfError,
      onRetry: async(err) => {
        const csrfStore = useCsrfStore();
        await csrfStore.fetchToken();
      },
    });
  }
  client = api?.(axiosInstance) || axiosInstance;
  clients[baseURL] = client;
  return client;
};
