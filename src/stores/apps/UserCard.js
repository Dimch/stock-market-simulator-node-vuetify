import {defineStore} from 'pinia';
import axios from '@/utils/axios';

export const useUserCardStore = defineStore('userCard', {
  state: () => ({
    cards: [],
    list: [],
    list2: []
  }),
  getters: {},
  actions: {
    async fetchCards() {
      try {
        const response = await axios.get('/api/details-card/list');
        this.cards = response.data;
      } catch (error) {
        alert(error);
      }
    },
    async filterCards(filter) {
      try {
        const response = await axios.post('/api/details-card/filter', {filter});
        this.cards = response.data.results;
      } catch (error) {
        alert(error);
      }
    },
    async fetchlistCards() {
      try {
        const response = await axios.get('/api/avatar-list/s1/list');
        this.list = response.data;
      } catch (error) {
        alert(error);
      }
    },
    async fetchlist2Cards() {
      try {
        const response = await axios.get('/api/avatar-list/s2/list');
        this.list2 = response.data;
      } catch (error) {
        alert(error);
      }
    }
  }
});
