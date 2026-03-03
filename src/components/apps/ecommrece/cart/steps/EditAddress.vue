<script setup>
import {ref} from 'vue';

// icons
import {EditOutlined, CloseCircleOutlined} from '@ant-design/icons-vue';

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

const dialog = ref(false);

const radioGroup = ref('1');
</script>
<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center ga-2">
        <h6 class="text-subtitle-1 mb-0">{{ props.name }}</h6>
        <small class="text-lightText text-caption">({{ props.destination }})</small>
        <div class="ms-auto">
          <v-dialog v-model="dialog" width="800">
            <template #activator="{props}">
              <v-btn color="secondary" size="small" variant="outlined" v-bind="props">
                <template #prepend>
                  <EditOutlined />
                </template>
                Change
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="py-4 d-flex justify-space-between align-center">
                <span class="text-subtitle-1">Edit Billing Address</span>
                <v-btn icon rounded class="ms-auto" variant="text" @click="dialog = false">
                  <CloseCircleOutlined class="text-primary" :style="{fontSize: '13px'}" />
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="px-2">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Name</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="Andre Castillo"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Destination</v-label>
                      <v-radio-group inline hide-details v-model="radioGroup">
                        <v-radio color="primary" value="1" label="Home"></v-radio>
                        <v-radio color="primary" value="2" label="Office"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">Building No./Name</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="1372 Lupeg Grv"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">Street</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="1042 Dihda Way"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">City</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="Cijofkef"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">State</v-label>
                      <v-text-field single-line variant="outlined" color="primary" model-value="Idaho" required hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Country</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="Canada"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Area Code</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="TS0 0MC"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">Contact</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        color="primary"
                        model-value="(713) 311-2815"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-switch color="primary" :model-value="true" label="Default" hide-details></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" variant="text" @click="dialog = false"> Cancel </v-btn>
                <v-btn color="primary" variant="flat" @click="dialog = false"> Submit </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
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
