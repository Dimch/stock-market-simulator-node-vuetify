<script setup>
import {ref, shallowRef} from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
// icons
import {CheckOutlined} from '@ant-design/icons-vue';

// assets
import img1 from '@/assets/images/pages/img-price-standard.svg';
import img2 from '@/assets/images/pages/img-price-standardplus.svg';
import img3 from '@/assets/images/pages/img-price-extended.svg';

const page = ref({title: 'Pricing Page'});
const breadcrumbs = ref([
  {
    title: 'Pages',
    disabled: false,
    href: '#'
  },
  {
    title: 'Pricing Page',
    disabled: true,
    href: '#'
  }
]);

const plans = shallowRef([
  {
    active: false,
    image: img1,
    title: 'Standard',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    price: {
      monthly: 69,
      yearly: 729
    },
    permission: [0, 1]
  },
  {
    active: true,
    image: img2,
    title: 'Standard Plus',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    price: {
      monthly: 129,
      yearly: 1449
    },
    permission: [0, 1, 2, 3]
  },
  {
    active: false,
    image: img3,
    title: 'Extended',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    price: {
      monthly: 599,
      yearly: 7089
    },
    permission: [0, 1, 2, 3, 5]
  }
]);

const planList = ref([
  'One End Product', // 0
  'No attribution required', // 1
  'TypeScript', // 2
  'Figma Design Resources', // 3
  'Create Multiple Products', // 4
  'Create a SaaS Project', // 5
  'Resale Product', // 6
  'Separate sale of our UI Elements?' // 7
]);

const switch1 = ref(false);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" variant="outlined" class="bg-surface">
        <v-card-text>
          <div class="d-flex align-center price-switch">
            <h6 class="text-h6 mb-0 me-2">Billed Yearly</h6>
            <v-switch color="primary" aria-label="switch" v-model="switch1" hide-details> </v-switch>
            <h6 class="text-h6 mb-0 ms-2">Billed Monthly</h6>
          </div>
          <v-row>
            <v-col lg="8">
              <p class="mb-0 text-lightText">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4" sm="6" v-for="(plan, index) in plans" v-bind:key="index">
      <v-card elevation="0">
        <v-card variant="outlined">
          <v-card-text class="pt-6">
            <div class="d-flex align-center">
              <v-avatar size="36">
                <img :src="plan.image" width="36" alt="icon svg" />
              </v-avatar>
              <h1 class="mb-0 ms-3 text-h4">{{ plan.title }}</h1>
            </div>
            <p class="py-5 mb-0">{{ plan.description }}</p>
            <h2 class="text-h2" v-if="switch1 == true">
              <span>$</span>{{ plan.price.monthly }}<span class="text-h6 text-lightText"> Lifetime</span>
            </h2>
            <h2 class="text-h2" v-if="switch1 == false">
              <span>$</span>{{ plan.price.yearly }}<span class="text-h6 text-lightText"> Lifetime</span>
            </h2>
            <v-btn :variant="plan.active ? 'flat' : 'outlined'" color="primary" class="mt-6 mb-3" block>Order Now</v-btn>
            <v-list class="PricingList text-start" aria-label="price list" aria-busy="true">
              <v-list-item
                class="withBorder ps-0"
                :disabled="!plan.permission.includes(index)"
                v-for="(list, index) in planList"
                :key="index"
                density="compact"
                :class="!plan.permission.includes(index) ? 'text-disabled' : ''"
              >
                <v-icon color="success" v-if="plan.permission.includes(index)" class="me-1">
                  <CheckOutlined :style="{fontSize: '14px'}" />
                </v-icon>
                <v-icon v-else aria-disabled="true">
                  <CheckOutlined :style="{fontSize: '14px'}" />
                </v-icon>
                {{ list }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.price-switch {
  .v-input {
    flex: unset;
  }
}
.withBorder {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
