<script setup>
// icons
import {
  TeamOutlined,
  UserAddOutlined,
  RightOutlined,
  DribbbleOutlined,
  InstagramOutlined,
  FacebookFilled,
  LinkedinFilled
} from '@ant-design/icons-vue';
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="outlined" elevation="0" class="bg-surface">
        <div class="d-flex ga-6 align-center pa-4 border-bottom">
          <v-btn icon variant="flat" size="large" rounded="md" class="text-primary" color="lightprimary">
            <TeamOutlined :style="{fontSize: '18px'}" />
          </v-btn>
          <div>
            <h2 class="text-h3 text-primary mb-n1">239K</h2>
            <small>Friends</small>
          </div>
          <v-btn icon variant="flat" rounded class="ms-auto">
            <RightOutlined :style="{fontSize: '12px'}" />
          </v-btn>
        </div>
        <div class="d-flex ga-6 pa-4 align-center">
          <v-btn icon variant="flat" size="large" rounded="md" class="text-secondary" color="lightsecondary">
            <UserAddOutlined :style="{fontSize: '18px'}" />
          </v-btn>
          <div>
            <h2 class="text-h3 text-secondary mb-n1">234K</h2>
            <small>Followers</small>
          </div>
          <v-btn icon variant="flat" rounded class="ms-auto">
            <RightOutlined :style="{fontSize: '12px'}" />
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card variant="outlined" elevation="0" class="bg-surface text-body-1">
        <v-card-item>
          <h4 class="text-h4 mb-0">About</h4>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
          <p class="mb-5 text-body-1">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <div class="d-flex ga-4 mb-5">
            <DribbbleOutlined :style="{fontSize: '20px'}" class="text-info" />
            <a href="" class="link text-truncate">https://github.com/</a>
          </div>
          <div class="d-flex ga-4 mb-5">
            <InstagramOutlined :style="{fontSize: '20px'}" class="text-error" />
            <a href="" class="link text-truncate">https://www.instagram.com</a>
          </div>
          <div class="d-flex ga-4 mb-5">
            <FacebookFilled :style="{fontSize: '20px'}" class="text-primary" />
            <a href="" class="link text-truncate"> https://www.facebook.com</a>
          </div>
          <div class="d-flex ga-4 mb-5">
            <LinkedinFilled :style="{fontSize: '20px'}" />
            <a href="" class="link text-truncate">https://in.linkedin.com</a>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
