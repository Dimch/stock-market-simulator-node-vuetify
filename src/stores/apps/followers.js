import {defineStore} from 'pinia';
import axios from '@/utils/axios';

export const useFollowersStore = defineStore('followers', {
  state: () => ({
    followers: []
  }),
  getters: {},
  actions: {
    async fetchFollowers() {
      try {
        const response = await axios.get('/api/followers/list');
        this.followers = response.data.followers;
      } catch (error) {
        alert(error);
      }
    }
  }
});
