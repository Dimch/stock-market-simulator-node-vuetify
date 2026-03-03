<script setup>
import {ref} from 'vue';
import Appbar from './Components/AppBarMenu.vue';
import DarkFooter from './Components/DarkFooter.vue';
import BannerInnerpage from './Components/BannerInnerpage.vue';

const checked = ref(true);
</script>

<template>
  <v-layout class="flex-column">
    <Appbar />
    <v-row class="justify-center">
      <v-col cols="12" class="pb-0">
        <BannerInnerpage
          subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    "
        >
        </BannerInnerpage>
      </v-col>
      <v-col cols="12" md="8" lg="7" class="pt-0">
        <div>
          <v-card elevation="0" class="pa-6 py-md-16 py-12 v-col-lg-10 offset-lg-1">
            <v-row>
              <v-col class="text-center">
                <p class="text-primary text-h6 mb-2">Get In touch</p>
                <h2 class="text-h2 mb-2">Interact with us</h2>
                <p class="contact-content text-caption text-lightText mb-sm-6 mb-4">
                  The starting point for your next project based on easy-to-customize Vuetify © helps you build apps faster and better.
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6" sm="6">
                <v-text-field variant="outlined" color="primary" label="Name" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" sm="6">
                <v-text-field variant="outlined" color="primary" label="Company Name" hide-details> </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" sm="6">
                <v-text-field variant="outlined" color="primary" label="Email Address" hide-details> </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" sm="6">
                <v-text-field variant="outlined" color="primary" label="Phone number" type="number" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" sm="6">
                <v-select
                  label="Company Size"
                  role="link"
                  hide-details
                  variant="outlined"
                  color="primary"
                  :items="['1-5', '5-10', '10+']"
                ></v-select>
              </v-col>
              <v-col cols="12" lg="6" sm="6">
                <v-select
                  role="link"
                  label="Project Budget"
                  variant="outlined"
                  hide-details
                  color="primary"
                  :items="['Below $1000', '$1000 - $5000', 'Not Spacified']"
                ></v-select>
              </v-col>
              <v-col cols="12" lg="12" md="12">
                <v-textarea label="Message" hide-details variant="outlined" class="textarea-input" color="primary"></v-textarea>
              </v-col>
              <v-col cols="12" lg="8" md="8">
                <v-checkbox-btn color="primary" class="checkboxLabel" hide-details v-model="checked">
                  <template #label>
                    <p class="mb-0 text-h6">
                      By submitting this, you agree to the
                      <router-link to="/contact-us" class="mx-1 text-primary text-decoration-none"> Privacy Policy </router-link> and
                      <router-link to="/contact-us" class="mx-1 text-primary text-decoration-none"> Cookie Policy</router-link>
                    </p>
                  </template>
                </v-checkbox-btn>
              </v-col>
              <v-col cols="12" lg="4" md="4" class="text-end">
                <v-btn variant="flat" color="primary">Submit Now</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <DarkFooter />
  </v-layout>
</template>

<style lang="scss">
.contact-content {
  width: 50%;
  margin-inline: auto;
  @media (max-width: 1530px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
}
.checkboxLabel {
  .v-label {
    opacity: 1;
  }
}
</style>
