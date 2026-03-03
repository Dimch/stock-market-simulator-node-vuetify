<script setup>
import {ref, reactive, computed} from 'vue';
import {DateTime} from 'luxon';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import {vMaska} from 'maska/vue';

const page = ref({title: 'Mask Page'});
const breadcrumbs = ref([
  {
    title: 'Plugins',
    disabled: false,
    href: '#'
  },
  {
    title: 'Mask',
    disabled: true,
    href: '#'
  }
]);

const phoneValue = ref('');
const unmaskedPhoneValue = ref('');

const telValue = ref('');
const unmaskedTelValue = ref('');

const usValue = ref('');
const unmaskedUsValue = ref('');

const contactValue = ref('');
const unmaskedContactValue = ref('');

const hexoptions = reactive({
  mask: '!#HHHHHH',
  tokens: {
    H: {
      pattern: /[0-9a-fA-F]/,
      uppercase: true
    }
  }
});
const hexValue = ref('');

const ipValue = ref('');
const unmaskedIpValue = ref('');

const ipv4Value = ref('');
const unmaskedIp4Value = ref('');

const ipv6Value = ref('');
const unmaskedIp6Value = ref('');

defineExpose({
  unmaskedPhoneValue,
  unmaskedTelValue,
  unmaskedUsValue,
  unmaskedContactValue,
  unmaskedIpValue,
  unmaskedIp4Value,
  unmaskedIp6Value,
  hexoptions
});

// datepicker
const selectedDate = ref(null);
const selectedDate1 = ref(null);
const computedDateFormattedMomentjs = computed(() => {
  return selectedDate.value ? DateTime.fromISO(selectedDate.value).toFormat('d/MM/yyyy') : '';
});
const computedDateFormattedMomentjs1 = computed(() => {
  return selectedDate1.value ? DateTime.fromISO(selectedDate1.value).toFormat('d-MM-yyyy') : '';
});
</script>
<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <v-row>
        <!-- Base Buttons -->
        <v-col cols="12" lg="6">
          <UiParentCard title="Phone no.">
            <div class="mb-5">
              <v-label class="mb-1">Phone Number</v-label>
              <v-text-field
                single-line
                hide-details
                color="primary"
                label="Phone with Code"
                variant="outlined"
                v-maska:unmaskedPhoneValue.unmasked="'+1 (###) ###-##-##'"
                v-model="phoneValue"
              />
            </div>
            <div class="mb-5">
              <v-label class="mb-1">Contact Number</v-label>
              <v-text-field
                single-line
                hide-details
                color="primary"
                label="Contact Number"
                variant="outlined"
                v-maska:unmaskedContactValue.unmasked="'+91 #### ###-###'"
                v-model="contactValue"
              />
            </div>
            <div class="mb-5">
              <v-label class="mb-1">Telephone with Area Code</v-label>
              <v-text-field
                single-line
                hide-details
                color="primary"
                label="Tel. with Code  Area"
                variant="outlined"
                v-maska:unmaskedTelValue.unmasked="'(##) ####-#####'"
                v-model="telValue"
              />
            </div>
            <div class="mb-5">
              <v-label class="mb-1">US Telephone</v-label>
              <v-text-field
                single-line
                hide-details
                color="primary"
                label="US Telephone"
                variant="outlined"
                v-maska:unmaskedUsValue.unmasked="'(###) ###-#####'"
                v-model="usValue"
              />
            </div>
            <div>
              <v-label class="mb-1">Color code</v-label>
              <v-text-field
                single-line
                hide-details
                color="primary"
                label="Hex color: #121113"
                variant="outlined"
                v-maska="hexoptions"
                v-model="hexValue"
              />
            </div>
          </UiParentCard>
        </v-col>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12">
              <UiParentCard title="Network">
                <div class="mb-5">
                  <v-label class="mb-1">Enter IP Address</v-label>
                  <v-text-field
                    single-line
                    hide-details
                    color="primary"
                    label="Ip Address"
                    variant="outlined"
                    v-maska:unmaskedIpValue.unmasked="'###.###.###.###'"
                    v-model="ipValue"
                  />
                </div>
                <div class="mb-5">
                  <v-label class="mb-1">Enter IPV4</v-label>
                  <v-text-field
                    single-line
                    hide-details
                    color="primary"
                    label="Ipv4 Address"
                    variant="outlined"
                    v-maska:unmaskedIp4Value.unmasked="'####.####.####.####'"
                    v-model="ipv4Value"
                  />
                </div>
                <div>
                  <v-label class="mb-1">Enter IPV6</v-label>
                  <v-text-field
                    single-line
                    hide-details
                    color="primary"
                    label="Ipv6 Address"
                    variant="outlined"
                    v-maska:unmaskedIp6Value.unmasked="'####.####.####.####.####.####'"
                    v-model="ipv6Value"
                  />
                </div>
              </UiParentCard>
            </v-col>
            <v-col cols="12">
              <UiParentCard title="Date & Time">
                <div class="mb-5">
                  <v-label class="mb-1">Insert Date</v-label>
                  <v-menu>
                    <template #activator="{props}">
                      <v-text-field
                        single-line
                        hide-details
                        variant="outlined"
                        v-bind="props"
                        v-model="computedDateFormattedMomentjs"
                        placeholder="MM/DD/YYYY"
                        readonly
                        color="primary"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="selectedDate" hide-header color="primary"></v-date-picker>
                  </v-menu>
                </div>
                <div>
                  <v-label class="mb-1">Insert Date 2</v-label>
                  <v-menu>
                    <template #activator="{props}">
                      <v-text-field
                        single-line
                        variant="outlined"
                        hide-details
                        v-bind="props"
                        v-model="computedDateFormattedMomentjs1"
                        placeholder="DD-MM-YYYY"
                        readonly
                        color="primary"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="selectedDate1" hide-header color="primary"></v-date-picker>
                  </v-menu>
                </div>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
