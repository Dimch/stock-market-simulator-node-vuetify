<script setup>
import {useImageStore} from '@/stores/images';
const {bg500Image: bgImageClass} = useImageStore();
</script>

<template>
  <v-row no-gutters :class="['overflow-hidden', 'bg-container', bgImageClass]" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <v-card class="message-card surfopac-8 text-center elevation-6">
        <h1 class="text-md-h1 text-h2 mt-9 mb-3">
          500 internal server error
        </h1>
        <p class="text-caption content">
          Oops! Something went wrong on our end. Please try refreshing the page, or come back later.
        </p>
        <v-btn variant="flat" color="primary" class="mt-4" to="/console/admin/dashboards/market">
          Back
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
</style>
