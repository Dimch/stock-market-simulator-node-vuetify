<script setup>
import {computed, ref, onMounted} from 'vue';

const relativeURL = ref('');

onMounted(async () => {
  try {
    relativeURL.value = import.meta.env.BASE_URL || '/'; // Fallback to '/'
  } catch (error) {
    console.error('Error url not found:', error);
  }
});

const footerLink = computed(() =>
  [
    {
      title: 'About us',
      link: 'https://github.com/Dimch'
    },
    {
      title: 'Privacy',
      link: 'privacy-policy'
    },
    {
      title: 'Terms',
      link: 'privacy-policy'
    }
  ].map((item) => ({
    ...item,
    link: item.link.startsWith('http') ? item.link : `${relativeURL.value}${item.link}`
  }))
);
</script>
<template>
  <v-footer class="px-0 footer">
    <v-row justify="center" no-gutters>
      <v-col cols="6">
        <p class="text-caption mb-0">
          Distributed under MIT licence.
        </p>
      </v-col>
      <v-col class="text-end" cols="6">
        <template v-for="(item, idx) in footerLink" :key="idx">
           <a :href="item.link" target="_blank" class="mx-2 text-caption">
             {{ item.title }}
           </a>
        </template>
      </v-col>
    </v-row>
  </v-footer>
</template>
