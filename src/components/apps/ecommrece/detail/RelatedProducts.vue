<script setup>
import {onMounted, computed, ref} from 'vue';
import {useEcomStore} from '@/stores/apps/eCommerce';
import 'vue3-carousel/dist/carousel.css';
import FloatingCart from '../cart/FloatingCart.vue';

// icons
import {HeartOutlined, HeartFilled} from '@ant-design/icons-vue';

const store = useEcomStore();

onMounted(() => {
  store.fetchProducts();
});

const getProducts = computed(() => {
  return store.products;
});

const emit = defineEmits(['handlecart', 'handlewishlist']);
const wishlist = ref([]);
const successSnackbar = ref(false);
const snackbarMessage = ref('');

function toggleWishlist(productId) {
  if (wishlist.value.includes(productId)) {
    wishlist.value = wishlist.value.filter((id) => id !== productId);
    snackbarMessage.value = 'Removed from favourites';
  } else {
    wishlist.value.push(productId);
    snackbarMessage.value = 'Added to favourites';
  }
  emit('handlewishlist', wishlist.value);
  successSnackbar.value = true;
}

function isInWishlist(productId) {
  return wishlist.value.includes(productId);
}
</script>

<template>
  <v-card variant="outlined" class="bg-surface">
    <v-card-item>
      <v-card-title class="text-subtitle-1 pa-0"> Related Products </v-card-title>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <perfect-scrollbar style="height: 265px">
        <v-list class="relatedCar py-0" aria-label="product list" aria-busy="true">
          <v-list-item v-for="(product, i) in getProducts" :value="product.name" class="py-2" :key="i" border>
            <div class="d-flex align-center">
              <v-avatar size="62" rounded color="gray100">
                <img :src="product.image" alt="product" width="62" style="min-width: 62px" />
              </v-avatar>
              <div class="ms-3">
                <h5 class="text-h5 mb-0">{{ product.name }}</h5>
                <p class="text-h6 text-lightText text-truncate mb-1">{{ product.description }}</p>
                <h5 class="text-h5 mb-0">${{ product.salePrice }}</h5>
                <v-rating color="inputBorder" active-color="warning" half-increments size="x-small" :model-value="3.5" density="compact">
                </v-rating>
              </div>
            </div>

            <template #append>
              <v-btn icon variant="text" rounded @click="toggleWishlist(product.id)">
                <HeartFilled v-if="isInWishlist(product.id)" class="text-error" />
                <HeartOutlined v-else class="text-lightText" />
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
      <v-snackbar
        variant="flat"
        location="top right"
        min-width="100"
        color="success"
        rounded="md"
        class="text-surface"
        v-model="successSnackbar"
      >
        <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
        {{ snackbarMessage }}
      </v-snackbar>
    </v-card-text>
  </v-card>

  <FloatingCart />
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
