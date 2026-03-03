<script setup>
import {ref, onMounted} from 'vue';
import {string} from 'yup';
import {useI18n} from 'vue-i18n';
const {t} = useI18n();

const props = defineProps({item: Object, level: Number});

const relativeURL = ref(string);

onMounted(async () => {
  try {
    relativeURL.value = await import.meta.env.BASE_URL;
  } catch (error) {
    console.error('Error url not found:', error);
  }
});
</script>

<template>
  <!---Single Item-->
  <v-list-item :to="item.type === 'external' ? '' : item.to" :href="item.type === 'external' ? item.to : ''" rounded class="mb-1"
               color="primary" :disabled="item.disabled" :target="item.type === 'external' ? '_blank' : ''">
    <!---If icon-->
    <template #prepend>
      <component :is="item.icon" class="iconClass" :level="level"></component>
    </template>
    <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
    <!---If Caption-->
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ t(item.subCaption) }}
    </v-list-item-subtitle>
    <!---If any chip or label-->
    <template v-if="item.chip" #append>
      <v-chip label :color="item.chipColor" class="sidebarchip hide-menu"
              size="small" :variant="item.chipVariant" :prepend-icon="item.chipIcon" >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>
