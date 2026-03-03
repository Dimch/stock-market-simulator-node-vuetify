<script setup>
import {ref, computed, shallowRef} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// component content
const page = ref({title: 'Number inputs'});
const subContent = ref({
  content:
    'The VNumberInput extends the standard HTML number-type input, ensuring style consistency across browsers as a replacement for <input type="number">'
});
const path = ref({filepath: 'src/views/forms/components/number-input'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/number-inputs'});

const step = 50;
const value = shallowRef(100);
const roundedValue = computed({
  get: () => value.value,
  set: (v) => (value.value = Math.round(v / step) * step)
});

const precision1 = ref(123);
const precision2 = ref(25.5);
const precision3 = ref(0.052);
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink" />
  <v-row>
    <v-col cols="12" lg="6">
      <!-- control variant -->
      <UiParentCard title="Control variant">
        <v-row>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2"> Default </v-label>
            <v-number-input control-variant="default" rounded="0" hide-details />
          </v-col>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2"> Stacked </v-label>
            <v-number-input control-variant="stacked" variant="outlined" rounded="0" hide-details />
          </v-col>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2"> Split </v-label>
            <v-number-input control-variant="split" variant="outlined" rounded="0" hide-details />
          </v-col>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2"> Hidden </v-label>
            <v-number-input control-variant="hidden" variant="outlined" rounded="0" hide-details />
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
    <v-col cols="12" lg="6">
      <v-row>
        <v-col cols="12">
          <!-- Reverse -->
          <UiParentCard title="Reverse">
            <v-row>
              <v-col cols="12">
                <v-label class="font-weight-medium mb-2"> Default </v-label>
                <v-number-input control-variant="default" rounded="0" variant="outlined" hide-details reverse />
              </v-col>
              <v-col cols="12">
                <v-label class="font-weight-medium mb-2"> Stacked </v-label>
                <v-number-input control-variant="stacked" rounded="0" variant="outlined" hide-details reverse />
              </v-col>
            </v-row>
          </UiParentCard>
        </v-col>
        <v-col cols="12">
          <UiParentCard title="Min/Max">
            <v-label class="font-weight-medium mb-2">min:10/max:20</v-label>
            <v-number-input variant="outlined" :max="20" :min="10" :model-value="15" rounded="0" hide-details />
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <!-- Inset -->
      <UiParentCard title="Inset">
        <v-row>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> Default </v-label>
            <v-number-input control-variant="default" variant="outlined" rounded="0" hide-details inset />
          </v-col>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> Stacked </v-label>
            <v-number-input control-variant="stacked" variant="outlined" rounded="0" hide-details inset />
          </v-col>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> Split </v-label>
            <v-number-input control-variant="split" rounded="0" variant="outlined" hide-details inset />
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
    <v-col cols="12">
      <!-- Step -->
      <UiParentCard title="Step">
        <v-row>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> step 2; min:10; max:20 </v-label>
            <v-number-input
              control-variant="default"
              :max="20"
              :min="10"
              :model-value="15"
              :step="2"
              variant="outlined"
              rounded="0"
              hide-details
              inset
            />
          </v-col>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> step {{ step }}, rounding on blur </v-label>
            <v-number-input
              control-variant="stacked"
              v-model="roundedValue"
              :step="step"
              variant="outlined"
              rounded="0"
              hide-details
              inset
            />
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
    <v-col cols="12">
      <!-- Precision -->
      <UiParentCard title="Precision">
        <v-row>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> (precision="2") </v-label>
            <v-number-input v-model="precision1" :precision="2" variant="outlined" hide-details="auto" />
            <code class="d-block pt-3">value: {{ precision1}}</code>
          </v-col>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> (precision="5") </v-label>
            <v-number-input v-model="precision2" :precision="5" variant="outlined" hide-details="auto" />
            <code class="d-block pt-3">value: {{ precision2}}</code>
          </v-col>
          <v-col cols="12" lg="4">
            <v-label class="font-weight-medium mb-2"> (precision unrestricted) </v-label>
            <v-number-input v-model="precision3" :precision="null" variant="outlined" hide-details="auto" />
            <code class="d-block pt-3">value: {{ precision3}}</code>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
