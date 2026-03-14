<script setup>
import {ref} from 'vue';
// icons
import {MenuOutlined, LineOutlined} from '@ant-design/icons-vue';

import Logo from '@/layouts/dashboard/shared/Logo.vue';
import {useDisplay} from 'vuetify';
import {useCustomizerStore} from '@/stores/customizer';

const customizer = useCustomizerStore();

const appVersion = '1.0';

const {mdAndUp} = useDisplay();
const drawer = ref(false);
</script>

<template>
  <v-app-bar
    elevation="0"
    flat
    height="69"
    class="border-bottom position-fixed"
    :color="customizer.actTheme === 'dark' ? 'surface' : '#141414'"
    border="0"
  >
    <v-container class="fill-height maxWidth">
      <div class="d-flex align-center ga-2 w-100">
        <div class="d-flex align-center ga-2">
          <Logo />
          <v-chip label variant="outlined" color="secondary" size="small" style="--v-chip-height: 22px; padding: 0 6px">{{
            appVersion
           }}</v-chip>
        </div>
        <v-spacer />
        <!-- ---------------------------------------------- -->
        <!---right part -->
        <!-- ---------------------------------------------- -->
        <template v-if="mdAndUp">
          <v-btn variant="text" to="/console/admin/dashboards/security">Dashboard</v-btn>
          <v-btn variant="text" to="/components/buttons">Components</v-btn>
          <v-btn variant="text" href="">Documentation</v-btn>
        </template>
        <template v-else>
          <v-btn icon rounded="sm" variant="text" size="small" @click.stop="drawer = !drawer">
            <MenuOutlined :style="{fontSize: '20px'}" />
          </v-btn>
        </template>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="top" style="height: 210px; position: fixed" floating v-if="!mdAndUp">
    <v-list color="primary">
      <v-list-item to="/console/admin/dashboards/security">
        <template #prepend>
          <LineOutlined />
        </template>

        <v-list-item-title class="ms-3">Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item to="/components/buttons">
        <template #prepend>
          <LineOutlined />
        </template>

        <v-list-item-title class="ms-3">Components</v-list-item-title>
      </v-list-item>
      <v-list-item to="">
        <template #prepend>
          <LineOutlined />
        </template>

        <v-list-item-title class="ms-3">Documentation</v-list-item-title>
      </v-list-item>
      <v-list-item to="">
        <template #prepend>
          <LineOutlined />
        </template>

        <v-list-item-title class="ms-3">Ask something</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
