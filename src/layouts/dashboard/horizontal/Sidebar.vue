<script setup>
import {shallowRef} from 'vue';
import {useDisplay} from 'vuetify';
import {useCustomizerStore} from '@/stores/customizer';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';
import VerticalSidebar from '../vertical/Sidebar.vue';
import navItems from './navItems';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(navItems);
const {mdAndUp} = useDisplay();
</script>

<template>
  <template v-if="mdAndUp">
    <div class="horizontalMenu">
      <v-container fluid class="py-0">
        <ul class="gap-1 horizontal-navbar px-0" :class="customizer.boxed ? 'maxWidth' : ''">
          <li v-for="(item, i) in sidebarMenu" :key="i" class="navItem">
            <NavCollapse v-if="item.children" :item="item" :level="0" />
            <NavItem v-else :item="item" />
          </li>
        </ul>
      </v-container>
    </div>
  </template>
  <div v-else class="mobile-menu">
    <VerticalSidebar />
  </div>
</template>
<style lang="scss"></style>
