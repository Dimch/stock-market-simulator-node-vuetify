<script setup>
// assets
import worldMap from '@/assets/images/contact/worldMap.png';
const props = defineProps({
  subtitle: String
});
</script>

<template>
  <v-main class="headerBg mx-0">
    <v-container class="maxWidth">
      <v-row class="align-center py-10">
        <v-col cols="12" md="5" sm="6">
          <div>
            <h2 class="text-h2 mb-2">
              Talk to our
              <span class="text-primary">Expert</span>
            </h2>
            <p class="text-h6 text-lightText mb-0">
              {{ props.subtitle }}
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6 offset-md-1" sm="6" class="d-none d-sm-block">
          <div class="position-relative">
            <img :src="worldMap" alt="mailImage" class="w-100 mailImage" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<style lang="scss">
.headerBg {
  background-color: rgb(var(--v-theme-gray100));
  padding-top: 69px;
}
.mailImage {
  margin-top: -50px;
}
</style>
