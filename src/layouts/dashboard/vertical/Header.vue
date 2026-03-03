<script setup>
import {ref, watch} from 'vue';
import {useCustomizerStore} from '@/stores/customizer';
// icons
import {MenuFoldOutlined, WindowsOutlined, TranslationOutlined, SettingOutlined} from '@ant-design/icons-vue';

// shared components
import LanguageDD from '../shared/LanguageDD.vue';
import NotificationDD from '../shared/NotificationDD.vue';
import ProfileDD from '../shared/ProfileDD.vue';
import MegaMenuDD from '../shared/MegaMenuDD.vue';
import Searchbar from '../shared/SearchBarPanel.vue';
import {useAdminAuthStore} from '@/stores/auth';

const customizer = useCustomizerStore();
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
// watch(priority, (newPriority) => {
//   // yes, console.log() is a side effect
//   priority.value = newPriority;
// });
const authStore = useAdminAuthStore();
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="60">
    <v-btn class="hidden-md-and-down text-secondary me-3" color="darkText" icon rounded="sm"
           variant="text" size="small" @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)">
      <MenuFoldOutlined :style="{fontSize: '16px'}" />
    </v-btn>
    <v-btn class="hidden-lg-and-up text-secondary ms-3" color="darkText" icon rounded="sm"
           variant="text" size="small" @click.stop="customizer.SET_SIDEBAR_DRAWER">
      <MenuFoldOutlined :style="{fontSize: '16px'}" />
    </v-btn>

    <v-sheet class="d-none d-lg-block" width="250">
      <Searchbar />
    </v-sheet>

    <v-spacer />

    <v-btn icon class="text-secondary hidden-sm-and-down d-lg-block d-none" color="darkText"
           rounded="sm" size="small" variant="text">
      <WindowsOutlined :style="{fontSize: '16px'}" />
      <v-menu activator="parent" :close-on-content-click="false" offset="10, 320">
        <v-sheet width="1024" height="325" rounded="md" class="d-lg-block d-none">
          <MegaMenuDD />
        </v-sheet>
      </v-menu>
    </v-btn>

    <v-btn icon class="ms-sm-2 ms-1" color="darkText" rounded="sm" size="small">
      <TranslationOutlined :style="{fontSize: '16px'}" />
      <v-menu activator="parent" :close-on-content-click="false" location="bottom" offset="6, 80">
        <v-sheet rounded="md" width="200">
          <LanguageDD />
        </v-sheet>
      </v-menu>
    </v-btn>

    <NotificationDD />

    <v-btn class="customizer-btn ms-sm-2 ms-1" icon color="darkText" rounded="sm" size="small"
           variant="text" @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">
      <SettingOutlined class="icon" :style="{fontSize: '16px'}" />
    </v-btn>

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
