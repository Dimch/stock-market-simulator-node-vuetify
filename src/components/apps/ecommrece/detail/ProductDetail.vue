<script setup>
import {ref, onMounted, computed} from 'vue';
import {useEcomStore} from '@/stores/apps/eCommerce';
import {useRoute} from 'vue-router';
import ProductCarousel from './ProductCarousel.vue';

// icons
import {UpOutlined, DownOutlined} from '@ant-design/icons-vue';

const store = useEcomStore();
const route = useRoute();
const setColor = ref(1);
onMounted(() => {
  store.fetchProducts();
});

const getProduct = computed(() => {
  return store.products[route.params.id - 1];
});
function selectColor(e) {
  setColor.value = e;
}
</script>
<template>
  <div v-if="getProduct">
    <v-row>
      <v-col md="6" sm="12" cols="12">
        <ProductCarousel />
      </v-col>
      <v-col md="6" sm="12" cols="12">
        <div class="d-flex align-top">
          <div>
            <div class="text-medium-emphasis align-center d-flex mb-1 ga-2">
              <v-rating color="inputBorder" active-color="warning" half-increments v-model="getProduct.rating" density="compact">
              </v-rating>
              <small>({{ getProduct.rating }}+)</small>
            </div>
            <h3 class="text-h3 mb-3">{{ getProduct.name }} <v-chip color="info" variant="outlined" size="small"> New</v-chip></h3>
            <v-chip color="success" size="small" label v-if="getProduct.isStock"> In Stock </v-chip>
            <v-chip color="error" size="small" label v-else> Out of Stock </v-chip>
          </div>
        </div>
        <p class="v-col-lg-10 px-0 mb-0 text-h6 text-lightText">{{ getProduct.description }}</p>
        <v-row>
          <v-col lg="12" cols="12">
            <table class="productCustomize">
              <tbody>
                <tr>
                  <td class="text-lightText ps-0">Colors</td>
                  <td>
                    <template v-for="(color, i) in getProduct.colors" :key="i">
                      <v-avatar @click="selectColor(i)" variant="flat" :color="color" size="x-small" class="me-1 cursor-pointer">
                        <template v-if="setColor == i">
                          <CheckIcon size="13" />
                        </template>
                      </v-avatar>
                    </template>
                  </td>
                </tr>
                <tr>
                  <td class="text-lightText ps-0">Quantity</td>
                  <td>
                    <v-btn-toggle variant="outlined" size="small" divided color="primary">
                      <v-btn size="small" style="width: 70px">
                        {{ getProduct.qty }}
                      </v-btn>
                      <div style="width: 25px" class="qty-icons">
                        <v-btn block icon color="secondary" class="py-1" @click="store.incrementQty(getProduct, store.cart)">
                          <UpOutlined :style="{fontSize: '13px'}" />
                        </v-btn>
                        <v-btn block icon color="secondary" class="py-1" @click="store.decrementQty(getProduct.id)">
                          <DownOutlined :style="{fontSize: '13px'}" />
                        </v-btn>
                      </div>
                    </v-btn-toggle>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex align-end ga-2 mb-3">
              <h3 class="text-h3 mb-n1">${{ getProduct.salePrice }}</h3>
              <p class="text-decoration-line-through text-medium-emphasis mb-0">${{ getProduct.offerPrice }}</p>
              <small class="text-medium-emphasis">(Inclusive of all taxes)</small>
            </div>
          </v-col>
          <v-col lg="6">
            <v-btn block color="primary" size="large" variant="flat" to="/ecommerce/checkout" @click="store.AddToCart(getProduct)"
              >Buy Now</v-btn
            >
          </v-col>
          <v-col lg="6">
            <v-btn block color="secondary" size="large" variant="outlined" @click="store.AddToCart(getProduct)">Add To Cart</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss">
.productCustomize tr td {
  padding: 15px 20px;
  vertical-align: center;
}
.qty-icons {
  .v-btn {
    border: 1px solid rgb(var(--v-border-color));
    height: 24px !important;
  }
}
</style>
