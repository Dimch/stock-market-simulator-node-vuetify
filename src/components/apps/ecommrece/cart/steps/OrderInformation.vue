<script setup>
import {onMounted, computed} from 'vue';
import {useEcomStore} from '@/stores/apps/eCommerce';

// icons
import {DeleteOutlined} from '@ant-design/icons-vue';

const store = useEcomStore();
onMounted(() => {
  store.getsubTotal();
  store.getTotal();
  store.getDiscount();
});

const getCart = computed(() => {
  return store.cart;
});
</script>
<template>
  <v-card variant="outlined" class="my-6 bg-surface">
    <h6 class="text-subtitle-1 pa-4 mb-0">Order Summary</h6>
    <v-divider></v-divider>
    <v-list class="relatedCar py-0" aria-label="order list" aria-busy="true">
      <v-list-item v-for="(item, i) in getCart" :value="i" :key="i" class="py-2" border>
        <div class="d-flex align-center">
          <v-avatar size="50" variant="outlined" color="gray100" rounded class="bg-gray100">
            <img :src="item.image" alt="product" width="50" style="min-width: 50px" />
          </v-avatar>
          <div class="ms-3">
            <h5 class="text-subtitle-1 mb-0">{{ item.name }}</h5>
            <p class="text-h6 text-lightText text-truncate mb-1">{{ item.description }}</p>
            <h5 class="text-h5 mb-0">${{ item.salePrice }}</h5>
          </div>
        </div>

        <template #append>
          <v-btn icon variant="text" rounded>
            <DeleteOutlined class="text-lightText" />
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-table density="compact">
      <tbody>
        <tr>
          <td class="text-h6 text-lightText">Sub Total</td>
          <td class="text-end text-subtitle-1">${{ store.subTotal }}</td>
        </tr>
        <tr>
          <td class="text-h6 text-lightText">Coupon Discount 5%</td>
          <td class="text-end text-subtitle-1">- ${{ store.discount }}</td>
        </tr>
        <tr>
          <td class="text-h6 text-lightText">Shipping Charges</td>
          <td class="text-end text-subtitle-1">-</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-card variant="outlined">
    <v-table>
      <tbody>
        <tr>
          <td class="text-subtitle-1">Total</td>
          <td class="text-end text-subtitle-1">${{ store.total }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<style lang="scss">
.relatedCar {
  .v-list-item {
    .v-list-item__append {
      align-self: flex-start;
    }
    .text-truncate {
      white-space: unset !important;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
