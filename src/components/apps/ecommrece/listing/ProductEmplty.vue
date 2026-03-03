<script setup>
// assets
import imageEmpty from '@/assets/images/e-commerce/empty.png';
</script>

<template>
  <v-card variant="outlined" class="bg-surface">
    <v-card-text>
      <v-row class="justify-center">
        <v-col class="text-center" lg="10">
          <v-img :src="imageEmpty" alt="cover" cover style="max-width: 300px; margin: 0 auto" />
          <h1 class="text-h1 mb-0 mt-4">There is no Product</h1>
          <p class="text-h5 text-lightText">Try checking your spelling or use more general terms</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
