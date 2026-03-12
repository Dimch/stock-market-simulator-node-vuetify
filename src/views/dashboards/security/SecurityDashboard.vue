<script setup>
import RateLimitCharts from '@/views/widgets/chart/RateLimitCharts.vue';
import RecentOrder from './components/RecentOrder.vue';
import TransactionHistory from './components/TransactionHistory.vue';
import HelpSupport from './components/HelpSupport.vue';
import AnalyticsReport from './components/AnalyticsReport.vue';
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" md="12" class="pb-0">
      <RateLimitCharts />
    </v-col>
    <v-col cols="12" md="8">
      <RecentOrder />
    </v-col>
    <v-col cols="12" md="4">
      <AnalyticsReport />
    </v-col>
    <v-col cols="12" md="5">
      <TransactionHistory />
    </v-col>
    <v-col cols="12" md="7">
      <HelpSupport />
    </v-col>
  </v-row>
</template>
