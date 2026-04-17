<script setup>
import {shallowRef} from 'vue';
import navItems from './navItems';

import NavGroup from './NavGroup.vue';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';
import UserProfile from './UserProfile.vue';
import Logo from '../shared/Logo.vue';

const sidebarMenu = shallowRef(navItems);
const sidebarDrawer = shallowRef(true);
const miniSidebar = shallowRef(false);
</script>

<template>
  <v-navigation-drawer v-model="sidebarDrawer" left elevation="0" rail-width="60"
    app mobile-breakpoint="lg" class="leftSidebar" :rail="miniSidebar" expand-on-hover>
    <div class="pa-5">
      <logo />
    </div>

    <perfect-scrollbar class="scrollnavbar" :options="{suppressScrollX: true}">
      <v-list aria-busy="true" aria-label="menu list">
        <template v-for="item in sidebarMenu" :key="item.title">
          <nav-group v-if="item.header" :item="item" />
          <v-divider v-else-if="item.divider" class="my-3" />
          <nav-collapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" />
          <nav-item v-else :item="item" />
        </template>
      </v-list>
    </perfect-scrollbar>

    <user-profile />
  </v-navigation-drawer>
</template>
