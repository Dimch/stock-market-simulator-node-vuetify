<script setup>
import {ref, shallowRef} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// assets
import {UserOutlined, CameraFilled, FilterFilled, AimOutlined, FileTextFilled, CheckCircleFilled} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Floating Action Buttons'});
const subContent = ref({
  content: 'Floating action buttons can be attached to material to signify a promoted action in your application.'
});
const path = ref({filepath: 'src/views/ui-elements/advance/floatingaction'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/floating-action-buttons/'});

const hidden = ref(false);
const folders = shallowRef([
  {
    icon: CameraFilled,
    subtitle: 'Jan 9, 2024',
    title: 'Photos',
    color: 'warning'
  },
  {
    icon: FilterFilled,
    subtitle: 'Jan 7, 2024',
    title: 'Work',
    color: 'primary'
  },
  {
    icon: AimOutlined,
    subtitle: 'July 20, 2024',
    title: 'Vacation',
    color: 'info'
  }
]);
const folders2 = ref([
  {
    icon: FileTextFilled,
    subtitle: 'Jan 7, 2024',
    title: 'Vacation itinerary',
    color: 'primary'
  },
  {
    icon: CheckCircleFilled,
    subtitle: 'July 20, 2024',
    title: 'Kitchen remodel',
    color: 'info'
  }
]);
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Variant -->
        <v-col cols="12" md="6">
          <UiParentCard title="Basic variant">
            <div class="d-flex ga-2 align-start" style="height: 42px">
              <div style="min-width: 42px; height: 42px">
                <v-fab color="primary" icon>
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Default</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="primary" variant="outlined">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Outlined</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="primary" variant="tonal">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Tonal</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="primary" variant="flat">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Flat</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="primary" variant="text">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Text</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="primary" variant="plain">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Plain</span>
                  </v-tooltip>
                </v-fab>
              </div>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Size -->
        <v-col cols="12" md="6">
          <UiParentCard title="Size">
            <div class="d-flex ga-2 align-center" style="height: 58px">
              <div style="min-width: 58px; height: 58px">
                <v-fab icon color="primary" variant="tonal" size="x-large">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">x-large</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 50px; height: 50px">
                <v-fab icon color="primary" variant="tonal" size="large">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">large</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="primary" variant="tonal">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">default</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 34px; height: 34px">
                <v-fab icon color="primary" variant="tonal" size="small">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">small</span>
                  </v-tooltip>
                </v-fab>
              </div>
              <div style="min-width: 26px; height: 26px">
                <v-fab icon color="primary" variant="tonal" size="x-small">
                  <UserOutlined />
                  <v-tooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">x-small</span>
                  </v-tooltip>
                </v-fab>
              </div>
            </div>
          </UiParentCard>
        </v-col>
        <v-col cols="12">
          <UiParentCard title="Color">
            <div class="d-flex ga-2 align-start" style="height: 42px">
              <div style="min-width: 42px; height: 42px">
                <v-fab color="primary" variant="flat" icon><UserOutlined /></v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="secondary" variant="flat"><UserOutlined /></v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="success" variant="flat"><UserOutlined /></v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="warning" variant="flat"><UserOutlined /></v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="info" variant="flat"><UserOutlined /></v-fab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <v-fab icon color="error" variant="flat"><UserOutlined /></v-fab>
              </div>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Display Animation -->
        <v-col cols="12" md="6">
          <UiParentCard title="Display animation">
            <v-card class="mx-auto overflow-hidden" variant="outlined" max-width="360">
              <v-layout>
                <v-app-bar absolute color="surface" extended>
                  <v-app-bar-nav-icon />

                  <template #extension>
                    <v-fab
                      :active="!hidden"
                      color="primary"
                      class="ml-4"
                      icon="$plus"
                      location="bottom start"
                      size="small"
                      absolute
                      offset
                    />
                  </template>
                </v-app-bar>

                <v-main>
                  <v-sheet class="pa-4 text-center" color="containerBg" height="300">
                    <v-btn :text="hidden ? 'Show' : 'Hide'" color="surface-variant" width="80" @click="hidden = !hidden" />
                  </v-sheet>

                  <v-sheet height="125">
                    <v-fab :active="!hidden" class="mr-4" color="primary" icon="$plus" location="top end" absolute offset />
                  </v-sheet>
                </v-main>
              </v-layout>
            </v-card>
          </UiParentCard>
        </v-col>
        <!-- Small variant -->
        <v-col cols="12" md="6">
          <UiParentCard title="Small variant">
            <v-card class="mx-auto overflow-hidden" variant="outlined" max-width="365">
              <v-toolbar color="containerBg" extended light>
                <v-app-bar-nav-icon color="grey-darken-4" />

                <v-toolbar-title>My files</v-toolbar-title>

                <v-spacer />

                <v-btn color="grey-darken-4" icon="$magnify" />

                <template #extension>
                  <v-fab class="ml-4" color="primary" icon="$plus" location="bottom left" size="40" absolute offset></v-fab>
                </template>
              </v-toolbar>

              <v-list lines="two" subheader aria-label="list" aria-busy="true">
                <v-list-subheader title="Folders" inset />

                <v-list-item v-for="folder in folders" :key="folder.title" :subtitle="folder.subtitle">
                  <template #prepend>
                    <v-avatar
                      size="40"
                      :color="folder.color"
                      :class="`text-${folder.color} border-solid border-${folder.color} border-thin border-opacity-100`"
                      variant="tonal"
                    >
                      <!-- <SvgSprite :name="folder.icon || ''" style="width: 18px; height: 18px" /> -->
                      <component :is="folder.icon" />
                    </v-avatar>
                  </template>

                  <template #title>
                    <h5 class="text-h6 mb-0">{{ folder.title }}</h5>
                  </template>
                  <template #subtitle>
                    <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                  </template>
                </v-list-item>

                <v-divider inset />

                <v-list-subheader title="Files" inset></v-list-subheader>

                <v-list-item v-for="folder in folders2" :key="folder.title" :subtitle="folder.subtitle">
                  <template #prepend>
                    <v-avatar
                      size="40"
                      :color="folder.color"
                      :class="`text-${folder.color} border-solid border-${folder.color} border-thin border-opacity-100`"
                      variant="tonal"
                    >
                      <!-- <SvgSprite :name="folder.icon || ''" style="width: 18px; height: 18px" /> -->
                      <component :is="folder.icon" />
                    </v-avatar>
                  </template>

                  <template #title>
                    <h5 class="text-h6 mb-0">{{ folder.title }}</h5>
                  </template>
                  <template #subtitle>
                    <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
