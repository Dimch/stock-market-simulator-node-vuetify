<script setup>
// assets
import dashboard from '@/assets/images/landing/bg-mockup-default.png';
import technology from '@/assets/images/landing/technology.svg';

// icons
import {EyeOutlined} from '@ant-design/icons-vue';
</script>

<template>
  <div class="home-bg">
    <v-container class="maxWidth">
      <img :src="dashboard" alt="dashboard" class="HeaderImage d-none d-md-block" />
      <v-row class="spacer align-center">
        <v-col cols="12" lg="4" md="5">
          <div class="pr-lg-4 homeContent text-md-start text-center">
            <h1 class="bannerText mb-5 text-white" data-aos="fade-up" data-aos-duration="500">
              Carefully Crafted for your <span class="text-primary">Caring Vue</span> Project
            </h1>
            <p class="mb-8 text-h5 font-weight-regular text-white" data-aos="fade-up" data-aos-duration="800">
              StockSimulator is a blazing-fast marketplace with Bluetooth built using the Vuetify library.
            </p>
            <div data-aos="fade-up" class="d-flex flex-wrap ga-2 justify-md-start justify-center" data-aos-duration="1000">
              <v-btn color="primary" size="large" variant="outlined" to="/components/buttons">Explore components</v-btn>
              <v-btn color="primary" size="large" to="/console/admin/dashboards/security">
                <template #prepend>
                  <EyeOutlined />
                </template>
                Live Preview
              </v-btn>
            </div>
            <div data-aos="fade-up" data-aos-duration="1400">
              <v-img :src="technology" alt="technology" width="281" class="mx-md-0 mx-auto mt-8" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
.home-bg {
  position: relative;
  background: #141414;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: linear-gradient(329.36deg, rgb(0, 0, 0) 14.79%, rgba(67, 67, 67, 0.28) 64.86%);
  }
}
.homeContent {
  position: relative;
  z-index: 2;
}
.bannerText {
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
.HeaderImage {
  display: block;
  object-fit: cover;
  position: absolute;
  z-index: 1;
  width: 65%;
  right: -2%;
  top: 8%;
  [dir='rtl'] & {
    right: unset;
    left: -2%;
  }
}
.widget1 {
  position: absolute;
  top: -40px;
  right: -170px;
  width: 290px;
  animation: 10s slideY linear infinite;
}
.widget2 {
  position: absolute;
  bottom: -90px;
  left: 300px;
  width: 280px;
  animation: 10s slideY linear infinite;
  animation-delay: 2s;
}
.widgetImages {
  max-width: 100%;
  filter: drop-shadow(0px 0px 50px rgb(33 150 243 / 30%));
}
</style>
