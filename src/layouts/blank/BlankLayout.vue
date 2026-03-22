// ===============================|| Blank Layout ||=============================== //
<template>
  <v-locale-provider>
    <v-app
      :theme="theme.global.name.value"
      :class="applicationClass"
    >
      <!-- Loader start -->
      <LoaderWrapper />
      <!-- Loader end -->
      <RouterView />
    </v-app>
  </v-locale-provider>
</template>
<script setup>
import {computed} from 'vue';
import {useTheme} from 'vuetify';
import {RouterView} from 'vue-router';
import LoaderWrapper from '../dashboard/LoaderWrapper.vue';
const theme = useTheme();

const applicationClass = computed(() => [
  theme.global.name.value,
  'FiraSans',
  // 'mini-sidebar'
  'verticalLayout',
]);
</script>
