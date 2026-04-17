<script setup>
import StockPriceRange from '@/views/widgets/chart/StockPriceRange.vue';
import StockList from '@/views/widgets/StockList.vue';

const selectedTicker = ref('ZVEX');
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <stock-price-range :ticker="selectedTicker" />
    </v-col>
    <v-col cols="12" md="12">
      <stock-list v-model="selectedTicker" />
    </v-col>
  </v-row>
</template>
