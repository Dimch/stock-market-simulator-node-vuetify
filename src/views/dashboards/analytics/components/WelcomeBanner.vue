<script setup>
// assets
import Banner from '@/assets/images/analytics/welcome-banner.png';
import Arrow from '@/assets/images/analytics/welcome-arrow.png';
</script>

<template>
  <v-card class="welcomeBanner text-white" elevation="0">
    <v-card-text class="py-5 px-md-12 px-6">
      <v-row>
        <v-col cols="12" md="6">
          <div class="pb-md-8 pt-md-7 pt-5 pb-6">
            <h2 class="text-h2">Welcome to Future</h2>
            <p class="text-h6">
              The purpose of a product update is to add new features, fix bugs or improve the performance of the product.
            </p>
            <v-btn color="white" variant="outlined">View full statistic</v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-md-block d-none">
          <div class="text-end pe-8">
            <v-img :src="Banner" cover class="ms-auto" width="267" alt="welcome banner" />
            <v-img :src="Arrow" class="arrowImg" cover width="40" alt="welcome arrow" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
.welcomeBanner {
  background: var(--v-gradient);
  [dir='rtl'] & {
    background: var(--v-gradientRtl);
  }
  .arrowImg {
    position: absolute;
    right: 6%;
    bottom: 30px;
    [dir='rtl'] & {
      left: 6%;
      right: unset;
    }
  }
}
</style>
