import {isRef, ref, watch} from 'vue';
import {isFunction} from 'lodash/fp';
import {useTheme} from 'vuetify';

export const usePrimaryColor = color => {
  if (!isRef(color) && !isFunction(color)) {
    throw new Error('color must be a ref or a function');
  }
  const colorValue = isRef(color)
    ? (() => color.value)
    : (() => color());
  const theme = useTheme();
  const currentTheme = ref(theme.current.value.colors);

  watch(() => theme.current.value.colors[colorValue], newColor => {
    // Update currentTheme values when changes are detected
    currentTheme.value = {
      ...currentTheme.value,
      [colorValue]: newColor,
    };
  });
  const colorHex = computed(() => currentTheme.value[colorValue.value]);

  return {
    currentTheme,
    colorHex,
  }
};
