<script setup>
import {computed, defineProps, ref} from 'vue';
import {useQuery} from '@pinia/colada';
import {useTheme} from 'vuetify';
import {use} from 'echarts/core';
import {SVGRenderer} from 'echarts/renderers';
import {LineChart} from 'echarts/charts'
import {TooltipComponent, GridComponent} from 'echarts/components';
import VChart from 'vue-echarts';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import {useAdminApi} from '@/api/adminApi';
import {useInterval} from '@/helper';

const props = defineProps({
  ticker: {type: String, required: true}, // stock ticker symbol
});

const theme = useTheme();
use([SVGRenderer, TooltipComponent, GridComponent, LineChart]);

const chartOptions = computed(() => ({
  animation: false,
  darkMode: theme.current.value.dark,
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{a0} | {b0} | <b>${c0}</b>',
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(var(--v-theme-on-surface), 0.1)',
      },
    },
    data: stock.value.timeLabels || [],
  },
  yAxis: {
    type: 'value',
    min: 'dataMin',
    max: 'dataMax',
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(var(--v-theme-on-surface), 0.1)',
      },
    },
  },
  series: [
    {
      name: props.ticker,
      type: 'line',
      showSymbol: false,
      data: stock.value.prices || [],
    },
  ],
}));

const periodOptions = [
  {title: '1 hour', value: 1 * 60},
  {title: '6 hours', value: 6 * 60},
  {title: '12 hours', value: 12 * 60},
  {title: '24 hours', value: 24 * 60},
];
const periodRange = ref(1 * 60); // last hour data with 1 min interval

const adminApi = useAdminApi();
const {data: stock, refresh: refreshStock} = useQuery({
  key: () => ['stockPriceRange', props.ticker, periodRange.value],
  query: async () => adminApi.getStockPeriods(props.ticker, periodRange.value),
  placeholderData: () => ({name: props.ticker, ticker: props.ticker, changeAmount: 0, changePercent: 0, prices: []}),
  staleTime: 60 * 1000, // 1 minutes
});
useInterval(refreshStock, 60 * 1000); // refresh every minute
</script>

<template>
  <ui-title-card :title="stock.name" class="px-0 rounded-md overflow-hidden pb-0">
    <v-row class="justify-sm-space-between justify-center py-5 px-4">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center" :class="stock.changeAmount >= 0 ? 'text-success' : 'text-error'">
          <v-icon :icon="stock.changeAmount >= 0 ? 'mdi-triangle-small-up' : 'mdi-triangle-small-down'" />
          <h6 class="text-h6 mb-0 ms-1">
            ${{ Math.abs(stock.changeAmount).toFixed(2) }} ({{ (Math.abs(stock.changePercent)).toFixed(0) }}%)
          </h6>
        </div>
        <p class="text-h6 text-lightText mb-0 text-sm-start text-center">Current price: ${{ stock.currentPrice }}</p>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="d-flex align-center flex-wrap ga-2 justify-sm-end justify-center">
          <v-btn-toggle v-model="periodRange" group mandatory variant="outlined" color="secondary" density="compact">
            <v-btn v-for="option in periodOptions" :key="option.value" :value="option.value">
              {{ option.title }}
            </v-btn>
          </v-btn-toggle>
          <v-btn icon rounded variant="outlined" color="secondary" size="small" disabled>
            <v-icon icon="mdi-download" size="small" />
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-chart class="chart" :option="chartOptions" :style="{width: '100%', height: '400px'}" autoresize />
  </ui-title-card>
</template>

<style lang="scss">
.chart {
  padding: 18px;
  padding-top: 0;
}
</style>
