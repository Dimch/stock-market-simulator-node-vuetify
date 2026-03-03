<script setup>
import {computed} from 'vue';
import {useEcomStore} from '@/stores/apps/eCommerce';

// icons
import {MinusOutlined, PlusOutlined, DeleteOutlined, LeftOutlined} from '@ant-design/icons-vue';

const store = useEcomStore();
const cart = computed(() => store.cart);
</script>
<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card variant="outlined" class="bg-surface">
          <v-card-item class="pa-0">
            <div>
              <h5 class="text-h5 ma-4">
                Cart
                <v-chip color="secondary" class="ms-1" size="small">{{ cart.length }}</v-chip>
              </h5>
              <v-divider />
              <v-table density="compact" hover class="bordered-table">
                <tbody>
                  <tr v-for="item in cart" :key="item.name">
                    <td>
                      <div class="d-flex align-center my-3 ga-2">
                        <img alt="product" class="rounded-md custom-img-box" :src="item.image" />
                        <div class="ma-2">
                          <h6 class="text-subtitle-1 mb-0">{{ item.name }}</h6>
                          <small class="text-h6 text-lightText">Yellow</small>
                        </div>
                      </div>
                    </td>
                    <td class="text-h5">${{ item.salePrice * item.qty }}</td>
                    <td>
                      <v-btn-toggle variant="outlined" divided color="primary">
                        <v-btn
                          size="small"
                          color="primary"
                          style="min-width: unset"
                          variant="text"
                          @click="store.decrementQty(item.id)"
                          :disabled="item.qty < 2"
                        >
                          <MinusOutlined :style="{fontSize: '14px'}" :class="item.qty < 2 ? '' : 'text-primary'" />
                        </v-btn>

                        <v-btn size="small" variant="outlined" color="secondary">
                          {{ item.qty }}
                        </v-btn>

                        <v-btn size="small" color="primary" style="min-width: unset" variant="text" @click="store.incrementQty(item, cart)">
                          <PlusOutlined :style="{fontSize: '14px'}" class="text-primary" />
                        </v-btn>
                      </v-btn-toggle>
                    </td>
                    <td class="text-end">
                      <v-btn small icon flat color="primary" variant="text" rounded
                        ><DeleteOutlined class="text-lightPrimary" @click="store.deleteCart(item.id)"
                      /></v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card-item>
        </v-card>
        <div class="text-end mt-3">
          <v-btn variant="text" to="/ecommerce/products">
            <LeftOutlined class="text-lightText me-1" />
            Back to shopping
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style>
.custom-img-box {
  width: 50px;
  height: 50px;
  background: rgb(var(--v-theme-gray100));
  border: 1px solid rgb(var(--v-theme-borderLight));
}
</style>
