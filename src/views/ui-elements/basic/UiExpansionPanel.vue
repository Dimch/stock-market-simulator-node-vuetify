<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import {SmileOutlined, BankOutlined, DollarOutlined} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Accordion'});
const subContent = ref({content: 'Lists are continuous, vertical indexes of text or images.'});
const path = ref({filepath: 'src/views/ui-elements/basic/expansion-panel'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/expansion-panels/'});

const panel = ref([0, 1]);
const panel1 = ref([0]);
const multiple = ref([0, 1]);
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic -->
        <v-col cols="12" md="6">
          <UiParentCard title="Basic">
            <v-expansion-panels v-model="panel1">
              <v-expansion-panel v-for="i in 3" :key="i" elevation="0">
                <v-expansion-panel-title color="gray100"> Item #{{ i }} </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>
        <!-- Disabled -->
        <v-col cols="12" md="6">
          <UiParentCard title="Disabled">
            <v-expansion-panels disabled>
              <v-expansion-panel v-for="i in 3" :key="i" elevation="0">
                <v-expansion-panel-title> Item #{{ i }} </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>
        <!-- Default Expand -->
        <v-col cols="12" md="6">
          <UiParentCard title="Default Expand">
            <v-expansion-panels v-model="panel">
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #1</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #2</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #3</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>
        <!-- Multiple Expand -->
        <v-col cols="12" md="6">
          <UiParentCard title="Multiple Expand">
            <v-expansion-panels v-model="multiple" multiple>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #1</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #2</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #3</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>

        <!-- Inset -->
        <v-col cols="12" md="6">
          <UiParentCard title="Inset">
            <v-expansion-panels variant="inset">
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #1</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #2</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #3</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>
        <!-- Popout -->
        <v-col cols="12" md="6">
          <UiParentCard title="Popout">
            <v-expansion-panels variant="popout">
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #1</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #2</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="0">
                <v-expansion-panel-title color="gray100">Item #3</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>
        <!-- Customized Icon -->
        <v-col cols="12">
          <UiParentCard title="Customized Icon">
            <v-expansion-panels>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title expand-icon="$menuDown" class="text-primary font-weight-semibold">
                  <SmileOutlined class="me-2" />
                  Profile
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="mb-4 mt-3">Joseph William</h4>
                  <v-divider></v-divider>
                  <p class="pt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget.
                  </p>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title expand-icon="$menuDown" class="text-error font-weight-semibold">
                  <BankOutlined class="me-2" />
                  Address
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="mb-4 mt-3">Joseph William</h4>
                  <v-divider></v-divider>
                  <p class="pt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget.
                  </p>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title expand-icon="$menuDown" class="text-secondary font-weight-semibold">
                  <DollarOutlined class="me-2" />
                  Account Info
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="mb-4 mt-3">Joseph William</h4>
                  <v-divider></v-divider>
                  <p class="pt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget.
                  </p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
