<script setup>
import {useQuery} from '@pinia/colada';
import {useInterval} from '@/helper';
import {useAdminApi} from '@/api/adminApi';
import RateLimitCard from './RateLimitCard.vue';

const adminApi = useAdminApi();
const {data: rateLimits, refresh: refreshRateLimits} = useQuery({
  key: () => ['rateLimits'],
  query: async () => adminApi.getRateLimits(),
  placeholderData: () => [{}, {}, {}, {}], // placeholder for 4 rate limits
  staleTime: 10 * 1000,
});
useInterval(refreshRateLimits, 10 * 1000); // refresh 10 seconds

const colors = ['purple', 'teal', 'blue', 'pink', 'lime', 'brown'];
const getColor = (index) => colors[index % colors.length];

</script>

<template>
  <v-row class="mb-0">
    <template v-for="(rateLimit, idx) in rateLimits">
      <v-col cols="12" sm="6" md="6">
        <rate-limit-card :rate-limit="rateLimit" :color="getColor(idx)" />  
      </v-col>
    </template>
  </v-row>
</template>
