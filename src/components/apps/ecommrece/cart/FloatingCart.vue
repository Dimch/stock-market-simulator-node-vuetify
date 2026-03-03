<script setup>
import {computed} from 'vue';
import {useEcomStore} from '@/stores/apps/eCommerce';

// icons
import {ShoppingCartOutlined} from '@ant-design/icons-vue';

const store = useEcomStore();
const getCart = computed(() => {
  return store.cart;
});
</script>
<template>
  <v-btn color="primary" variant="tonal" large class="cartBtn" to="/ecommerce/checkout">
    <v-badge color="error" :content="getCart?.length" offset-x="-5" offset-y="-5">
      <ShoppingCartOutlined :style="{fontSize: '24px'}" />
    </v-badge>
  </v-btn>
</template>
<style lang="scss">
.cartBtn.v-btn {
  height: 52px;
  position: fixed;
  right: -2px;
  top: 40%;
  z-index: 9;
  border-radius: 25%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  [dir='rtl'] & {
    left: -2px;
    right: unset;
    border-radius: 25%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
