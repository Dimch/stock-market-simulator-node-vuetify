<script setup>
import {useI18n} from 'vue-i18n';
const {t} = useI18n();

import NavItem from './NavItem.vue';

const props = defineProps({item: Object, level: Number});
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Item Childern -->
  <!-- ---------------------------------------------- -->
  <v-list-group no-action>
    <!-- ---------------------------------------------- -->
    <!---Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template #activator="{props}">
      <v-list-item v-bind="props" :value="item.title" rounded class="mb-1" color="primary">
        <!---Icon  -->
        <template #prepend>
          <v-icon class="iconClass" size="small">mdi-{{ item.icon }}</v-icon>
        </template>
        <!---Title  -->
        <v-list-item-title class="me-auto">{{ t(item.title) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
          {{ t(item.subCaption) }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Sub Item-->
    <!-- ---------------------------------------------- -->
    <template v-for="(subitem, i) in item.children" :key="i">
      <NavCollapse :item="subitem" v-if="subitem.children" :level="props.level + 1" />
      <NavItem :item="subitem" :level="props.level + 1" v-else></NavItem>
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
