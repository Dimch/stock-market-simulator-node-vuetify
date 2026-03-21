<script setup>
import Appbar from './components/AppBarMenu.vue';
import HomeBanner from './components/HomeBanner.vue';
import {useImageStore} from '@/stores/images';

const {bgLandingImage: bgImageClass} = useImageStore();
</script>

<template>
  <v-layout :class="['bg-containerBg', bgImageClass]">
    <Appbar />
    <v-main class="ma-0">
      <HomeBanner />
    </v-main>
  </v-layout>
</template>
