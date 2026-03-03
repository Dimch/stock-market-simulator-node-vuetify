<script setup>
import {ref, onMounted, computed} from 'vue';
import {useUserCardStore} from '@/stores/apps/UserCard';

// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {SearchOutlined, EllipsisOutlined, FacebookFilled, TwitterCircleFilled, LinkedinFilled} from '@ant-design/icons-vue';

const store = useUserCardStore();

onMounted(() => {
  store.fetchCards();
});

const cards = computed(() => {
  return store.cards;
});
// theme breadcrumb
const page = ref({title: 'Style 02'});
const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '#'
  },
  {
    title: 'Cards',
    disabled: false,
    href: '#'
  },
  {
    title: 'Style 02',
    disabled: true,
    href: '#'
  }
]);
// dropdown data
const actionDD = ref([{title: 'Edit'}, {title: 'Delete'}]);
// cards data

const page1 = ref(1);
const rows = ref([{title: '10 Rows'}, {title: '20 Rows'}, {title: '30 Rows'}]);
const searchValue = ref('');

const filteredCards = computed(() => {
  return cards.value.filter((card) => {
    return card.name.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row class="justify-content-end">
    <v-col cols="12">
      <UiParentCard title="Cards">
        <template #action>
          <v-row class="justify-end">
            <v-col cols="12" lg="3" md="4" sm="5">
              <v-text-field
                color="primary"
                hide-details
                width="200"
                variant="outlined"
                persistent-placeholder
                placeholder="Search"
                class="mt-sm-0 mt-2 w-100"
                v-model="searchValue"
              >
                <template #prepend-inner>
                  <SearchOutlined class="text-lightText" />
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </template>

        <v-row>
          <v-col cols="12" md="4" xl="3" sm="6" v-for="(card, i) in filteredCards" :key="i">
            <v-card variant="outlined" class="card-hover-border bg-containerBg">
              <v-card-text>
                <div class="d-flex align-start">
                  <img :src="card.avatar" :alt="card.avatar" width="60" class="rounded-md" />
                  <div class="ms-auto">
                    <v-menu>
                      <template #activator="{props}">
                        <v-btn size="x-small" v-bind="props" variant="text">
                          <EllipsisOutlined :style="{fontSize: '20px'}" />
                        </v-btn>
                      </template>
                      <v-list elevation="24" density="compact" class="py-0">
                        <v-list-item v-for="(item, index) in actionDD" :key="index" :value="index" color="secondary">
                          <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
                <div class="d-flex align-center justify-space-between mt-3 mb-4">
                  <h4 class="text-h5">{{ card.name }}</h4>
                  <v-chip color="success" size="small" label v-if="card.active">Active</v-chip>
                  <v-chip color="error" size="small" label v-else>Rejected</v-chip>
                </div>
                <div class="d-flex ga-4">
                  <v-btn variant="tonal" size="small" color="facebook" class="flex-fill">
                    <FacebookFilled :style="{fontSize: '14px'}" />
                  </v-btn>
                  <v-btn variant="tonal" size="small" color="twitter" class="flex-fill">
                    <TwitterCircleFilled :style="{fontSize: '14px'}" />
                  </v-btn>
                  <v-btn variant="tonal" size="small" color="linkedin" class="flex-fill">
                    <LinkedinFilled :style="{fontSize: '14px'}" />
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="justify-space-between mt-5">
          <v-col cols="12" lg="5" class="text-start">
            <v-pagination density="compact" v-model="page1" active-color="primary" class="left-pagination" :length="6"> </v-pagination>
          </v-col>
          <v-col cols="12" lg="5" class="text-end">
            <v-menu transition="scale-transition">
              <template #activator="{props}">
                <v-btn color="inherit" variant="text" v-bind="props">
                  10 Rows
                  <template #append>
                    <ChevronDownIcon size="20" stroke-width="1.5" />
                  </template>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(row, i) in rows" :key="i" :value="i">
                  <v-list-item-title>{{ row.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
<style>
.left-pagination .v-pagination__list {
  justify-content: start;
}
</style>
