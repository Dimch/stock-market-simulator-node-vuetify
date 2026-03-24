<template>
  <v-locale-provider>
    <loader-wrapper />
    <v-layout :class="['bg-container', img.bgImageClass]">
      <app-toolbar />
      <v-main class="">
        <router-view />
      </v-main>
    </v-layout> 
    <v-layout cols="12" style="position: relative; bottom: 120px">
      <v-container class="pt-0 pb-6">
        <Footer />
      </v-container>
    </v-layout>
  </v-locale-provider>
</template>

<script setup>
import {RouterView} from 'vue-router';
import AppToolbar from './AppBarMenu.vue';
import LoaderWrapper from '../dashboard/LoaderWrapper.vue';
import Footer from '@/views/authentication/Footer.vue';
import {useImageStore} from '@/stores/images';
const img = useImageStore();
</script>
