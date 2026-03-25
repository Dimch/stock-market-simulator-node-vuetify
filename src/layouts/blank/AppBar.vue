<script setup>
import {ref} from 'vue';
import {useDisplay, useTheme} from 'vuetify';
import Logo from '@/layouts/dashboard/shared/Logo.vue';
import ThemeModeToggle from '@/components/ThemeModeSwitch.vue';

const appVersion = '1.0';

const theme = useTheme();
const {mdAndUp} = useDisplay();
const drawer = ref(false);

const menuItems = [
  {title: 'Dashboard', to: '/console/admin/dashboards/security'},
  {title: 'Components', to: '/console/admin/dashboards/market'},
  {title: 'Documentation', to: '/console/admin/dashboards/market'},
];
</script>

<template>
  <v-app-bar elevation="0" flat border="0"
             :class="['border-bottom', 'position-fixed', theme.global.name.value]">
    <v-container class="fill-height maxWidth">
      <div class="d-flex align-center ga-2 w-100">
        <div class="d-flex align-center ga-2">
          <Logo />
          <v-chip label variant="outlined" color="secondary" size="small" class="px-3">
            {{ appVersion }}
          </v-chip>
        </div>
        <v-spacer />
        <template v-if="mdAndUp">
          <v-btn v-for="(link, i) in menuItems" :key="i" variant="text" :to="link.to">
            {{ link.title }}
          </v-btn>
        </template>
        <template v-else>
          <v-btn icon="mdi-menu" rounded="sm" variant="text" size="small"
                 @click.stop="drawer = !drawer" />
        </template>
        <theme-mode-toggle class="ms-2" />
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="top" style="height: 210px; position: fixed" floating v-if="!mdAndUp">
    <v-list color="primary">
      <v-list-item v-for="(link, i) in menuItems" :key="i" :to="link.to" :title="link.title" prepend-icon="mdi-minus" />
    </v-list>
  </v-navigation-drawer>
</template>
