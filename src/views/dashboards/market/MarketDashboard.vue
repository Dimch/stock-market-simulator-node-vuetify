<script setup>
// imported components
import StockPriceRange from '../../widgets/chart/StockPriceRange.vue';
import WelcomeBanner from './components/WelcomeBanner.vue';
import PageView from './components/PageView.vue';
import AnalyticsReport from '../default/components/AnalyticsReport.vue';
import TransactionHistory from './components/TransactionHistory.vue';
import HelpSupport from './components/HelpSupport.vue';
import TaskCard from '../../widgets/statistics/components/TaskCard.vue';
import SkillCard from '../../widgets/statistics/components/SkillCard.vue';
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pt-2">
      <WelcomeBanner />
    </v-col>
    <v-col cols="12" md="12">
      <StockPriceRange ticker="ZVEX" />
    </v-col>
    <v-col cols="12" md="4">
      <PageView />
    </v-col>
    <v-col cols="12" md="8">
      <AnalyticsReport />
    </v-col>
    <v-col cols="12" md="8">
      <TaskCard />
    </v-col>
    <v-col cols="12" md="4">
      <TransactionHistory />
    </v-col>
    <v-col cols="12" md="4">
      <HelpSupport />
    </v-col>
    <v-col cols="12" md="8">
      <SkillCard />
    </v-col>
  </v-row>
</template>
