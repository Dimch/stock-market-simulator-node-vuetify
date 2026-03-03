import axios from 'axios';
import {defineStore} from 'pinia';

export const useCsrfStore = defineStore('csrf', () => {
  const token = ref(null);

  const fetchToken = async () => {
    try {
      const {data} = await axios.get('/csrf-token');
      token.value = data.csrfToken;
    } catch (err) {
      console.error('CSRF Token fetch error:', err);
    }
  };

  return {
    token,
    fetchToken,
  };
});
