<script setup>
import {cond, constant, lte, stubTrue} from 'lodash/fp';
import {useRateLimitQuery} from '@/api/adminApi';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import {useInterval} from '@/helper';

const dataHeaders = [
  {title: 'Name', key: 'title'},
  {title: 'Description', key: 'description'},
  {title: 'Limit value', key: 'salt'},
  {title: '#', key: 'value'},
  {title: '%', key: 'percentage'},
  {title: 'Max', key: 'max'},
  {title: 'Updated at', key: 'updatedAt'},
];

const {data: rateLimits, refresh} = useRateLimitQuery();
useInterval(refresh, 10 * 1000);
const chipColor = cond([
  [lte(0.8), constant('error')],
  [lte(0.5), constant('warning')],
  [stubTrue, constant('success')],
]);
</script>

<template>
  <ui-title-card title="Rate Limit Configurations" class="px-0 rounded-md overflow-hidden pb-0">
    <v-data-table :items="rateLimits" :headers="dataHeaders">
      <template #item.percentage="{ value }">
        <v-chip :color="chipColor(value)" class="ms-2" size="small" label density="compact"
                :border="`${chipColor(value)} solid thin opacity-50`">
          {{ value * 100 }}%
        </v-chip>
      </template>
    </v-data-table>
  </ui-title-card>
</template>
