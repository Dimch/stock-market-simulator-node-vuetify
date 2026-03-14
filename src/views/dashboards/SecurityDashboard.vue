<script setup>
import RateLimitCharts from '@/views/widgets/chart/RateLimitCharts.vue';
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" md="12" class="pb-0">
      <RateLimitCharts />
    </v-col>
    <v-col cols="12" md="8">
      <!-- Rate limit configurations table -->
    </v-col>
  </v-row>
</template>
