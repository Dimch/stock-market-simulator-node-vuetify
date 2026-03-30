<script setup>
import {computed} from 'vue';
import {useTheme} from 'vuetify';
import CoolSwitch from './CoolSwitch.vue';

const theme = useTheme();
const isDark = computed(() => theme.current.value.dark);

const switchTitle = computed(() => (isDark.value ? 'Switch to light theme' : 'Switch to dark theme'));
</script>

<template>
  <cool-switch :title="switchTitle" class="theme-mode-switch" :aria-checked="isDark"
               @click="theme.toggle()">
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </cool-switch>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .theme-mode-switch :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
