<script setup>
import Appbar from './components/AppBarMenu.vue';
import HomeBanner from './components/HomeBanner.vue';
import 'aos/dist/aos.css';
import {onMounted} from 'vue';
import AOS from 'aos';
import {useImageStore} from '@/stores/images';
const {bgLandingImage: bgImageClass} = useImageStore();

onMounted(() => {
  AOS.init();
});
</script>

<template>
  <v-layout :class="['bg-containerBg', bgImageClass]">
    <Appbar />
    <v-main class="ma-0">
      <HomeBanner />
    </v-main>
  </v-layout>
</template>
