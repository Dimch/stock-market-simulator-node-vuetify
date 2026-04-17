import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {useTheme} from 'vuetify';
import {sample} from 'lodash/fp';

// Banner images
import img1 from '@/assets/images/landing/banner-img-1.jpg';
import img2 from '@/assets/images/landing/banner-img-2.jpg';

const constructionImages = {
  light: [
    'bg-construction-image-1',
    'bg-construction-image-2',
  ],
  dark: [
    'bg-construction-image-1-dark',
  ],
};

const loginImages = {
  light: [
    'bg-login-image-1',
  ],
  dark: [
    'bg-login-image-1-dark',
  ],
};

const landingImages = {
  light: [
    'bg-landing-image-1',
    'bg-landing-image-2',
    'bg-landing-image-3',
    'bg-landing-image-4',
  ],
  dark: [
    'bg-landing-image-1-dark',
    'bg-landing-image-2-dark',
    'bg-landing-image-3-dark',
  ],
};

const error404Images = {
  light: [
    'bg-404-image-1',
  ],
  dark: [
    'bg-404-image-1-dark',
  ],
};

const routeToImageMap = {
  '/': landingImages,
  '/construction': constructionImages,
  '/login': loginImages,
  '/404': error404Images,
  '/500': error404Images,
};
const bannerImages = [img1, img2];

export const useImageStore = defineStore('images', () => {
  const theme = useTheme();
  const route = useRoute();
  const currentTheme = computed(() => theme.global.name.value);
  const bgImageClass = computed(() => sample(routeToImageMap[route?.path]?.[currentTheme.value]));
  const bannerImage = computed(() => sample(bannerImages));

  return {
    currentTheme,
    bgImageClass,
    bannerImage,
  };
});
