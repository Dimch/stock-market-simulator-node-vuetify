<script setup>
import {ref} from 'vue';
import {useProxiedModel} from 'vuetify/lib/composables/proxiedModel';
import {useQuery} from '@pinia/colada';
import {useAdminApi} from '@/api/adminApi';
import {useInterval} from '@/helper';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const props = defineProps({
  modelValue: {type: String, required: false}, // selected stock ticker symbol
});
const selectedTicker = useProxiedModel(props, 'modelValue', null, val => [val], val => val[0] || stocks.value[0]?.ticker);
const toMoney = price => Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
const dataHeaders = [
  {title: 'Ticker', key: 'ticker'},
  {title: 'Name', key: 'name'},
  {title: 'Price', key: 'price', align: 'end'},
  {title: 'Change $', key: 'changeAmount', align: 'end'},
  {title: 'Change %', key: 'changePercent', align: 'end'},
];
const changeColor = change => change >= 0 ? 'text-success' : 'text-error';

const adminApi = useAdminApi();
const {data: stocks, refresh: refreshStock} = useQuery({
  key: () => ['stocksLive'],
  query: async () => adminApi.getStocks(),
  staleTime: 60 * 1000, // 1 minutes
});
useInterval(refreshStock, 60 * 1000); // refresh every minute
</script>

<template>
  <ui-title-card title="Stocks Live" class="px-0 rounded-md overflow-hidden pb-0">
    <v-data-table v-model="selectedTicker" :items="stocks" :headers="dataHeaders"
                  item-value="ticker" show-select select-strategy="single">
      <template #item="{ item, internalItem, isSelected, toggleSelect }">
        <tr>
          <td>
            <v-checkbox :model-value="isSelected(internalItem)" @click.stop="toggleSelect(internalItem)" hide-details />
          </td>
          <td>{{ item.ticker }}</td>
          <td>{{ item.name }}</td>
          <td class="text-end">{{ toMoney(item.price) }}</td>
          <td :class="['text-end', changeColor(item.changeAmount)]">
            {{ toMoney(item.changeAmount) }}
          </td>
          <td :class="['text-end', changeColor(item.changeAmount)]">
            {{ item.changePercent?.toFixed(1) }}%
          </td>
        </tr>
      </template>
    </v-data-table>
  </ui-title-card>
</template>
