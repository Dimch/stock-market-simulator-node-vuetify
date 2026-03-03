<script setup>
// imported components
import RateLimitCharts from '@/views/widgets/chart/components/RateLimitCharts.vue';
import IncomeCompare from '../../widgets/chart/components/IncomeCompare.vue';
import StockPriceRange from '../../widgets/chart/components/StockPriceRange.vue';
import SalesReport from '../../widgets/chart/components/SalesReport.vue';
import WelcomeBanner from './components/WelcomeBanner.vue';
import PageView from './components/PageView.vue';
import RecentOrder from '../default/components/RecentOrder.vue';
import AnalyticsReport from '../default/components/AnalyticsReport.vue';
import TransactionHistory from './components/TransactionHistory.vue';
import HelpSupport from './components/HelpSupport.vue';
import TaskCard from '../../widgets/statistics/components/TaskCard.vue';
import SkillCard from '../../widgets/statistics/components/SkillCard.vue';
import AcquisitionChannels from '../../widgets/chart/components/AcquisitionChannels.vue';
</script>

<template>
  <v-row class="mt-0">
    <!-- column 1 -->
    <v-col cols="12" class="pt-2">
      <WelcomeBanner />
    </v-col>

    <!-- column 2 -->
    <v-col cols="12" class="pb-0">
      <RateLimitCharts />
    </v-col>

    <!-- column-3 -->
    <v-col cols="12" md="12">
      <StockPriceRange ticker="ZVEX" />
    </v-col>
    
    <!-- column 4 -->
    <v-col cols="12" md="4">
      <PageView />
    </v-col>
    
    <!-- column 5 -->
    <v-col cols="12" md="8">
      <IncomeCompare />
    </v-col>

    <!-- column 6 -->
    <v-col cols="12" md="4">
      <AnalyticsReport />
    </v-col>

    <!-- column 7 -->
    <v-col cols="12" md="7">
      <SalesReport />
    </v-col>

    <!-- column 8 -->
    <v-col cols="12" md="5">
      <v-row>
        <!-- -------------------------------------------------------------------- -->
        <!-- Transaction History -->
        <!-- -------------------------------------------------------------------- -->
        <v-col cols="12">
          <TransactionHistory />
        </v-col>

        <!-- -------------------------------------------------------------------- -->
        <!-- Help support -->
        <!-- -------------------------------------------------------------------- -->
        <v-col cols="12">
          <HelpSupport />
        </v-col>
      </v-row>
    </v-col>

    <!-- column 9 -->
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12">
          <TaskCard />
        </v-col>
        <v-col cols="12">
          <SkillCard />
        </v-col>
      </v-row>
    </v-col>

    <!-- column 10 -->
    <v-col cols="12" md="4">
      <AcquisitionChannels />
    </v-col>
  </v-row>
</template>
