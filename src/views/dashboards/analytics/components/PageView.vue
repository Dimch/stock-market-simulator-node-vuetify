<script setup>
import {shallowRef} from 'vue';
// common components
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const transaction = shallowRef([
  {
    subtitle: '/demo/admin/index.html',
    title: 'Admin Home',
    price: '7755',
    pricepercent: '31.74%'
  },
  {
    subtitle: '/demo/admin/forms.html',
    title: 'Form Elements',
    price: '5215',
    pricepercent: '28.53%'
  },
  {
    subtitle: '/demo/admin/util.html',
    title: 'Utilities',
    price: '4848',
    pricepercent: '25.35%'
  },
  {
    subtitle: '/demo/admin/validation.html',
    title: 'Form Validation',
    price: '3275',
    pricepercent: '23.17%'
  },
  {
    subtitle: '/demo/admin/modals.html',
    title: 'Modals',
    price: '3003',
    pricepercent: '22.21%'
  }
]);
</script>
<template>
  <UiTitleCard title="Page Views by Page Title" class-name="px-0 pb-0 rounded-md overflow-hidden">
    <v-list lines="two" class="py-0" aria-label="page list" aria-busy="true">
      <v-list-item v-for="history in transaction" :key="history.title" :value="history.title" border class="py-5">
        <div class="d-flex align-center justify-space-between w-100 ga-2">
          <div>
            <h6 class="text-subtitle-1 mb-0">{{ history.title }}</h6>
            <span class="text-h6 text-lightText">{{ history.subtitle }}</span>
          </div>
          <div class="text-end">
            <h5 class="text-h5 mb-0 text-primary">{{ history.price }}</h5>
            <span class="text-caption text-lightText">{{ history.pricepercent }}</span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </UiTitleCard>
</template>
