<script setup>
import {useTheme} from 'vuetify';
import ProfileDropdown from '../shared/ProfileMenu.vue';
import SearchBar from '../shared/SearchBarPanel.vue';
import ThemeModeToggle from '@/components/ThemeModeSwitch.vue';
import {useAdminAuthStore} from '@/stores/auth';

const theme = useTheme();
const authStore = useAdminAuthStore();
</script>

<template>
  <v-app-bar elevation="0" height="60" :class="theme.global.name.value">
    <v-sheet class="d-none d-lg-block ms-10" width="250">
      <search-bar />
    </v-sheet>

    <v-spacer />

    <theme-mode-toggle class="ms-2" />

    <v-btn class="profileBtn" variant="text" rounded="sm">
      <div class="d-flex align-center">
        <v-avatar icon="mdi-account-circle" v-tooltip="authStore.user?.name"
                  class="me-sm-2 me-0 py-2" />
        <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">
          {{ authStore.user?.name }}
        </h6>
      </div>
      <v-menu activator="parent" :close-on-content-click="false" offset="8, 0">
        <v-sheet rounded="md" width="290">
          <profile-dropdown />
        </v-sheet>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>
