<script setup>
const props = defineProps({
  name: String,
  destination: String,
  building: String,
  street: String,
  city: String,
  state: String,
  country: String,
  post: String,
  phone: String,
  isDefault: Boolean,
  showBtn: Boolean
});
</script>
<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center ga-2">
        <h6 class="text-subtitle-1 mb-0">{{ props.name }}</h6>
        <small class="text-lightText text-caption">({{ props.destination }})</small>
        <v-chip color="primary" size="small" class="ms-auto" v-if="isDefault">Default</v-chip>
      </div>
      <div class="mt-2 text-body1">
        <p class="text-caption text-lightText">
          {{ props.building }}, {{ props.street }}, {{ props.city }}, {{ props.state }}, {{ props.country }} - {{ props.post }}
        </p>
        <p class="text-caption text-lightText mb-0">{{ props.phone }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>
