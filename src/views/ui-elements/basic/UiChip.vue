<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {MinusSquareFilled, DeleteOutlined, PlayCircleFilled, SmileFilled, HeartFilled} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Chips'});
const subContent = ref({content: 'Chips are compact elements that represent an input, attribute, or action.'});
const path = ref({filepath: 'src/views/ui-elements/basic/chip'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/chips/'});

// buttons color data
const chipColor = ref(['primary', 'secondary', 'success', 'warning', 'info', 'error']);

// assets
import avtarImg from '@/assets/images/users/avatar-1.png';
import avtarImg1 from '@/assets/images/users/avatar-6.png';
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic -->
        <v-col cols="12" md="6">
          <UiParentCard title="Basic">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip label> Default </v-chip>

              <v-chip color="primary" variant="flat" label> Color </v-chip>

              <v-chip color="primary" variant="flat" disabled label> Disabled </v-chip>

              <v-chip color="primary" variant="flat" closable label> Deletable </v-chip>

              <v-chip link color="primary" variant="flat" label>
                <v-avatar start rounded size="23">
                  <v-img :src="avtarImg" alt="user"></v-img>
                </v-avatar>
                Avatar
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Outlined Color -->
        <v-col cols="12" md="6">
          <UiParentCard title="Lighter">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip label> Default </v-chip>

              <v-chip color="primary" label> Color </v-chip>

              <v-chip color="primary" disabled label> Disabled </v-chip>

              <v-chip color="primary" closable label> Deletable </v-chip>

              <v-chip link color="primary" label>
                <v-avatar start rounded size="23">
                  <v-img :src="avtarImg1" alt="user"></v-img>
                </v-avatar>
                Avatar
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Outlined -->
        <v-col cols="12" md="6">
          <UiParentCard title="Outlined">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip label variant="outlined"> Default </v-chip>

              <v-chip color="primary" variant="outlined" label> Color </v-chip>

              <v-chip color="primary" variant="outlined" disabled label> Disabled </v-chip>

              <v-chip color="primary" variant="outlined" closable label> Deletable </v-chip>

              <v-chip link color="primary" variant="outlined" label>
                <v-avatar start rounded size="23">
                  <v-img :src="avtarImg1" alt="user"></v-img>
                </v-avatar>
                Avatar
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Combined Color -->
        <v-col cols="12" md="6">
          <UiParentCard title="Combined">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip label border="secondary solid thin opacity-50"> Default </v-chip>

              <v-chip color="primary" border="primary solid thin opacity-50" label> Color </v-chip>

              <v-chip color="primary" border="primary solid thin opacity-50" disabled label> Disabled </v-chip>

              <v-chip color="primary" border="primary solid thin opacity-50" closable label> Deletable </v-chip>

              <v-chip link border="primary solid thin opacity-50" color="primary" label>
                <v-avatar start rounded size="23">
                  <v-img :src="avtarImg1" alt="user"></v-img>
                </v-avatar>
                Avatar
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Closable -->
        <v-col cols="12" md="6">
          <UiParentCard title="Deletable Icon">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip color="error" variant="flat" closable label>Default</v-chip>
              <v-chip color="error" variant="flat" label>
                Custom Icon
                <template #close>
                  <MinusSquareFilled class="ms-1" :style="{fontSize: '14px'}" />
                </template>
              </v-chip>
              <v-chip color="error" label variant="outlined">
                Custom Icon
                <template #close>
                  <DeleteOutlined class="ms-1" :style="{fontSize: '14px'}" />
                </template>
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Label -->
        <v-col cols="12" md="6">
          <UiParentCard title="Avatar & Icon">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4 text-lightText">
              <v-chip label>
                <template #prepend>
                  <PlayCircleFilled class="me-1" :style="{fontSize: '14px', color: 'rgb(var(--v-theme-lightText))'}" />
                </template>
                Play
              </v-chip>
              <v-chip link border="primary solid thin opacity-50" color="primary" label>
                <v-avatar start rounded size="23">
                  <v-img :src="avtarImg1" alt="user"></v-img>
                </v-avatar>
                Avatar
              </v-chip>
              <v-chip label color="warning" variant="outlined">
                <template #prepend>
                  <SmileFilled class="me-1" :style="{fontSize: '14px'}" />
                </template>
                Smile
              </v-chip>
              <v-chip label color="error" variant="flat">
                <template #prepend>
                  <HeartFilled class="me-1" :style="{fontSize: '14px'}" />
                </template>
                Like
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Sizes -->
        <v-col cols="12" md="6">
          <UiParentCard title="Sizes">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip color="primary" size="x-small" variant="flat" label> x-small chip </v-chip>

              <v-chip color="primary" size="small" variant="flat" label> small chip </v-chip>

              <v-chip color="primary" variant="flat" label> Default </v-chip>

              <v-chip color="primary" size="large" variant="flat" label> large chip </v-chip>

              <v-chip color="primary" size="x-large" variant="flat" label> x-large chip </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Closable chip -->
        <v-col cols="12" md="6">
          <UiParentCard title="Lighter color">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip color="primary" label closable> Angular </v-chip>
              <v-chip color="secondary" label closable> Jquery </v-chip>
              <v-chip color="warning" label closable> Polymer </v-chip>
              <v-chip color="success" label closable> React </v-chip>
              <v-chip color="error" label closable> Vue.js </v-chip>
            </div>
          </UiParentCard>
        </v-col>
        <v-col cols="12">
          <UiParentCard title="Color">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <v-chip v-for="chip in chipColor" :key="chip" :color="chip" label variant="flat">
                {{ chip }}
              </v-chip>
            </div>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
