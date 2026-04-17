<template>
  <v-locale-provider>
    <loader-wrapper />
    <v-layout :class="['bg-container', img.bgImageClass]">
      <app-toolbar />
      <v-main style="--v-layout-top: 0px">
        <router-view />
        <v-container class="pt-0 pb-6">
          <blank-footer />
        </v-container>
      </v-main>
    </v-layout>
  </v-locale-provider>
</template>

<script setup>
import {RouterView} from 'vue-router';
import AppToolbar from './AppBar.vue';
import BlankFooter from './Footer.vue';
import LoaderWrapper from '../dashboard/LoaderWrapper.vue';
import {useImageStore} from '@/stores/images';
const img = useImageStore();
</script>
