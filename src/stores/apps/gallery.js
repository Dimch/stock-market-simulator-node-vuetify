import {defineStore} from 'pinia';
import axios from '@/utils/axios';

export const useGalleryStore = defineStore('Gallery', {
  state: () => ({
    gallery: []
  }),
  getters: {},
  actions: {
    async fetchGallery() {
      try {
        const response = await axios.get('/api/gallery/list');
        this.gallery = response.data.gallery;
      } catch (error) {
        alert(error);
      }
    }
  }
});
