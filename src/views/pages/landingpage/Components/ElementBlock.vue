<script setup>
import {ref} from 'vue';
// assets
import imageElement from '@/assets/images/landing/img-element-main.png';
import Element1 from '@/assets/images/landing/img-element-msg.png';
import Element2 from '@/assets/images/landing/img-element-widget.png';

// icons
import {CheckCircleOutlined} from '@ant-design/icons-vue';

const List1 = ref(['1 Auth Methods', 'Code Splitting', 'CRUD Application']);
const List2 = ref(['Internationalization Support', 'Smart search', 'Light/Dark, Semi Dark Support']);
const List3 = ref(['Vue 3 Composition Api', 'Google Fonts', 'Prettier Code Style']);
</script>
<template>
  <div class="spacer elementSection">
    <v-container class="maxWidth pb-0">
      <v-row class="justify-center">
        <v-col md="5" cols="12">
          <div class="text-center">
            <h2 class="text-h2 mt-0 mb-4">
              Achieve <span class="text-primary"> wealth </span> with Marketplace Simulator
            </h2>
            <p class="text-h6 mb-0">Create your powerful money-extracting stocks strategies in seconds!</p>
          </div>
        </v-col>
        <v-col md="12" cols="12"></v-col>
        <v-col xl="10" md="8" sm="10" cols="10" class="pb-0">
          <div class="position-relative">
            <v-img :src="imageElement" alt="chat app" />
            <v-img :src="Element1" class="element1 d-md-block d-none" alt="animation block" />
            <v-img :src="Element2" class="element2 d-md-block d-none" alt="animation block" />
          </div>
          <v-row class="mt-5">
            <v-col cols="12" md="4" sm="6" class="py-0">
              <v-list style="background: transparent" class="py-0" aria-label="list" aria-busy="true">
                <v-list-item v-for="list in List1" :key="list">
                  <template #prepend>
                    <CheckCircleOutlined :style="{fontSize: '18px', color: 'rgb(var(--v-theme-primary))'}" class="me-2" />
                  </template>
                  <v-list-item-title class="text-h6 text-secondary"> {{ list }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4" sm="6" class="py-0">
              <v-list style="background: transparent" class="py-0" aria-label="list" aria-busy="true">
                <v-list-item v-for="list in List2" :key="list">
                  <template #prepend>
                    <CheckCircleOutlined :style="{fontSize: '18px', color: 'rgb(var(--v-theme-primary))'}" class="me-2" />
                  </template>
                  <v-list-item-title class="text-h6 text-secondary"> {{ list }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4" sm="6" class="py-0">
              <v-list style="background: transparent" class="py-0" aria-label="list" aria-busy="true">
                <v-list-item v-for="list in List3" :key="list">
                  <template #prepend>
                    <CheckCircleOutlined :style="{fontSize: '18px', color: 'rgb(var(--v-theme-primary))'}" class="me-2" />
                  </template>
                  <v-list-item-title class="text-h6 text-secondary"> {{ list }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
.elementSection {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 45%;
    bottom: 0;
    left: 0;
    background: #141414;
    z-index: -1;
    @media (max-width: 600px) {
      height: 60%;
    }
  }
}
.element1 {
  width: 205px;
  position: absolute;
  top: 3%;
  right: -17%;
  animation: 10s slideY linear infinite;
}
.element2 {
  position: absolute;
  width: 207px;
  bottom: 20%;
  left: -17%;
  animation: 10s slideY linear infinite;
}
</style>
