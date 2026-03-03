<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// component content
const page = ref({title: 'Time pickers'});
const subContent = ref({
  content:
    'The v-time-picker is stand-alone component that can be utilized in many existing Vuetify components. It offers the user a visual representation for selecting the time.'
});
const path = ref({filepath: 'src/views/forms/components/timepicker'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/time-pickers'});

const timeStep = ref('10:10');
const allowedStep = (m) => m % 10 === 0;

const start = ref(undefined);
const end = ref(undefined);

const picker = ref(null);
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink" />
  <v-row>
    <!-- Basic -->
    <v-col cols="12" lg="6">
      <UiParentCard title="Basic">
        <v-time-picker />
      </UiParentCard>
    </v-col>
    <!-- Allowed times -->
    <v-col cols="12" lg="6">
      <UiParentCard title="Allowed times">
        <v-time-picker v-model="timeStep" :allowed-minutes="allowedStep" format="24hr" />
      </UiParentCard>
    </v-col>
    <!-- Colors -->
    <v-col cols="12" lg="6">
      <UiParentCard title="Colors">
        <v-time-picker color="success" />
      </UiParentCard>
    </v-col>
    <!-- No header -->
    <v-col cols="12" lg="6">
      <UiParentCard title="No header">
        <v-time-picker hide-header />
      </UiParentCard>
    </v-col>
    <!-- Range -->
    <v-col cols="12">
      <UiParentCard title="Range">
        <v-row>
          <v-col cols="12" lg="6">
            <h2>Start:</h2>
            <v-time-picker v-model="start" :max="end" />
          </v-col>
          <v-col cols="12" lg="6">
            <h2>End:</h2>
            <v-time-picker v-model="end" :min="start" />
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
    <!-- Scrollable -->
    <v-col cols="12" lg="6">
      <UiParentCard title="Scrollable">
        <v-time-picker v-model="picker" scrollable />
      </UiParentCard>
    </v-col>
    <!-- Use seconds -->
    <v-col cols="12" lg="6">
      <UiParentCard title="Use seconds">
        <v-time-picker use-seconds />
      </UiParentCard>
    </v-col>
  </v-row>
</template>
