<script setup>
import {FacebookFilled, LinkedinFilled, TwitterSquareFilled} from '@ant-design/icons-vue';
</script>

<template>
  <div class="text-center">
    <v-avatar size="124" variant="outlined" color="primary" class="border-dashed">
      <img src="@/assets/images/profile/user-profile-1.png" width="124" alt="profile" />
      <input type="file" class="preview-upload" aria-label="upload file" />
    </v-avatar>
    <h5 class="text-h5 pt-5 mb-1">Stebin Ben</h5>
    <p class="text-h6 text-lightText">Full Stack Developer</p>
    <v-list class="d-flex justify-center py-0" aria-label="social links" aria-busy="true">
      <v-list-item class="px-3" href="/app/user/userprofile">
        <TwitterSquareFilled class="text-twitter" :style="{fontSize: '18px'}" />
      </v-list-item>
      <v-list-item class="px-3" href="/app/user/userprofile">
        <FacebookFilled class="text-facebook" :style="{fontSize: '18px'}" />
      </v-list-item>
      <v-list-item class="px-3" href="/app/user/userprofile">
        <LinkedinFilled class="text-linkedin" :style="{fontSize: '18px'}" />
      </v-list-item>
    </v-list>
    <div class="my-4 mb-8 d-flex align-center ga-2">
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">86</h5>
        <span class="text-h6 text-lightText">Post </span>
      </div>
      <v-divider vertical></v-divider>
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">40</h5>
        <span class="text-h6 text-lightText">Project </span>
      </div>
      <v-divider vertical></v-divider>
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">4.5K</h5>
        <span class="text-h6 text-lightText">Members </span>
      </div>
    </div>
  </div>
</template>
