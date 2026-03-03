import {defineStore} from 'pinia';
import axios from '@/utils/axios';

export const useCustomers = defineStore('customers', {
  state: () => ({
    customers: [],
    orders: [],
    products: [],
    productreviews: []
  }),
  getters: {
    getCustomers(state) {
      return state.customers;
    },
    getOrders(state) {
      return state.orders;
    },
    getProducts(state) {
      return state.products;
    },
    getProductsreviews(state) {
      return state.productreviews;
    }
  },
  actions: {
    async fetchCustomers() {
      try {
        const data = await axios.get('/api/data/customers');
        this.customers = data.data;
      } catch (error) {
        alert(error);
      }
    },
    async fetchOrders() {
      try {
        const data = await axios.get('/api/data/orders');
        this.orders = data.data;
      } catch (error) {
        alert(error);
      }
    },
    async fetchProducts() {
      try {
        const data = await axios.get('/api/data/products');
        this.products = data.data;
      } catch (error) {
        alert(error);
      }
    },
    async fetchReviews() {
      try {
        const data = await axios.get('/api/data/productreviews');
        this.productreviews = data.data;
      } catch (error) {
        alert(error);
      }
    },
    deleteCustomer(itemId) {
      this.customers = this.customers.filter((object) => object.name !== itemId);
    },
    deleteOrder(itemId) {
      this.orders = this.orders.filter((object) => object.id !== itemId);
    }
  }
});
