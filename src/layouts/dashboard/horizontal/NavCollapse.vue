<script setup>
import NavItem from './NavItem.vue';

const props = defineProps({item: Object, level: Number});
</script>

<template>
  <!---Dropdown  -->
  <a class="navItemLink rounded-md cursor-pointer">
    <!---Icon  -->
    <i class="navIcon">
      <v-icon>mdi-{{ props.item.icon }}</v-icon>
    </i>
    <!---Title  -->
    <span class="me-auto">{{ item.title }}</span>
    <!---If Caption-->
    <small v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </small>
    <i class="ddIcon ms-2"><v-icon>mdi-chevron-right</v-icon></i>
  </a>
  <!---Sub Item-->
  <ul :class="`ddMenu px-0 ddLevel-${level + 1}`">
    <li v-for="(subitem, i) in item.children" :key="i" class="navItem rounded-0">
      <NavCollapse v-if="subitem.children" :item="subitem" :level="props.level + 1" />
      <NavItem v-else :item="subitem" :level="props.level + 1" />
    </li>
  </ul>
  <!---End Item Sub Header -->
</template>
