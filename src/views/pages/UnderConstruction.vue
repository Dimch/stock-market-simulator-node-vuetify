<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();
</script>

<template>
  <v-row no-gutters style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <v-card class="message-card surfopac-8 text-center elevation-6">
        <h1 class="text-md-h1 text-h2 mt-9 mb-3">
          under construction
        </h1>
        <p class="text-h6 content">
          Hello, please come back later. We are doing some maintenance...
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
