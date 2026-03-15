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

export const useImageStore = defineStore('images', () => {
  const theme = useTheme();
  const bgConstructionImage = computed(() => sample(constructionImages[theme.global.name.value]));

  return {
    bgConstructionImage,
  };
});
