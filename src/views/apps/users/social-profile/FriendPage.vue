<script setup>
import {ref, onMounted, computed, shallowRef} from 'vue';
import Banner from '../../../../components/apps/socialprofile/BannerSection.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import {useFrinedsStore} from '@/stores/apps/friends';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {
  SearchOutlined,
  EnvironmentOutlined,
  EllipsisOutlined,
  HeartOutlined,
  TeamOutlined,
  DeleteOutlined,
  VideoCameraOutlined,
  MessageOutlined
} from '@ant-design/icons-vue';

const store = useFrinedsStore();

onMounted(() => {
  store.fetchFrineds();
});

const getfriends = computed(() => {
  return store.friends;
});
const searchValue = ref('');
// dropdown data
const actionDD = shallowRef([
  {title: 'Favorite', icon: HeartOutlined},
  {title: 'Edit Friend List', icon: TeamOutlined},
  {title: 'Remove', icon: DeleteOutlined}
]);
const page = ref({title: 'Social Profile'});

const filteredCards = computed(() => {
  return getfriends.value.filter((card) => {
    return card.name.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});

const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '/'
  },
  {
    title: 'Social Profile',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <Banner />
    </v-col>
  </v-row>
  <v-row class="justify-content-end mt-5">
    <v-col cols="12">
      <UiParentCard title="Friends">
        <template #action>
          <v-row class="justify-end">
            <v-col cols="12" md="3" sm="5">
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

        <v-row>
          <v-col cols="12" lg="3" md="4" sm="6" v-for="(card, i) in filteredCards" :key="i">
            <v-card variant="outlined" class="card-hover-border bg-containerBg friend-card">
              <v-card-text>
                <div class="d-flex align-center ga-2">
                  <img :src="card.avatar" :alt="card.avatar" width="40" class="rounded-md" />
                  <div>
                    <h4 class="text-h5 mb-0">{{ card.name }}</h4>
                    <small class="opacity-50 d-block text-truncate d-flex align-center ga-2">
                      <EnvironmentOutlined :style="{fontSize: '12px'}" />
                      {{ card.location }}
                    </small>
                  </div>
                  <div class="ms-auto">
                    <v-menu>
                      <template #activator="{props}">
                        <v-btn size="x-small" v-bind="props" variant="text">
                          <EllipsisOutlined :style="{fontSize: '12px'}" />
                        </v-btn>
                      </template>
                      <v-list elevation="24" density="compact" class="py-0">
                        <v-list-item v-for="(item, index) in actionDD" :key="index" :value="index" color="secondary">
                          <template #prepend>
                            <component :is="item.icon" class="v-icon--start opacity-50" />
                          </template>
                          <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
                <v-row class="mt-5">
                  <v-col cols="6">
                    <v-btn variant="outlined" color="secondary" size="small" block icon rounded="sm">
                      <v-tooltip activator="parent" location="top" aria-label="tooltip">Video</v-tooltip>
                      <VideoCameraOutlined :style="{fontSize: '16px'}" />
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn variant="outlined" color="primary" size="small" block icon rounded="sm">
                      <v-tooltip activator="parent" location="top" aria-label="tooltip">Message</v-tooltip>
                      <MessageOutlined :style="{fontSize: '16px'}" />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.friend-card {
  .text-truncate {
    white-space: unset !important;
    display: -webkit-box !important;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
