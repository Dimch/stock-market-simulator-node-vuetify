<script setup>
import LoginForm from './LoginForm.vue';
</script>

<template>
  <v-row class="position-relative" no-gutters>
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-card class="login-box surfopac-8">
            <v-card-text class="pa-sm-10 pa-6">
              <login-form />
            </v-card-text>
          </v-card>
        </div>
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
