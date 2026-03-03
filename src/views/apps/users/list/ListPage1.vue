<script setup>
import {ref, onMounted, computed} from 'vue';
import {useUserCardStore} from '@/stores/apps/UserCard';
import 'vue3-easy-data-table/dist/style.css';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {SearchOutlined, CheckCircleFilled, MessageOutlined, StopOutlined} from '@ant-design/icons-vue';

// theme breadcrumb
const page = ref({title: 'Style 01'});
const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '#'
  },
  {
    title: 'List',
    disabled: false,
    href: '#'
  },
  {
    title: 'Style 01',
    disabled: true,
    href: '#'
  }
]);

const store = useUserCardStore();

onMounted(() => {
  store.fetchlistCards();
});
const listCards = computed(() => {
  return store.list;
});

const searchField = ref('name');
const searchValue = ref('');

const headers = [
  {text: '#', value: 'id'},
  {text: 'User Profile', value: 'name', sortable: true},
  {text: 'Country', value: 'location', sortable: true},
  {text: 'Friends', value: 'friends', sortable: true},
  {text: 'Followers', value: 'followers', sortable: true},
  {text: 'Status', value: 'status', sortable: true},
  {text: 'Action', value: 'operation'}
];
const items = ref(listCards);
const themeColor = ref('rgb(var(--v-theme-secondary))');
</script>
<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Customer List">
        <v-row justify="space-between" class="align-center mb-3">
          <v-col cols="12" lg="3" md="4" sm="6">
            <v-text-field
              type="text"
              variant="outlined"
              persistent-placeholder
              placeholder="Search Customer"
              v-model="searchValue"
              hide-details
            >
              <template #prepend-inner>
                <SearchOutlined class="text-lightText" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="overflow-auto">
          <EasyDataTable
            :headers="headers"
            :items="items"
            table-class-name="customize-table"
            :theme-color="themeColor"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="8"
          >
            <template #item-name="{name, email, avatar, verify}">
              <div class="d-flex align-center ga-4">
                <img :src="avatar" alt="avatar" width="40" class="rounded-md" />

                <div>
                  <h5 class="text-h5 mb-0">
                    {{ name }}
                    <v-btn icon v-if="verify" color="success" variant="tonal" size="small" class="verifybtn">
                      <CheckCircleFilled />
                    </v-btn>
                  </h5>
                  <small class="text-subtitle text-lightText">{{ email }}</small>
                </div>
              </div>
            </template>
            <template #item-status="{status}">
              <v-chip color="success" label v-if="status === 'Active'" size="small"> Active </v-chip>
              <v-chip color="error" label v-if="status === 'Rejected'" size="small"> Rejected </v-chip>
              <v-chip color="warning" label v-if="status === 'Pending'" size="small"> Pending </v-chip>
            </template>
            <template #item-operation>
              <div class="operation-wrapper">
                <v-btn icon color="secondary" rounded variant="text">
                  <MessageOutlined />
                </v-btn>
                <v-btn icon color="error" rounded variant="text">
                  <StopOutlined />
                </v-btn>
              </div>
            </template>
          </EasyDataTable>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
<style>
.verifybtn {
  height: 12px !important;
  width: 12px !important;
  margin-top: -3px;
}

@media (max-width: 475px) {
  .easy-data-table__rows-selector {
    width: 50px !important;
    margin: 0 15px !important;
  }
  .vue3-easy-data-table__footer {
    text-align: center;
    padding-top: 15px !important;
  }
}
</style>
