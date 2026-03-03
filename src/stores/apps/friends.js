import {defineStore} from 'pinia';
import axios from '@/utils/axios';

export const useFrinedsStore = defineStore('Frineds', {
  state: () => ({
    friends: []
  }),
  getters: {},
  actions: {
    async fetchFrineds() {
      try {
        const response = await axios.get('/api/friends/list');
        this.friends = response.data.friends;
      } catch (error) {
        alert(error);
      }
    }
  }
});
