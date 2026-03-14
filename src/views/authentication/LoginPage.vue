<script setup>
import Logo from '@/layouts/dashboard/shared/Logo.vue';
import LoginForm from './LoginForm.vue';
import AuthFooter from './Footer.vue';
</script>

<template>
  <v-row class="bg-containerBg position-relative" no-gutters>
    <div class="blur-bg">
      <!-- put some background image here? -->
    </div>
    <v-col cols="12">
      <div class="pt-6 ps-6">
        <Logo />
      </div>
    </v-col>
    <!---Login Part-->
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="3">
                  <v-card-text class="pa-sm-10 pa-6">
                    <LoginForm />
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Login Part-->
    <v-col cols="12">
      <v-container class="pt-0 pb-6">
        <AuthFooter />
      </v-container>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
