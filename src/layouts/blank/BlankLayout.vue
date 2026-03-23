<template>
  <v-locale-provider>
    <loader-wrapper />
    <v-layout :class="['bg-container', img.bgImageClass]">
      <app-toolbar />
      <v-main class="">
        <router-view />
      </v-main>
    </v-layout> 
  </v-locale-provider>
</template>

<script setup>
import {RouterView} from 'vue-router';
import AppToolbar from './AppBarMenu.vue';
import LoaderWrapper from '../dashboard/LoaderWrapper.vue';
import {useImageStore} from '@/stores/images';
const img = useImageStore();
</script>
