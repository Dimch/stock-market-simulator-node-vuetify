<script setup>
import {useImageStore} from '@/stores/images';
const {bg404Image: bgImageClass} = useImageStore();
</script>

<template>
  <v-row no-gutters :class="['overflow-hidden', 'bg-container', bgImageClass]" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <v-card class="message-card surfopac-8 text-center elevation-6">
        <h1 class="text-md-h1 text-h2 mt-9 mb-3">
          404 page not found
        </h1>
        <p class="text-h6 content">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
          Please check the URL or return to the homepage.
        </p>
        <v-btn variant="flat" color="primary" to="/console/admin/dashboards/market">
          Back
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
</style>
