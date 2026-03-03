<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {
  HomeFilled,
  SmileFilled,
  EnvironmentOutlined,
  PlusCircleOutlined,
  SendOutlined,
  CloseOutlined,
  PlusOutlined,
  EditOutlined,
  DisconnectOutlined
} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Buttons'});
const subContent = ref({content: 'Buttons allow users to take actions, and make choices, with a single tap.'});
const path = ref({filepath: 'src/views/forms/components/buttons'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/buttons'});

// buttons color data
const btnsColor = ref(['primary', 'secondary', 'info', 'success', 'warning', 'error']);

// buttons size data
const btnsSize = ref(['x-small', 'small', 'large', 'x-large']);

// buttons data
const btnsContent = ref(['one', 'two', 'three']);

const loading = ref(false);

function load() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
}
</script>

// ===============================|| Ui Buttons ||=============================== //
<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Base Buttons -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <UiParentCard title="Basic Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn v-for="btn in btnsColor" :key="btn" :color="btn">
                    {{ btn }}
                  </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Outlined Buttons -->
            <v-col cols="12">
              <UiParentCard title="Outlined Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn v-for="btn in btnsColor" :key="btn" :color="btn" variant="outlined">
                    {{ btn }}
                  </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Dashed Buttons -->
            <v-col cols="12">
              <UiParentCard title="Dashed Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn v-for="btn in btnsColor" :key="btn" :color="btn" :border="`${btn} dashed thin opacity-100`" variant="tonal">
                    {{ btn }}
                  </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Flat Buttons -->
            <v-col cols="12">
              <UiParentCard title="Flat Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn v-for="btn in btnsColor" :key="btn" :color="btn" variant="flat">
                    {{ btn }}
                  </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Text Buttons -->
            <v-col cols="12">
              <UiParentCard title="Text Button">
                <div class="d-flex flex-wrap ga-4 my-2 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn v-for="btn in btnsColor" :key="btn" :color="btn" variant="text">
                    {{ btn }}
                  </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Shadow Button -->
            <v-col cols="12">
              <UiParentCard title="Shadow Button">
                <div class="d-flex flex-wrap ga-4 align-center flex-column flex-sm-row fill-height">
                  <v-btn variant="flat" v-for="btn in btnsColor" :key="btn" :color="btn" :class="`${btn}-shadow`"> {{ btn }} </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- With Icons -->
            <v-col cols="12">
              <UiParentCard title="With Icons">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn flat color="primary"><HomeFilled class="me-1" /> Home </v-btn>
                  <v-btn flat color="secondary"> Profile <SmileFilled class="ms-1" /></v-btn>
                  <v-btn flat color="info" variant="outlined"> <EnvironmentOutlined class="me-1" /> Address</v-btn>
                  <v-btn flat color="success" variant="outlined"> <PlusCircleOutlined class="me-1" /> Add</v-btn>
                  <v-btn flat color="warning" variant="outlined"> Send <SendOutlined class="ms-1" /></v-btn>
                  <v-btn flat color="error" variant="text"> Cancel <CloseOutlined class="ms-1" /></v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Sizes -->
            <v-col cols="12">
              <UiParentCard title="Button size">
                <div class="d-flex flex-wrap ga-4 align-start flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn v-for="btn in btnsSize" :key="btn" :size="btn" color="primary"> {{ btn }} </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Disabled -->
            <v-col cols="12">
              <UiParentCard title="Disabled Button">
                <div class="d-flex flex-wrap ga-4 align-start flex-wrap flex-row fill-height">
                  <v-btn text="Default" variant="text" disabled></v-btn>
                  <v-btn text="Cotained" variant="tonal" disabled></v-btn>
                  <v-btn text="Outlined" variant="outlined" disabled></v-btn>
                  <v-btn icon variant="tonal" rounded="lg" disabled>
                    <HomeFilled />
                  </v-btn>
                  <v-btn icon variant="outlined" rounded="lg" disabled>
                    <PlusCircleOutlined />
                  </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Block level -->
            <v-col cols="12">
              <UiParentCard title="Block level">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn color="primary" block>Primary</v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn color="secondary" variant="outlined" block>Secondary</v-btn>
                  </v-col>
                </v-row>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <!-- Button group -->
            <v-col cols="12">
              <UiParentCard title="Button group">
                <div class="d-flex flex-column ga-4">
                  <v-btn-group divided variant="flat" color="primary" density="compact">
                    <v-btn v-for="btn in btnsContent" :key="btn">{{ btn }}</v-btn>
                  </v-btn-group>
                  <v-btn-group divided variant="outlined" color="primary" density="compact">
                    <v-btn v-for="btn in btnsContent" :key="btn">{{ btn }}</v-btn>
                  </v-btn-group>
                  <v-btn-group divided color="primary" variant="text" density="compact">
                    <v-btn v-for="btn in btnsContent" :key="btn">{{ btn }}</v-btn>
                  </v-btn-group>
                  <v-btn-group divided variant="outlined" color="warning" density="compact">
                    <v-btn v-for="btn in btnsContent" :key="btn">{{ btn }}</v-btn>
                  </v-btn-group>
                </div>
              </UiParentCard>
            </v-col>
            <v-col cols="12">
              <UiParentCard title="Fab">
                <div class="d-flex ga-4 flex-wrap">
                  <v-btn icon size="large" variant="elevated" color="primary" class="primary-shadow">
                    <PlusOutlined />
                  </v-btn>
                  <v-btn icon size="large" variant="elevated" color="info" class="info-shadow">
                    <EditOutlined />
                  </v-btn>
                  <v-btn icon size="large" variant="elevated" disabled>
                    <DisconnectOutlined />
                  </v-btn>
                  <v-btn size="large" variant="elevated" rounded="pill" color="error" class="error-shadow">Extended</v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <v-col cols="12">
              <h5 class="text-h5 mb-5">Extended Button</h5>
              <!-- Icon button -->
              <UiParentCard title="Icon Button">
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex flex-wrap ga-4">
                      <v-btn color="primary" icon rounded>
                        <HomeFilled />
                      </v-btn>
                      <v-btn color="secondary" icon rounded>
                        <SmileFilled />
                      </v-btn>
                      <v-btn color="info" icon rounded variant="outlined">
                        <EnvironmentOutlined />
                      </v-btn>
                      <v-btn color="success" icon rounded variant="outlined">
                        <PlusCircleOutlined />
                      </v-btn>
                      <v-btn color="warning" icon rounded variant="tonal" border="warning dashed thin opacity-100">
                        <SendOutlined />
                      </v-btn>
                      <v-btn color="error" icon rounded variant="text">
                        <CloseOutlined />
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex flex-wrap ga-4">
                      <v-btn color="primary" icon>
                        <HomeFilled />
                      </v-btn>
                      <v-btn color="secondary" icon>
                        <SmileFilled />
                      </v-btn>
                      <v-btn color="info" icon variant="outlined">
                        <EnvironmentOutlined />
                      </v-btn>
                      <v-btn color="success" icon variant="outlined">
                        <PlusCircleOutlined />
                      </v-btn>
                      <v-btn color="warning" icon variant="tonal" border="warning dashed thin opacity-100">
                        <SendOutlined />
                      </v-btn>
                      <v-btn color="error" icon variant="text">
                        <CloseOutlined />
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </UiParentCard>
            </v-col>
            <!-- Loading button -->
            <v-col cols="12">
              <UiParentCard title="Loading Button">
                <div class="d-flex flex-wrap ga-4">
                  <v-btn :loading="loading" color="primary" @click="load">
                    <template #prepend>
                      <HomeFilled />
                    </template>
                    Home
                  </v-btn>
                  <v-btn color="secondary" variant="outlined">
                    Edit
                    <v-progress-circular size="16" indeterminate color="secondary" aria-label="progressbar" class="ms-2">
                    </v-progress-circular>
                  </v-btn>
                  <v-btn color="info" variant="tonal" text="Loading..." border="info dashed thin opacity-100"></v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Ripple button -->
            <v-col cols="12">
              <UiParentCard title="Ripple">
                <div class="d-flex flex-wrap ga-4">
                  <v-btn color="primary"> With Ripple </v-btn>
                  <v-btn color="primary" :ripple="false"> Without Ripple </v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Density button -->
            <v-col cols="12">
              <UiParentCard title="Density">
                <div class="d-flex flex-wrap align-center ga-4">
                  <v-btn density="compact" color="primary">Compact Button</v-btn>
                  <v-btn density="comfortable" color="primary">Comfortable Button</v-btn>
                  <v-btn density="default" color="primary">Default Button</v-btn>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Rounded -->
            <v-col cols="12">
              <UiParentCard title="Rounded">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <v-btn rounded="0" color="primary">Rounded 0</v-btn>
                  <v-btn rounded="xs" color="secondary">Rounded xs</v-btn>
                  <v-btn rounded="sm" color="success">Rounded sm</v-btn>
                  <v-btn color="info">Rounded sm</v-btn>
                  <v-btn rounded="lg" color="warning">Rounded lg</v-btn>
                  <v-btn rounded="xl" color="error">Rounded xl</v-btn>
                </div>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
