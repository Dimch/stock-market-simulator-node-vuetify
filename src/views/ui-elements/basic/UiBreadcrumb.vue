<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {HomeFilled, RightOutlined} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Breadcrumbs'});
const subContent = ref({content: 'Breadcrumbs allow users to make selections from a range of values.'});
const path = ref({filepath: 'src/views/ui-elements/basic/breadcrumb'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/breadcrumbs/'});

// breadcrumb data
const items = ref([
  {
    title: 'Dashboard',
    disabled: false,
    href: '/main/dashboards/security'
  },
  {
    title: 'Basic',
    disabled: false,
    href: '#'
  },
  {
    title: 'Breadcrumb',
    disabled: true,
    href: '#'
  }
]);
</script>

<style scoped>
.v-breadcrumbs {
  display: block;
}
</style>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic -->
        <v-col cols="12" md="6">
          <UiParentCard title="Basic">
            <v-toolbar rounded="md" color="gray100" class="font-weight-medium" dark prominent :border="true">
              <v-breadcrumbs :items="items" class="mb-0"></v-breadcrumbs>
            </v-toolbar>
          </UiParentCard>
        </v-col>
        <!-- Custom Separator -->
        <v-col cols="12" md="6">
          <UiParentCard title="Custom Separator">
            <v-toolbar rounded="md" color="gray100" class="font-weight-medium" dark prominent :border="true">
              <v-breadcrumbs :items="items" class="mb-0">
                <template #divider>
                  <div class="d-flex align-center">
                    <RightOutlined :style="{fontSize: '12px'}" />
                  </div>
                </template>
              </v-breadcrumbs>
            </v-toolbar>
          </UiParentCard>
        </v-col>
        <!-- With Title -->
        <v-col cols="12" md="6">
          <UiParentCard title="With Title">
            <v-toolbar rounded="md" color="gray100" class="font-weight-medium breadcrumb-with-title" dark prominent :border="true">
              <div>
                <v-toolbar-title class="ms-4 mb-n2 text-h2">Breadcrumb</v-toolbar-title>
                <v-breadcrumbs :items="items" class="pb-0 mb-0">
                  <template #divider>
                    <div class="d-flex align-center">
                      <RightOutlined :style="{fontSize: '12px'}" />
                    </div>
                  </template>
                </v-breadcrumbs>
              </div>
            </v-toolbar>
          </UiParentCard>
        </v-col>
        <!-- Title Bottom -->
        <v-col cols="12" md="6">
          <UiParentCard title="Title Bottom">
            <v-toolbar rounded="md" color="gray100" class="font-weight-medium breadcrumb-with-title" dark prominent :border="true">
              <div>
                <v-breadcrumbs :items="items" class="pt-0">
                  <template #divider>
                    <div class="d-flex align-center">
                      <RightOutlined :style="{fontSize: '12px'}" />
                    </div>
                  </template>
                </v-breadcrumbs>
                <v-toolbar-title class="ms-4 mt-n4 text-h2">Breadcrumb</v-toolbar-title>
              </div>
            </v-toolbar>
          </UiParentCard>
        </v-col>
        <!-- With Icons -->
        <v-col cols="12">
          <UiParentCard title="With Icons">
            <v-toolbar rounded="md" color="gray100" class="font-weight-medium breadcrumb-with-title" dark prominent :border="true">
              <div>
                <v-toolbar-title class="ms-4 mb-n4 text-h2">Breadcrumb</v-toolbar-title>
                <v-breadcrumbs :items="items" class="pb-0 mb-0">
                  <template #divider>
                    <div class="d-flex align-center">
                      <RightOutlined :style="{fontSize: '12px'}" />
                    </div>
                  </template>
                  <template #prepend>
                    <HomeFilled :style="{color: 'rgb(var(--v-theme-lightText))'}" class="me-1" />
                  </template>
                </v-breadcrumbs>
              </div>
            </v-toolbar>
          </UiParentCard>
        </v-col>
        <!-- with Divider -->
        <v-col cols="12" md="6">
          <UiParentCard title="No Card with Divider">
            <v-toolbar rounded="md" class="font-weight-medium pb-4 breadcrumb-height" dark prominent>
              <div>
                <v-toolbar-title class="mb-n2 text-h2">Breadcrumb</v-toolbar-title>
                <v-breadcrumbs :items="items" class="pb-0 mb-0 ps-0">
                  <template #divider>
                    <div class="d-flex align-center">
                      <RightOutlined :style="{fontSize: '12px'}" />
                    </div>
                  </template>
                </v-breadcrumbs>
              </div>
            </v-toolbar>
            <v-divider></v-divider>
          </UiParentCard>
        </v-col>
        <v-col cols="12" md="6">
          <UiParentCard title="No Card with Divider">
            <v-toolbar rounded="md" class="font-weight-medium breadcrumb-height" dark prominent>
              <div>
                <v-toolbar-title class="mb-n2 text-h2">Breadcrumb</v-toolbar-title>
                <v-breadcrumbs :items="items" class="pb-0 mb-0 ps-0">
                  <template #divider>
                    <div class="d-flex align-center">
                      <RightOutlined :style="{fontSize: '12px'}" />
                    </div>
                  </template>
                </v-breadcrumbs>
              </div>
            </v-toolbar>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
