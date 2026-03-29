<script setup>
import {useRateLimitQuery} from '@/api/adminApi';
import RateLimitCard from './RateLimitCard.vue';
import {useInterval} from '@/helper';

const {data: rateLimits, refresh} = useRateLimitQuery();
useInterval(refresh, 10 * 1000);

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
