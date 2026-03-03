<script setup>
import {computed} from 'vue';
import LogoLight from '../shared/LogoLight.vue';
import LogoDark from '../shared/LogoDark.vue';
import {useCustomizerStore} from '@/stores/customizer';

const customizer = useCustomizerStore();

const dark = computed(() => {
  if (customizer.actTheme === 'dark') {
    return true;
  } else {
    return false;
  }
});
</script>
<template>
  <LogoLight v-if="dark" />
  <LogoDark v-else />
</template>
