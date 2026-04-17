<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <v-card class="title-card" variant="text" rounded="md">
    <v-card-item class="pb-2 px-0 pt-0">
      <v-card-title class="text-h5">{{ title }}</v-card-title>
    </v-card-item>
    <v-card-text variant="outlined" :class="$attrs.class">
      <slot />
    </v-card-text>
  </v-card>
</template>
