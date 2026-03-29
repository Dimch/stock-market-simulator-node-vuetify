<script setup>
import RateLimitList from '@/views/widgets/RateLimitList.vue';
import RateLimitCharts from '@/views/widgets/chart/RateLimitCharts.vue';
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" md="12" class="pb-0">
      <rate-limit-charts />
    </v-col>
    <v-col cols="12" md="12">
      <rate-limit-list />
    </v-col>
  </v-row>
</template>
