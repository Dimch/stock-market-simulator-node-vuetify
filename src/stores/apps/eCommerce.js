import {defineStore} from 'pinia';
import axios from '@/utils/axios';
import {filter, sum} from 'lodash';

export const useEcomStore = defineStore('eCommerce', {
  state: () => ({
    products: [],
    cart: [],
    gender: '',
    category: [],
    price: '',
    subTotal: 0,
    discount: 5,
    total: 0,
    addresses: []
  }),
  getters: {},
  actions: {
    async fetchProducts() {
      try {
        const data = await axios.get('/api/products/list');
        this.products = data.data;
      } catch (error) {
        alert(error);
      }
    },
    async fetchAddress() {
      try {
        const data = await axios.get('/api/address/list');
        this.addresses = data.data;
      } catch (error) {
        alert(error);
      }
    },
    SelectGender(items) {
      this.gender = items;
    },
    SelectCategory(items) {
      this.category = items;
    },
    AddToCart(item) {
      this.cart = [...this.cart, item];
    },
    incrementQty(item, cart) {
      const productId = item.id;
      const updateCart = cart.map((product) => {
        if (product.id === productId) {
          const updatedQty = (product.qty || 0) + 1;
          return {
            ...product,
            qty: updatedQty
          };
        }
        return product;
      });

      this.cart = updateCart;
      this.subTotal = sum(
        this.cart.map((product) => {
          const price = product.salePrice ?? 0;
          return price * (product.qty || 0);
        })
      );

      if (typeof this.subTotal === 'number') {
        this.discount = Math.round(this.subTotal * 0.05);
        this.total = this.subTotal - this.discount;
      } else {
        this.discount = 0;
        this.total = 0;
      }
    },
    decrementQty(item) {
      if (typeof item !== 'number' && typeof item !== 'string') return;

      const productId = item;
      const updateCart = this.cart.map((product) => {
        if (product.id === productId) {
          const newQty = typeof product.qty === 'number' && product.qty - 1 >= 0 ? product.qty - 1 : 0;
          return {
            ...product,
            qty: newQty
          };
        }
        return product;
      });

      this.cart = updateCart;

      this.subTotal =
        sum(
          this.cart.map((product) => {
            if (typeof product.qty === 'number' && typeof product.salePrice === 'number') {
              return product.salePrice * product.qty;
            }
            return 0;
          })
        ) ?? 0;

      this.discount = typeof this.subTotal === 'number' ? Math.round(this.subTotal * 0.05) : 0;
      this.total = typeof this.subTotal === 'number' ? this.subTotal - this.discount : 0;
    },
    deleteCart(itemId) {
      const updateCart = filter(this.cart, (product) => product.id !== itemId);
      this.cart = updateCart;
    },
    getsubTotal() {
      this.subTotal = sum(
        this.cart.map((product) => {
          if (typeof product.salePrice === 'number' && typeof product.qty === 'number') {
            return product.salePrice * product.qty;
          }
          return 0;
        })
      );
    },
    getTotal() {
      if (typeof this.subTotal === 'number' && typeof this.discount === 'number') {
        this.total = this.subTotal - this.discount;
      } else {
        this.total = 0;
      }
    },
    getDiscount() {
      if (typeof this.subTotal === 'number') {
        this.discount = Math.round(this.subTotal * 0.05);
      } else {
        this.discount = 0;
      }
    }
  }
});
