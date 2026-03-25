<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();
const titles = {
  404: '404 page not found',
  500: '500 internal server error',
};
const content = {
  404: 'Oops! This is not the page you are looking for. Nothing to see here. Carry on, move along...',
  500: 'Sorry! It\'s a piece of junk! Do not bother to check in later, move to greener pastures.',
};
</script>

<template>
  <v-row no-gutters class="overflow-hidden" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <v-card class="message-card surfopac-8 text-center elevation-6">
        <h1 class="text-md-h1 text-h2 mt-9 mb-3">
          {{ titles[router.currentRoute.value.name] || 'Error' }}
        </h1>
        <p class="text-h6 content">
          {{ content[router.currentRoute.value.name] || 'An unexpected error has occurred.' }}
        </p>
        <v-btn icon="mdi-arrow-u-left-top" variant="tonal" class="me-10"
               v-tooltip="`Back`" @click="router.back()" />
        <v-btn icon="mdi-home" variant="tonal"
               v-tooltip="`Home`" to="/console/admin/dashboards/market" />
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
</style>
