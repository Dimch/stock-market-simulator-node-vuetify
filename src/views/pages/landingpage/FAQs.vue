<script setup>
import {ref} from 'vue';
// assets
import worldMap from '@/assets/images/contact/worldMap.png';
import Appbar from './components/AppBarMenu.vue';
const panel = ref(['foo']);
</script>

<template>
  <v-layout class="flex-column">
    <Appbar />
    <v-row class="justify-center">
      <v-col cols="12" class="py-0">
        <v-main class="headerBg mx-0">
          <v-container class="maxWidth">
            <v-row class="align-center py-10">
              <v-col cols="12" md="5" sm="6">
                <div>
                  <h2 class="text-h2 mb-2">Question ? Look here.</h2>
                  <p class="text-h6 text-lightText mb-0">Please refer the Frequently ask question for your quick help</p>
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
      </v-col>
      <v-col cols="12" md="8" lg="7" class="pt-0">
        <div class="py-md-16 py-8 px-4">
          <v-card elevation="0" class="py-0">
            <div class="text-center">
              <h2 class="text-h2 mb-2">FAQ</h2>
              <p class="contact-content text-caption text-lightText mb-sm-6 mb-4">Can't find answer? Too baaad...</p>
            </div>
            <v-expansion-panels v-model="panel" multiple>
              <v-expansion-panel elevation="0" title="Do I need license?"
                                 text="You will need a government-issued license of a certified golddigger." value="license" />
              <v-expansion-panel elevation="0" title="What Support Includes?"
                                 text="Absolutely nothing - you are on your own from here on, buddy." value="support" />
              <v-expansion-panel elevation="0" title="Do you support money?"
                                 text="Yeees, money is our core business." value="money"
              ></v-expansion-panel>
              <v-expansion-panel elevation="0" title="Is there a roadmap to riches?"
                                 text="Are you nuts? Of course not! Try anything you want, we will watch you fail." value="pff"
              ></v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-layout>
</template>
<style lang="scss">
.headerBg {
  background-color: rgb(var(--v-theme-gray100));
  padding-top: 69px;
  flex: unset;
}
.mailImage {
  margin-top: -50px;
}
</style>
