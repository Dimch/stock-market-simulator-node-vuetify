<script setup>
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- searchbar -->
  <!-- ---------------------------------------------- -->
  <v-text-field persistent-placeholder placeholder="Ctrl + k" color="primary" variant="outlined" hide-details density="compact">
    <template #prepend-inner>
      <v-icon icon="mdi-magnify" color="rgb(var(--v-theme-lightText))" />
    </template>
  </v-text-field>
</template>
