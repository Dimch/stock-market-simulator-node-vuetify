<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {CoffeeOutlined, DesktopOutlined, GiftOutlined, RetweetOutlined} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Timeline'});
const subContent = ref({content: 'The timeline displays a list of events in chronological order.'});
const path = ref({filepath: 'src/views/ui-elements/advance/timeline'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/timelines'});

// timeline1 data

const time2 = ref([
  {
    color: 'primary',
    text: 'Eat'
  },
  {
    color: 'secondary',
    text: 'Code'
  },
  {
    color: 'error',
    text: 'Sleep'
  },
  {
    color: 'warning',
    text: 'Repeat'
  }
]);

const time3 = ref([
  {
    color: 'primary',
    text: 'Eat',
    icon: CoffeeOutlined,
    time: '09:30 am',
    subtext: 'Because you need strength'
  },
  {
    color: 'success',
    text: 'Code',
    icon: DesktopOutlined,
    time: '10:00 am',
    subtext: "Because it's awesome!"
  },
  {
    color: 'warning',
    text: 'Gift',
    icon: GiftOutlined,
    time: '11:30 am',
    subtext: 'Because you need.'
  },
  {
    color: 'error',
    text: 'Repeat',
    icon: RetweetOutlined,
    time: '12:30 am',
    subtext: 'This is the life you love!'
  }
]);
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Basic">
            <v-timeline side="end" align="start" line-color="borderLight" class="dot-outline">
              <v-timeline-item dot-color="primary" size="x-small">
                <div class="text-subtitle-1 font-weight-regular">Eat</div>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <div class="text-subtitle-1 font-weight-regular">Code</div>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <div class="text-subtitle-1 font-weight-regular">Sleep</div>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <div class="text-subtitle-1 font-weight-regular">Repeat</div>
              </v-timeline-item>
            </v-timeline>
          </UiParentCard>
        </v-col>
        <!-- Alternating -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Alternating Positioned">
            <v-timeline align="start" line-color="borderLight" class="dot-outline alternating-timeline">
              <v-timeline-item v-for="(time, i) in time2" :key="i" dot-color="primary" size="x-small">
                <v-card-title class="text-subtitle-1 pa-0 font-weight-regular">
                  {{ time.text }}
                </v-card-title>
              </v-timeline-item>
            </v-timeline>
          </UiParentCard>
        </v-col>
        <!-- Dot Color -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Colors">
            <v-timeline align="start" line-color="borderLight" class="dot-outline alternating-timeline">
              <v-timeline-item v-for="(time, i) in time2" :key="i" :dot-color="time.color" size="x-small">
                <v-card-title class="text-subtitle-1 pa-0 font-weight-regular">
                  {{ time.text }}
                </v-card-title>
              </v-timeline-item>
            </v-timeline>
          </UiParentCard>
        </v-col>
        <!-- Opposite Content -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Opposite Content">
            <v-timeline truncate-line="start" line-color="borderLight" class="dot-outline alternating-timeline">
              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">09:30 am</span>
                </template>
                <span class="font-weight-medium">Eat</span>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">10:00 am</span>
                </template>
                <span class="font-weight-medium">Code</span>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">12:00 am </span>
                </template>
                <span class="font-weight-medium">Sleep</span>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">9:00 am</span>
                </template>
                <span class="font-weight-medium">Repeat</span>
              </v-timeline-item>
            </v-timeline>
          </UiParentCard>
        </v-col>
        <!-- Line inset -->
        <v-col cols="12" lg="8">
          <UiParentCard title="Line inset">
            <v-timeline truncate-line="both" direction="horizontal" line-inset="12" line-color="borderLight" class="dot-outline">
              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">09:30 am</span>
                </template>
                <span class="font-weight-medium">Eat</span>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">10:00 am</span>
                </template>
                <span class="font-weight-medium">Code</span>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">12:00 am </span>
                </template>
                <span class="font-weight-medium">Sleep</span>
              </v-timeline-item>

              <v-timeline-item dot-color="primary" size="x-small">
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">9:00 am</span>
                </template>
                <span class="font-weight-medium">Repeat</span>
              </v-timeline-item>
            </v-timeline>
          </UiParentCard>
        </v-col>
        <!-- Customized -->
        <v-col cols="12">
          <UiParentCard title="Customized">
            <v-row class="justify-center">
              <v-col lg="6" md="8">
                <div class="overflow-auto">
                  <v-timeline align="start" line-color="borderLight" class="custom-timeline">
                    <v-timeline-item v-for="(time, i) in time3" :key="i" :dot-color="time.color" fill-dot>
                      <template #icon>
                        <component :is="time.icon" :style="{fontSize: '20px'}" />
                      </template>
                      <template #opposite>
                        <span class="text-medium-emphasis font-weight-medium">{{ time.time }}</span>
                      </template>
                      <v-card variant="text">
                        <div class="bg-gray100 rounded-md pa-4">
                          <div class="text-h5">{{ time.text }}</div>
                          <p class="text-medium-emphasis mb-0">
                            {{ time.subtext }}
                          </p>
                        </div>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </div>
              </v-col>
            </v-row>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
