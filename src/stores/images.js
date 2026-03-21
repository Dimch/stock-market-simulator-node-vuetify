import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useTheme} from 'vuetify';
import {sample} from 'lodash/fp';

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


export const useImageStore = defineStore('images', () => {
  const theme = useTheme();
  const currentTheme = computed(() => theme.global.name.value);
  const oneOf = themeConf => computed(() => sample(themeConf[currentTheme.value]));
  const bgConstructionImage = oneOf(constructionImages);
  const bgLoginImage = oneOf(loginImages);
  const bgLandingImage = oneOf(landingImages);
  const bg404Image = oneOf(error404Images);
  const bg500Image = oneOf(error404Images);
  
  return {
    currentTheme,
    bgConstructionImage,
    bgLoginImage,
    bgLandingImage,
    bg404Image,
    bg500Image,
  };
});
