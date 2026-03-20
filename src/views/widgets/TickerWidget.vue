<script setup>
const props = defineProps({
  stock: {type: Object, required: true}, // stock ticker data
});
</script>

<template>
  <v-card>
    <v-row class="justify-sm-space-between justify-center py-5 px-4">
      <v-col cols="12" sm="6">
        <div>
          <h4 class="mb-0 font-weight-bold">{{ stock.ticker }}</h4>
          <h6 class="mb-0">{{ stock.name }}</h6>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="d-flex align-center" :class="stock.changeAmount >= 0 ? 'text-success' : 'text-error'">
          <v-icon :icon="stock.changeAmount >= 0 ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="small" />
          <h6 class="mb-0 ms-1">
            ${{ Math.abs(stock.changeAmount).toFixed(2) }} ({{ (Math.abs(stock.changePercent)).toFixed(0) }}%)
          </h6>
        </div>
        <p class="text-h2 mb-0 text-sm-start text-center">
          ${{ stock.currentPrice }}
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>
