<script setup>
import {ref} from 'vue';
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {CopyOutlined, HomeOutlined, ShoppingCartOutlined} from '@ant-design/icons-vue';

const show = ref(false);

// component content
const page = ref({title: 'Tooltip'});
const subContent = ref({content: 'Tooltips display informative text when users hover over, focus on, or tap an element.'});
const path = ref({filepath: 'src/views/forms/plugins/tooltip'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/tooltips/'});
</script>
<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Simple Tooltips">
        <div class="d-flex flex-column flex-sm-row ga-4 justify-space-around">
          <v-btn variant="outlined" color="primary">
            Start
            <v-tooltip activator="parent" aria-label="tooltip" location="start">Tooltip</v-tooltip>
          </v-btn>

          <v-btn variant="outlined" color="primary">
            End
            <v-tooltip activator="parent" aria-label="tooltip" location="end">Tooltip</v-tooltip>
          </v-btn>

          <v-btn variant="outlined" color="primary">
            Top
            <v-tooltip activator="parent" aria-label="tooltip" location="top">Tooltip</v-tooltip>
          </v-btn>

          <v-btn variant="outlined" color="primary">
            Bottom
            <v-tooltip activator="parent" aria-label="tooltip" location="bottom">Tooltip</v-tooltip>
          </v-btn>
        </div>
      </UiParentCard>
    </v-col>
    <v-col cols="12" md="6">
      <UiParentCard title="Icon Tooltips">
        <div class="d-flex justify-space-around">
          <v-tooltip location="bottom" aria-label="tooltip">
            <template #activator="{props}">
              <v-icon color="primary" v-bind="props">
                <HomeOutlined />
              </v-icon>
            </template>
            <span>Tooltip</span>
          </v-tooltip>
          <v-tooltip location="top" aria-label="tooltip">
            <template #activator="{props}">
              <v-icon color="primary" v-bind="props">
                <CopyOutlined />
              </v-icon>
            </template>
            <span>Copy</span>
          </v-tooltip>
        </div>
      </UiParentCard>
    </v-col>
    <v-col cols="12" md="6">
      <UiParentCard title="Toggle Tolltip">
        <div class="d-flex justify-space-around">
          <v-btn @click="show = !show" variant="outlined">
            {{ !show ? 'Show Tooltip' : 'Hide Tooltip' }}
          </v-btn>
          <v-tooltip v-model="show" top aria-label="tooltip">
            <template #activator="{props}">
              <v-btn icon v-bind="props" aria-label="shopping cart">
                <v-icon>
                  <ShoppingCartOutlined />
                </v-icon>
              </v-btn>
            </template>
            <span>Programmatic tooltip</span>
          </v-tooltip>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
