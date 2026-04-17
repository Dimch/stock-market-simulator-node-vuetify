<script setup>
defineProps({
  stock: {type: Object, required: true}, // stock ticker data
});
const toMoney = price => Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
</script>

<template>
  <v-card color="rgba(0,0,0,0)" flat>
    <v-row class="justify-sm-space-between justify-center py-5 px-4">
      <v-col cols="12" sm="5">
        <h2 class="mb-0 font-weight-bold">{{ stock.ticker }}</h2>
        <h5 class="mb-0">{{ stock.name }}</h5>
      </v-col>
      <v-col cols="12" sm="7" class="text-end">
        <p class="text-h3 mb-1">
          {{ toMoney(stock.price) }}
        </p>
        <div class="align-center" :class="stock.changeAmount >= 0 ? 'text-success' : 'text-error'">
          <v-icon :icon="stock.changeAmount >= 0 ? 'mdi-triangle-small-up' : 'mdi-triangle-small-down'" />
          <span class="mb-0 ms-1">
            {{ toMoney(stock.changeAmount) }} ({{ (Math.abs(stock.changePercent)).toFixed(1) }}%)
          </span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
