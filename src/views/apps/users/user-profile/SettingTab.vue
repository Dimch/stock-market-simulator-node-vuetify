<script setup>
import {shallowRef} from 'vue';
import {FileDoneOutlined, MailOutlined, TranslationOutlined} from '@ant-design/icons-vue';

const items = shallowRef([
  {
    title: 'Order Confirmation',
    icon: FileDoneOutlined,
    content: 'You will be notified when customer order any product',
    value: true
  },
  {
    title: 'Setup Email Notification',
    icon: MailOutlined,
    content: 'Turn on email notification to get updates through email',
    value: false
  },
  {
    title: 'Update System Notification',
    icon: MailOutlined,
    content: 'You will be notified when customer order any product',
    value: true
  },
  {
    title: 'Language Change',
    icon: TranslationOutlined,
    content: 'You will be notified when customer order any product',
    value: true
  }
]);
</script>

<template>
  <v-card class="bg-surface" variant="outlined">
    <v-card-text>
      <h5 class="text-subtitle-1 mb-0">Settings</h5>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-item>
      <v-list lines="two" border aria-label="setting list" aria-busy="true">
        <v-list-item v-for="(item, index) in items" :key="index" class="py-6">
          <template #prepend>
            <component :is="item.icon" class="me-4 text-primary" :style="{fontSize: '24px'}" />
          </template>
          <v-list-item-title class="text-h5">{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{ item.content }}</v-list-item-subtitle>
          <template #append>
            <v-switch color="primary" aria-label="switch" class="ms-3" :model-value="item.value" inset hide-details></v-switch>
          </template>
        </v-list-item>
      </v-list>
      <div class="text-end mt-3">
        <v-btn variant="outlined" color="secondary">Cancel</v-btn>
        <v-btn variant="flat" color="primary" class="ms-3">Save</v-btn>
      </div>
    </v-card-item>
  </v-card>
</template>
