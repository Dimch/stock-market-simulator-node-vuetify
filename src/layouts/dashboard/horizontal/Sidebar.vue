<script setup>
import {shallowRef} from 'vue';
import {useDisplay} from 'vuetify';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';
import VerticalSidebar from '../vertical/Sidebar.vue';
import navItems from './navItems';

const sidebarMenu = shallowRef(navItems);
const {mdAndUp} = useDisplay();
</script>

<template>
  <template v-if="mdAndUp">
    <div class="horizontalMenu">
      <v-container fluid class="py-0">
        <ul class="gap-1 horizontal-navbar px-0">
          <li v-for="(item, i) in sidebarMenu" :key="i" class="navItem">
            <component :is="item.children ? NavCollapse : NavItem"
                       :item="item" :level="0" />
          </li>
        </ul>
      </v-container>
    </div>
  </template>
  <div v-else class="mobile-menu">
    <vertical-sidebar />
  </div>
</template>
<style lang="scss"></style>
