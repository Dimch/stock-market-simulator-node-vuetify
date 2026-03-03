<script setup>
import {ref, onMounted, computed} from 'vue';
import {useUserCardStore} from '@/stores/apps/UserCard';
import user1 from '@/assets/images/users/avatar-1.png';
import user2 from '@/assets/images/users/avatar-2.png';
import user3 from '@/assets/images/users/avatar-3.png';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {SearchOutlined, CheckCircleFilled, MessageOutlined, StopOutlined} from '@ant-design/icons-vue';

// theme breadcrumb
const page = ref({title: 'Style 02'});
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
    title: 'Style 02',
    disabled: true,
    href: '#'
  }
]);

const store = useUserCardStore();

onMounted(() => {
  store.fetchlist2Cards();
});
const searchValue = ref('');
const listCards = computed(() => {
  return store.list2;
});

const page1 = ref(1);
</script>
<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Customer List">
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
                v-model="searchValue"
                class="mt-sm-0 mt-2 w-100"
              >
                <template #prepend-inner>
                  <SearchOutlined class="text-lightText" />
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </template>
        <v-row v-for="card in listCards" :key="card.name">
          <v-col md="3" sm="5" cols="12" class="mt-2">
            <div class="d-flex align-start ga-4">
              <img :src="card.image" alt="avatar" width="50" class="rounded-md" />

              <div>
                <h5 class="text-h5 mb-0">
                  {{ card.name }}
                  <v-btn icon v-if="card.badgeStatus == 'active'" variant="tonal" color="success" size="small" class="verifybtn">
                    <CheckCircleFilled />
                  </v-btn>
                </h5>
                <small class="text-subtitle">{{ card.designation }}</small>
                <p class="text-subtitle-2 text-lightText mt-2">{{ card.subContent }}</p>
              </div>
            </div>
          </v-col>
          <v-col md="2" sm="3" cols="6">
            <small class="font-weight-bold">Email</small>
            <h5 class="text-h6">{{ card.email }}</h5>
            <small class="mt-2 d-block font-weight-bold">Phone</small>
            <h5 class="text-h6">{{ card.phone }}</h5>
          </v-col>
          <v-col md="2" sm="3" cols="6">
            <small class="font-weight-bold">Location</small>
            <h5 class="text-h6">{{ card.location }}</h5>
            <div class="d-flex align-center justify-end flex-wrap flex-row-reverse">
              <v-avatar color="lightsecondary" variant="flat" size="small" class="ms-n2">
                <span class="text-h5">2</span>
              </v-avatar>
              <v-avatar variant="flat" size="small" class="ms-n2">
                <v-img :src="user3" alt="John"></v-img>
              </v-avatar>
              <v-avatar variant="flat" size="small" class="ms-n2">
                <v-img :src="user2" alt="John"></v-img>
              </v-avatar>
              <v-avatar variant="flat" size="small">
                <v-img :src="user1" alt="John"></v-img>
              </v-avatar>
            </div>
          </v-col>
          <v-col md="5" sm="6" cols="12">
            <div class="d-flex align-center ga-4 mb-5">
              <span>Progress</span>
              <v-progress-linear
                :model-value="card.progressValue"
                aria-label="progressbar"
                background-color="pink lighten-3"
                rounded
                color="primary"
              ></v-progress-linear>
              <span>{{ card.progressValue }}</span>
            </div>
            <v-row>
              <v-col col="6">
                <v-btn color="secondary" variant="outlined" block size="small"><MessageOutlined class="me-2" /> Message</v-btn>
              </v-col>
              <v-col col="6">
                <v-btn color="error" variant="outlined" block size="small"><StopOutlined class="me-2" /> Block</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="12" cols="12"><v-divider /></v-col> </v-row
        ><br />
        <v-pagination density="compact" class="left-pagination" v-model="page1" active-color="primary" :length="6"> </v-pagination>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.verifybtn {
  height: 12px !important;
  width: 12px !important;
  margin-top: -3px;
}
.left-pagination .v-pagination__list {
  justify-content: start;
}
</style>
