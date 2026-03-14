<script setup>
import {shallowRef} from 'vue';
import {useCustomizerStore} from '../../../stores/customizer';
import navItems from './navItems';

import NavGroup from './NavGroup.vue';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';
import UserProfile from './UserProfile.vue';
import Logo from '../shared/Logo.vue';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(navItems);
</script>

<template>
  <v-navigation-drawer v-model="customizer.Sidebar_drawer" left elevation="0" rail-width="60"
    app mobile-breakpoint="lg" class="leftSidebar" :rail="customizer.mini_sidebar" expand-on-hover>
    <div class="pa-5">
      <Logo />
    </div>
    
    <perfect-scrollbar class="scrollnavbar" :options="{suppressScrollX: true}">
      <v-list aria-busy="true" aria-label="menu list">
        <template v-for="(item, i) in sidebarMenu">
          <NavGroup v-if="item.header" :item="item" :key="item.title" />
          <v-divider v-else-if="item.divider" class="my-3" />
          <NavCollapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" />
          <NavItem v-else :item="item" />
        </template>
      </v-list>
    </perfect-scrollbar>

    <UserProfile />
  </v-navigation-drawer>
</template>
