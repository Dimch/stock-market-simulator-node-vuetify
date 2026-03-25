<script setup>
import technology from '@/assets/images/landing/technology.svg';
import Top6Performers from '@/views/widgets/Top6Performers.vue';
</script>

<template>
  <div :class="['home-bg']">
    <v-container class="maxWidth">
      <v-row class="spacer align-center">
        <v-col cols="12" lg="8" md="6">
          <div class="pr-lg-5 pa-10 home-content text-md-start text-center">
            <h1 class="banner-text mb-5 text-on-surface">
              Carefully Crafted for your <span class="text-primary">Caring Vue</span> Project
            </h1>
            <p class="mb-8 text-h5 font-weight-regular text-on-surface">
              StockSimulator is a blazing-fast marketplace with Bluetooth built using the Vuetify library.
            </p>
            <div class="d-flex flex-wrap ga-2 justify-md-start text-center">
              <v-btn color="primary" size="large" variant="outlined" to="/components/buttons">Explore components</v-btn>
              <v-btn color="primary" size="large" to="/console/admin/dashboards/security"
                     prepend-icon="mdi-eye" p>
                Live Preview
              </v-btn>
            </div>
            <div>
              <v-img :src="technology" alt="technology" width="281" class="mx-md-0 mx-auto mt-8" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="3" md="2" class="top-6">
          <v-card class="surfopac-8">
            <v-card-text>
              <top6-performers />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
.home-bg {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 69px);
  display: flex;
  align-items: center;
}
.home-content {
  background-color: rgba(var(--v-theme-surface), 0.8);
  position: relative;
  z-index: 2;
}
.banner-text {
  font-size: 2.5rem;
  line-height: 1.3;
  font-weight: 700;
  @media (max-width: 1264px) {
    font-size: 2rem;
  }
  @media (max-width: 800px) {
    font-size: 2rem;
  }
  @media (max-width: 768px) {
    font-size: 1.825rem;
  }
}
.top-6 {
  
}
</style>
