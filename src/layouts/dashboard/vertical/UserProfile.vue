<script setup>
import {useAdminAuthStore} from '@/stores/auth';

const authStore = useAdminAuthStore();
</script>
<template>
  <v-sheet rounded="0" class="px-4 py-3 sidebar-user">
    <div class="d-flex align-center">
      <v-avatar size="40" color="primary" variant="tonal">
        <img src="@/assets/images/users/avatar-1.png" width="40" :alt="authStore.user?.name" />
      </v-avatar>
      <div class="px-3">
        <h6 class="text-h6 mb-0">{{ authStore.user?.name }}</h6>
        <p class="text-lightText text-body-2 mb-0">{{ authStore.user?.email }}</p>
      </div>
      <div class="ms-auto">
        <v-btn variant="flat" size="small" icon rounded>
          <v-icon icon="mdi-chevron-right" />
          <v-menu activator="parent" :close-on-content-click="false">
            <v-sheet rounded="md" width="110" elevation="24">
              <v-list>
                <v-list-item class="no-spacer" min-height="33" @click="authStore.logout()">
                  <v-list-item-title class="text-h6">Logout</v-list-item-title>
                </v-list-item>
                <v-list-item class="no-spacer" to="/app/user/userprofile" min-height="33">
                  <v-list-item-title class="text-h6">Profile</v-list-item-title>
                </v-list-item>
                <v-list-item class="no-spacer" to="/app/user/account-profile/profile1" min-height="33">
                  <v-list-item-title class="text-h6">My account</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss">
.sidebar-user {
  border-top: 2px solid rgba(var(--v-theme-borderLight), 0.8);
  .px-3 {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .v-btn {
    .anticon {
      transition: 0.5s;
    }
    &[aria-expanded='true'] {
      .anticon {
        transform: rotate(-90deg);
        transition: 0.5s;
      }
    }
  }
}
</style>
