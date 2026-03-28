<script setup>
import StockPriceRange from '@/views/widgets/chart/StockPriceRange.vue';

const selectedTicker = ref('ZVEX');
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <!-- List of selectable widgets showing price -->
    </v-col>
    <v-col cols="12" md="12">
      <stock-price-range :ticker="selectedTicker" />
    </v-col>
    <v-col cols="12" md="4">
      <!-- Table of all stocks and prices -->
    </v-col>
  </v-row>
</template>
