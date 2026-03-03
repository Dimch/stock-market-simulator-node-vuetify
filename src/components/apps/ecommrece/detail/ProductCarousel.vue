<script setup>
import {ref, computed} from 'vue';
import {useEcomStore} from '@/stores/apps/eCommerce';
import {useRoute} from 'vue-router';
import {Carousel, Slide, Navigation} from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import product1 from '@/assets/images/e-commerce/prod-1.png';
import product2 from '@/assets/images/e-commerce/prod-2.png';
import product3 from '@/assets/images/e-commerce/prod-3.png';
import product4 from '@/assets/images/e-commerce/prod-4.png';
import product5 from '@/assets/images/e-commerce/prod-5.png';
import product6 from '@/assets/images/e-commerce/prod-6.png';

// icons
import {HeartOutlined, HeartFilled} from '@ant-design/icons-vue';

const store = useEcomStore();
const route = useRoute();

const getDetailImage = computed(() => {
  return store.products[route.params.id - 1].image;
});

const slideShow = [
  {
    image: getDetailImage.value,
    id: 1
  },
  {
    image: product1,
    id: 2
  },
  {
    image: product2,
    id: 3
  },
  {
    image: product3,
    id: 4
  },
  {
    image: product4,
    id: 5
  },
  {
    image: product5,
    id: 6
  },
  {
    image: product6,
    id: 7
  }
];

const currentSlide = ref(2);
function slideTo(val) {
  currentSlide.value = val;
}
const wishlist = ref([]); // Wishlist state

function toggleWishlist(productId) {
  if (wishlist.value.includes(productId)) {
    wishlist.value = wishlist.value.filter((id) => id !== productId); // Remove from wishlist
  } else {
    wishlist.value.push(productId); // Add to wishlist
  }
}

function isInWishlist(productId) {
  return wishlist.value.includes(productId); // Check if product is in wishlist
}
</script>

<template>
  <div>
    <Carousel
      id="gallery"
      class="bg-gray100 rounded-md mb-4"
      aria-hidden="true"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
      <Slide v-for="(slide, i) in slideShow" :key="i">
        <div class="carousel__item" aria-hidden="true">
          <img alt="product" :src="slide.image" class="w-100 rounded-md" />
          <button class="wishlistIcon" @click="toggleWishlist(slide.id)">
            <HeartFilled :style="{fontSize: '18px'}" v-if="isInWishlist(slide.id)" class="text-error" />
            <HeartOutlined :style="{fontSize: '18px'}" v-else class="text-lightText" />
          </button>
        </div>
      </Slide>
    </Carousel>

    <Carousel
      id="thumbnails"
      :currentSlide="currentSlide"
      :transition="500"
      :items-to-show="6"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="(slide, i) in slideShow" :key="i">
        <div class="carousel__item cursor-pointer" @click="slideTo(slide.id - 1)">
          <v-card variant="outlined">
            <img alt="product" :src="slide.image" class="w-100" />
          </v-card>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<style lang="scss">
#thumbnails {
  .carousel__slide {
    border: 2px solid transparent;
    line-height: 0px;
    margin-inline: 6px;
    border-radius: 4px;
  }
  .carousel__slide--active {
    border: 2px solid rgb(var(--v-theme-primary));
  }
}
.wishlistIcon {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
