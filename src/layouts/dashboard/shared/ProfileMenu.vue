<script setup>
import {ref} from 'vue';
import {useAdminAuthStore} from '@/stores/auth';

const tab = ref(null);
const authStore = useAdminAuthStore();
</script>

<template>
  <div>
    <div class="d-flex align-center pa-5">
      <v-avatar icon="mdi-account" v-tooltip="authStore.user?.name" class="me-2" />
      <div>
        <h6 class="text-h6 mb-0">{{ authStore.user?.name }}</h6>
        <p class="text-caption mb-0">{{ authStore.user?.email }}</p>
      </div>
      <div class="ms-auto">
        <v-btn variant="text" color="primary" rounded="sm" icon size="large" @click="authStore.logout()">
          <v-icon icon="mdi-logout" />
        </v-btn>
      </div>
    </div>
    <v-tabs v-model="tab" color="primary" grow>
      <v-tab value="111" prepend-icon="mdi-account">Profile</v-tab>
      <v-tab value="222" prepend-icon="mdi-cog">Settings</v-tab>
    </v-tabs>
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 240px">
      <v-window v-model="tab">
        <v-window-item value="111">
          <v-list class="py-0" aria-label="profile list" aria-busy="true">
            <v-list-item title="Edit Profile" prepend-icon="mdi-pencil" color="primary" value="Edit profile" />
            <v-list-item title="View Profile" prepend-icon="mdi-account" color="primary" value="View Profile" />
            <v-list-item title="Social Profile" prepend-icon="mdi-account-box" color="primary" value="Social Profile" />
            <v-list-item title="Billing" prepend-icon="mdi-wallet" color="primary" value="Billing" />
            <v-list-item title="Logout" prepend-icon="mdi-logout" @click="authStore.logout()" color="secondary" />
          </v-list>
        </v-window-item>
        <v-window-item value="222">
          <v-list class="py-0" aria-label="settings list" aria-busy="true">
            <v-list-item title="Support" prepend-icon="mdi-help-circle" color="primary" value="Support" />
            <v-list-item title="Account settings" prepend-icon="mdi-account" color="primary" value="Account" />
            <v-list-item title="Privacy center" prepend-icon="mdi-lock" color="primary" value="Privacy" />
            <v-list-item title="Feedback" prepend-icon="mdi-comment" color="primary" value="Feedback" />
            <v-list-item title="History" prepend-icon="mdi-list-box" color="primary" value="History" />
          </v-list>
        </v-window-item>
      </v-window>
    </perfect-scrollbar>
  </div>
</template>
