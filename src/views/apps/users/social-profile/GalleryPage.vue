<script setup>
import {ref, onMounted, computed} from 'vue';
import Banner from '../../../../components/apps/socialprofile/BannerSection.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import {useGalleryStore} from '@/stores/apps/gallery';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {SearchOutlined, CalendarOutlined, MoreOutlined} from '@ant-design/icons-vue';

const store = useGalleryStore();

onMounted(() => {
  store.fetchGallery();
});

const getPhotos = computed(() => {
  return store.gallery;
});

const searchValue = ref('');
// dropdown data
const actionDD = ref([
  {title: 'Remove Tag'},
  {title: 'Download'},
  {title: 'Make Profile Picture'},
  {title: 'Make Cover Photo'},
  {title: 'Find support or Report Photo'}
]);
const page = ref({title: 'Social Profile'});

const filteredCards = computed(() => {
  return getPhotos.value.filter((card) => {
    return card.title.toLowerCase().includes(searchValue.value.toLowerCase());
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
      <UiParentCard title="Gallery">
        <template #action>
          <v-row class="justify-end">
            <v-col cols="12" md="5" sm="7">
              <div class="d-sm-flex align-center ga-4 mt-4 mt-sm-0">
                <v-text-field
                  color="primary"
                  hide-details
                  width="100%"
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Search"
                  v-model="searchValue"
                >
                  <template #prepend-inner>
                    <SearchOutlined class="text-lightText" />
                  </template>
                </v-text-field>
                <v-btn color="secondary" variant="flat" class="mt-4 mt-sm-0">Add Photos</v-btn>
              </div>
            </v-col>
          </v-row>
        </template>

        <v-row>
          <v-col cols="12" lg="3" md="4" sm="6" v-for="(card, i) in filteredCards" :key="i">
            <v-card variant="outlined" class="card-hover-border bg-containerBg overflow-hidden">
              <img :src="card.image" alt="gallery" class="w-100" />
              <v-card-text class="pa-3">
                <div class="d-flex align-center ga-2">
                  <div>
                    <h4 class="text-subtitle-1">{{ card.title }}</h4>
                    <small class="opacity-50 d-block text-truncate d-flex align-center ga-2">
                      <CalendarOutlined :style="{fontSize: '14px'}" /> {{ card.dateTime }}
                    </small>
                  </div>
                  <div class="ms-auto">
                    <v-menu>
                      <template #activator="{props}">
                        <v-btn size="x-small" color="secondary" v-bind="props" icon rounded variant="text">
                          <MoreOutlined :style="{fontSize: '14px'}" />
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
