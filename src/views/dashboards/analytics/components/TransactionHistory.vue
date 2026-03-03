<script setup>
import {shallowRef} from 'vue';
// common components
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

// icons
import {CheckOutlined, CloseOutlined, ClockCircleOutlined} from '@ant-design/icons-vue';

const transaction = shallowRef([
  {
    id: 'payment1',
    icon: CheckOutlined,
    subtitle: 'Today, 2:00 AM',
    title: 'Payment from #002434',
    color: 'success',
    price: '+ $1,430',
    pricepercent: '35%'
  },
  {
    id: 'payment2',
    icon: CloseOutlined,
    subtitle: 'Today 6:00 AM',
    title: 'Refund for #002434',
    color: 'error',
    price: '- $1,430',
    pricepercent: '35%'
  },
  {
    id: 'payment3',
    icon: ClockCircleOutlined,
    subtitle: 'Today 2:00 AM',
    title: 'Pending from #002435',
    color: 'primary',
    price: '- $2430',
    pricepercent: '35%'
  }
]);
</script>
<template>
  <UiTitleCard title="Transaction History" class-name="px-0 pb-0 rounded-md overflow-hidden">
    <v-list lines="two" class="py-0" aria-label="transaction list" aria-busy="true">
      <v-list-item v-for="history in transaction" :key="history.id" :id="history.id" :value="history.title" border>
        <template #prepend>
          <v-avatar size="36" :color="history.color" :class="`text-${history.color}`" variant="tonal">
            <component :is="history.icon" :style="{fontSize: '16px'}" />
          </v-avatar>
        </template>
        <div class="d-flex align-center justify-space-between w-100 ga-2">
          <div>
            <h6 class="text-subtitle-1 mb-0">{{ history.title }}</h6>
            <span class="text-subtitle-2 text-lightText font-weight-regular">{{ history.subtitle }}</span>
          </div>
          <div class="text-end">
            <h6 class="text-subtitle-1 mb-0">{{ history.price }}</h6>
            <span class="text-h6 text-lightText">{{ history.pricepercent }}</span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </UiTitleCard>
</template>
