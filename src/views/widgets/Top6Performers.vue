<script setup>
import {useQuery} from '@pinia/colada';
import {useInterval} from '@/helper';
import {useStockMarketApi} from '@/api/stockMarketApi';
import TickerWidget from './TickerWidget.vue';

const REFRESH_INTERVAL = 60 * 1000; // 1 minute
const api = useStockMarketApi();
const {data: stocks, refresh: refreshStocks} = useQuery({
  key: () => ['top-performers'],
  query: async () => api.getTop(),
  placeholderData: () => [{}, {}, {}, {}, {}, {}], // placeholder for 4 rate limits
  staleTime: REFRESH_INTERVAL,
});
useInterval(refreshStocks, REFRESH_INTERVAL);
</script>

<template>
  <v-row class="mb-0">
    <template v-for="stock in stocks">
      <v-col cols="12" sm="6">
        <ticker-widget :stock="stock" />
      </v-col>
    </template>
  </v-row>
</template>
