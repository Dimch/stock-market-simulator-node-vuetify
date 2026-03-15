<script setup>
import {useImageStore} from '@/stores/images';
const {bgConstructionImage: bgImageClass} = useImageStore();
</script>

<template>
  <v-row no-gutters :class="['bg-container', bgImageClass]" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <v-sheet class="message-card text-center">
        <h1 class="text-md-h1 text-h2 mt-9 mb-3">Under Construction</h1>
        <p class="text-h6 construction-content">
          Hey, please come back later. We are doing some maintenance.
        </p>
        <v-btn variant="flat" color="primary" to="/console/admin/dashboards/market">
          Back
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.message-card {
  color: rgb(var(--v-theme-on-primary));
  background-color: rgba(var(--v-theme-on-surface), 0.8);
  border-radius: 3px;
  padding: 2rem;
   @media (min-width: 0px) {
    width: 90%;
   }
   @media (min-width: 768px) {
    width: 600px;
   }
}
.construction-content {
  color: rgba(var(--v-theme-on-primary), 0.6);
  width: 83%;
  margin-inline: auto;
  margin-bottom: 2.5rem;
}
</style>
