<script setup>
const footerLink = [
  {title: 'Terms and Conditions'},
  {title: 'Privacy Policy'},
  {title: 'CA Privacy Notice'},
];
</script>
<template>
  <v-footer app class="py-4">
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="6" class="text-md-start text-center">
        <p class="text-subtitle-2 text-lightText">
          This work is protected by
          <a href="https://youtu.be/fgBc06l62bc?si=Uz5gCAUKhipmJD0k&t=43"
             target="_blank" class="text-primary">
            Tuchman Marsh
          </a>
          :-)
        </p>
      </v-col>
      <v-col class="d-flex flex-md-row flex-column justify-md-end align-center" cols="12" md="6">
        <a v-for="(item, i) in footerLink" :key="i" href="https://github.com/Dimch"
          target="_blank" class="mx-md-3 mx-2 mb-md-0 mb-2 text-subtitle-2 text-lightText">
          {{ item.title }}
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>
