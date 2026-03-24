<script setup>
import ProfileDD from '../shared/ProfileDD.vue';
import Searchbar from '../shared/SearchBarPanel.vue';
import {useAdminAuthStore} from '@/stores/auth';

const authStore = useAdminAuthStore();
</script>

<template>
  <v-app-bar elevation="0" height="60">
    <v-btn class="hidden-md-and-down text-secondary me-3" color="darkText" icon rounded="sm"
           variant="text" size="small" @click.stop="">
      <v-icon icon="mdi-menu-fold" />
    </v-btn>
    <v-btn class="hidden-lg-and-up text-secondary ms-3" color="darkText" icon rounded="sm"
           variant="text" size="small" @click.stop="">
      <v-icon icon="mdi-menu-fold" />
    </v-btn>

    <v-sheet class="d-none d-lg-block" width="250">
      <Searchbar />
    </v-sheet>

    <v-spacer />

    <v-btn class="profileBtn" variant="text" rounded="sm">
      <div class="d-flex align-center">
        <v-avatar class="me-sm-2 me-0 py-2">
          <img src="@/assets/images/users/avatar-1.png" :alt="authStore.user?.name" />
        </v-avatar>
        <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">{{ authStore.user?.name }}</h6>
      </div>
      <v-menu activator="parent" :close-on-content-click="false" offset="8, 0">
        <v-sheet rounded="md" width="290">
          <ProfileDD />
        </v-sheet>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>
