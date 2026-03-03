<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
// icons
import {
  QuestionCircleFilled,
  DatabaseFilled,
  CheckSquareFilled,
  WarningFilled,
  InfoCircleFilled,
  BugFilled,
  QuestionCircleTwoTone,
  DatabaseTwoTone,
  CheckSquareOutlined,
  WarningOutlined,
  InfoCircleTwoTone,
  BugTwoTone
} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Alert'});
const subContent = ref({
  content: "An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task."
});
const path = ref({filepath: 'src/views/ui-elements/advance/alert'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/alerts/'});
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <!-- Basic -->
            <v-col cols="12">
              <UiParentCard title="Basic">
                <v-alert color="primary" variant="tonal" class="mb-4" icon="false">
                  <template #prepend>
                    <QuestionCircleFilled :style="{fontSize: '16px'}" />
                  </template>
                  Primary Text
                </v-alert>
                <v-alert color="secondary" variant="tonal" class="mb-4" icon="false">
                  <template #prepend>
                    <DatabaseFilled :style="{fontSize: '16px'}" />
                  </template>
                  Secondary Text
                </v-alert>
                <v-alert color="success" variant="tonal" class="mb-4" icon="false">
                  <template #prepend>
                    <CheckSquareFilled :style="{fontSize: '16px'}" />
                  </template>
                  Success Text
                </v-alert>
                <v-alert color="warning" variant="tonal" class="mb-4" icon="false">
                  <template #prepend>
                    <WarningFilled :style="{fontSize: '16px'}" />
                  </template>
                  Warning Text
                </v-alert>
                <v-alert color="info" variant="tonal" class="mb-4" icon="false">
                  <template #prepend>
                    <InfoCircleFilled :style="{fontSize: '16px'}" />
                  </template>
                  Info Text
                </v-alert>
                <v-alert color="error" variant="tonal" icon="false">
                  <template #prepend>
                    <BugFilled :style="{fontSize: '16px'}" />
                  </template>
                  Error Text
                </v-alert>
              </UiParentCard>
            </v-col>
            <!-- With Action -->
            <v-col cols="12">
              <UiParentCard title="Actions">
                <v-alert
                  type="success"
                  variant="tonal"
                  density="compact"
                  class="mb-4 border-solid border-success border-thin border-opacity-25"
                  icon="false"
                  closable
                >
                  <template #prepend>
                    <v-icon class="text-16" icon="$checkboxMarkedCircleOutline"></v-icon>
                  </template>
                  <div>Success Text</div>
                </v-alert>
                <v-alert
                  type="warning"
                  variant="tonal"
                  density="compact"
                  class="mb-4 border-solid border-warning border-thin border-opacity-25"
                >
                  <template #prepend>
                    <v-icon class="text-16" icon="$alertOutline"></v-icon>
                  </template>
                  <div>Warning Text</div>
                  <template #append>
                    <v-btn variant="text" color="warning" class="ms-auto">Undo</v-btn>
                  </template>
                </v-alert>
                <v-alert
                  color="primary"
                  variant="tonal"
                  density="compact"
                  class="mb-4 border-solid border-primary border-thin border-opacity-25"
                >
                  <template #prepend>
                    <v-icon class="text-16" icon="$helpCircleOutline"></v-icon>
                  </template>
                  <div>Primary Text</div>
                  <template #append>
                    <v-btn variant="flat" color="primary" size="small" class="ms-auto">Continue</v-btn>
                  </template>
                </v-alert>
              </UiParentCard>
            </v-col>
            <!-- Fill alert -->
            <v-col cols="12">
              <UiParentCard title="Filled">
                <v-alert color="primary" class="mb-4" icon="false">
                  <template #prepend>
                    <QuestionCircleFilled :style="{fontSize: '16px'}" />
                  </template>
                  Primary Text
                </v-alert>
                <v-alert color="secondary" class="mb-4" icon="false">
                  <template #prepend>
                    <DatabaseFilled :style="{fontSize: '16px'}" />
                  </template>
                  Secondary Text
                </v-alert>
                <v-alert color="success" class="mb-4" icon="false">
                  <template #prepend>
                    <CheckSquareFilled :style="{fontSize: '16px'}" />
                  </template>
                  Success Text
                </v-alert>
                <v-alert color="warning" class="mb-4" icon="false">
                  <template #prepend>
                    <WarningFilled :style="{fontSize: '16px'}" />
                  </template>
                  Warning Text
                </v-alert>
                <v-alert color="info" class="mb-4" icon="false">
                  <template #prepend>
                    <InfoCircleFilled :style="{fontSize: '16px'}" />
                  </template>
                  Info Text
                </v-alert>
                <v-alert color="error" icon="false">
                  <template #prepend>
                    <BugFilled :style="{fontSize: '16px'}" />
                  </template>
                  Error Text
                </v-alert>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <!-- Description -->
            <v-col cols="12">
              <UiParentCard title="Description">
                <v-alert
                  color="primary"
                  variant="tonal"
                  class="mb-4 border-solid border-primary border-thin border-opacity-25"
                  icon="false"
                >
                  <template #prepend>
                    <QuestionCircleFilled class="mt-1" :style="{fontSize: '16px'}" />
                  </template>
                  <h5 class="text-h5 text-capitalize mb-1">Primary text</h5>
                  <div>This is an primary text</div>
                </v-alert>
                <v-alert
                  color="secondary"
                  variant="tonal"
                  class="mb-4 border-solid border-secondary border-thin border-opacity-25"
                  icon="false"
                >
                  <template #prepend>
                    <DatabaseFilled class="mt-1" :style="{fontSize: '16px'}" />
                  </template>
                  <h5 class="text-h5 text-capitalize mb-1">Secondary text</h5>
                  <div>This is an secondary text</div>
                </v-alert>
                <v-alert
                  color="success"
                  variant="tonal"
                  class="mb-4 border-solid border-success border-thin border-opacity-25"
                  icon="false"
                >
                  <template #prepend>
                    <CheckSquareFilled class="mt-1" :style="{fontSize: '16px'}" />
                  </template>
                  <h5 class="text-h5 text-capitalize mb-1">Success text</h5>
                  <div>This is an success text</div>
                </v-alert>
                <v-alert
                  color="warning"
                  variant="tonal"
                  class="mb-4 border-solid border-warning border-thin border-opacity-25"
                  icon="false"
                >
                  <template #prepend>
                    <WarningFilled class="mt-1" :style="{fontSize: '16px'}" />
                  </template>
                  <h5 class="text-h5 text-capitalize mb-1">Warning text</h5>
                  <div>This is an warning text</div>
                </v-alert>
                <v-alert color="info" variant="tonal" class="mb-4 border-solid border-info border-thin border-opacity-25" icon="false">
                  <template #prepend>
                    <InfoCircleFilled class="mt-1" :style="{fontSize: '16px'}" />
                  </template>
                  <h5 class="text-h5 text-capitalize mb-1">Info text</h5>
                  <div>This is an info text</div>
                </v-alert>
                <v-alert color="error" variant="tonal" class="border-solid border-error border-thin border-opacity-25" icon="false">
                  <template #prepend>
                    <BugFilled class="mt-1" :style="{fontSize: '16px'}" />
                  </template>
                  <h5 class="text-h5 text-capitalize mb-1">Error text</h5>
                  <div>This is an error text</div>
                </v-alert>
              </UiParentCard>
            </v-col>
            <!-- Outlined -->
            <v-col cols="12">
              <UiParentCard title="Outlined">
                <v-alert color="primary" variant="outlined" class="mb-4" icon="false">
                  <template #prepend>
                    <QuestionCircleTwoTone :style="{fontSize: '16px'}" />
                  </template>
                  Primary Text
                </v-alert>
                <v-alert color="secondary" variant="outlined" class="mb-4" icon="false">
                  <template #prepend>
                    <DatabaseTwoTone twoToneColor="#8c8c8c" :style="{fontSize: '16px'}" />
                  </template>
                  Secondary Text
                </v-alert>
                <v-alert color="success" variant="outlined" class="mb-4" icon="false">
                  <template #prepend>
                    <CheckSquareOutlined :style="{fontSize: '16px'}" />
                  </template>
                  Success Text
                </v-alert>
                <v-alert color="warning" variant="outlined" class="mb-4" icon="false">
                  <template #prepend>
                    <WarningOutlined :style="{fontSize: '16px'}" />
                  </template>
                  Warning Text
                </v-alert>
                <v-alert color="info" variant="outlined" class="mb-4" icon="false">
                  <template #prepend>
                    <InfoCircleTwoTone twoToneColor="#13c2c2" :style="{fontSize: '16px'}" />
                  </template>
                  Info Text
                </v-alert>
                <v-alert color="error" variant="outlined" icon="false">
                  <template #prepend>
                    <BugTwoTone twoToneColor="#ff4d4f" :style="{fontSize: '16px'}" />
                  </template>
                  Error Text
                </v-alert>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
