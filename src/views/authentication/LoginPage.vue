<script setup>
import Logo from '@/layouts/dashboard/shared/Logo.vue';
import LoginForm from './LoginForm.vue';
import AuthFooter from './Footer.vue';
import {useImageStore} from '@/stores/images';
const {bgLoginImage: bgImageClass} = useImageStore();
</script>

<template>
  <v-row :class="['bg-container', 'position-relative', bgImageClass]" no-gutters>
    <div class="blur-bg">
      <!-- put some background image here? -->
    </div>
    <v-toolbar class="px-6 surfopac-8">
      <Logo />
    </v-toolbar>
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-card class="login-box surfopac-8 rounded-lg">
            <v-card-text class="pa-sm-10 pa-6">
              <LoginForm />
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-col>
    <v-col cols="12">
      <v-container class="pt-0 pb-6">
        <AuthFooter />
      </v-container>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.login-box {
  max-width: 475px;
  margin: 0 auto;
}
</style>
