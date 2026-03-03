<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {
  UserOutlined,
  ZoomInOutlined,
  PlusOutlined,
  DatabaseFilled,
  CheckOutlined,
  WarningFilled,
  InfoCircleFilled,
  DeleteFilled
} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Avatar'});
const subContent = ref({content: 'Avatars are found throughout vuetify design with uses in everything from tables to dialog menus.'});
const path = ref({filepath: 'src/views/ui-elements/basic/avatar'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/avatars/'});
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic Avatar -->
        <v-col cols="12" lg="3" md="6">
          <UiParentCard title="Basic Avatar">
            <div class="text-center">
              <v-avatar variant="flat" color="primary">
                <UserOutlined />
              </v-avatar>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Letter Avatar -->
        <v-col cols="12" lg="3" md="6">
          <UiParentCard title="Letter Avatar">
            <div class="d-flex align-center ga-2 justify-center">
              <v-avatar size="40" color="lightprimary" class="text-primary" variant="flat"> U </v-avatar>
              <v-avatar size="40" color="lightsuccess" class="text-success" variant="flat"> UI </v-avatar>
              <v-avatar size="40" color="error" variant="flat"> A </v-avatar>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Image Avatar -->
        <v-col cols="12" lg="3" md="6">
          <UiParentCard title="Vector">
            <div class="d-flex align-center ga-2 justify-center flex-wrap">
              <v-avatar size="40" variant="flat" color="lightprimary">
                <img src="@/assets/images/users/vector-1.png" width="40" alt="Julia" />
              </v-avatar>
              <v-avatar size="40" variant="flat" color="lightprimary">
                <img src="@/assets/images/users/vector-2.png" width="40" alt="Julia" />
              </v-avatar>
              <v-avatar size="40" variant="flat" color="lightprimary">
                <img src="@/assets/images/users/vector-3.png" width="40" alt="Julia" />
              </v-avatar>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Icon Avatar -->
        <v-col cols="12" lg="3" md="6">
          <UiParentCard title="Icon">
            <div class="d-flex align-center ga-2 justify-center flex-wrap">
              <v-avatar size="40" color="primary">
                <UserOutlined />
              </v-avatar>
              <v-avatar size="40" variant="flat" color="success">
                <ZoomInOutlined />
              </v-avatar>
              <v-avatar size="40" color="primary" variant="tonal">
                <PlusOutlined />
              </v-avatar>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Variant Avatar -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <UiParentCard title="Variant Avatar">
                <div class="d-flex align-center ga-2 justify-center flex-wrap">
                  <v-avatar size="40" color="lightprimary" class="text-primary" variant="flat">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined" class="text-primary" rounded="md">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar size="40" color="primary" variant="flat" rounded="0">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar size="40" color="lightprimary" class="text-primary" variant="flat"> U </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined" class="text-primary" rounded="md"> U </v-avatar>
                  <v-avatar size="40" color="primary" variant="flat" rounded="0"> U </v-avatar>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Fallbacks Avatar -->
            <v-col cols="12">
              <UiParentCard title="Colors Avatar">
                <div class="d-flex align-center ga-2 justify-center flex-wrap">
                  <v-avatar color="primary" variant="flat">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar color="secondary" variant="flat">
                    <DatabaseFilled />
                  </v-avatar>
                  <v-avatar color="success" variant="flat">
                    <CheckOutlined />
                  </v-avatar>
                  <v-avatar color="warning" variant="flat">
                    <WarningFilled />
                  </v-avatar>
                  <v-avatar color="info" variant="flat">
                    <InfoCircleFilled />
                  </v-avatar>
                  <v-avatar color="error" variant="flat">
                    <DeleteFilled />
                  </v-avatar>
                </div>
              </UiParentCard>
            </v-col>
            <v-col cols="12">
              <UiParentCard title="With Badge">
                <div class="d-flex align-center ga-2 justify-center flex-wrap">
                  <v-badge color="error" content="4">
                    <img src="@/assets/images/users/avatar-6.png" class="rounded-circle" width="40" alt="Julia" />
                  </v-badge>
                  <v-badge color="error" dot offset-x="3">
                    <v-avatar color="secondary" variant="flat" rounded="circle">
                      <UserOutlined />
                    </v-avatar>
                  </v-badge>
                  <v-badge color="error" dot offset-x="3">
                    <img src="@/assets/images/users/avatar-2.png" class="rounded-circle" width="40" alt="Julia" />
                  </v-badge>
                  <v-badge color="error" dot offset-x="3">
                    <v-avatar color="primary" variant="outlined" rounded="circle"> U </v-avatar>
                  </v-badge>
                  <v-badge color="error" dot offset-x="3">
                    <v-avatar color="lightprimary" rounded="circle">
                      <img src="@/assets/images/users/vector-2.png" class="rounded-circle" width="40" alt="Julia" />
                    </v-avatar>
                  </v-badge>
                  <v-badge color="success" dot offset-x="-3" offset-y="-3">
                    <img src="@/assets/images/users/avatar-1.png" class="rounded-md" width="40" alt="Julia" />
                  </v-badge>
                  <v-badge color="transparent pa-0" bordered location="bottom end" offset-x="3" offset-y="3">
                    <img src="@/assets/images/users/avatar-1.png" class="rounded-circle" width="40" alt="Julia" />
                    <template #badge>
                      <img src="@/assets/images/users/avatar-1.png" width="16" class="rounded-circle" alt="Julia" />
                    </template>
                  </v-badge>
                </div>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <!-- Size Avatar -->
            <v-col cols="12">
              <UiParentCard title="Size Avatar">
                <div class="d-flex align-center ga-2 justify-center">
                  <v-avatar size="25" color="primary" variant="tonal">
                    <img src="@/assets/images/users/avatar-1.png" width="25" alt="Julia" />
                  </v-avatar>
                  <v-avatar size="40" color="secondary" variant="tonal">
                    <img src="@/assets/images/users/avatar-2.png" width="40" alt="Julia" />
                  </v-avatar>
                  <v-avatar size="50" color="success" variant="tonal">
                    <img src="@/assets/images/users/avatar-3.png" width="50" alt="Julia" />
                  </v-avatar>
                  <v-avatar size="52" color="info" variant="tonal">
                    <img src="@/assets/images/users/avatar-4.png" width="52" alt="Julia" />
                  </v-avatar>
                  <v-avatar size="64" color="warning" variant="tonal">
                    <img src="@/assets/images/users/avatar-5.png" width="64" alt="Julia" />
                  </v-avatar>
                </div>
              </UiParentCard>
            </v-col>
            <!-- Outline Avatar -->
            <v-col cols="12">
              <UiParentCard title="Outlined">
                <div class="d-flex align-center ga-2 justify-center flex-wrap">
                  <v-avatar size="40" color="primary" variant="outlined">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined" class="text-primary" rounded="md">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined" rounded="0">
                    <UserOutlined />
                  </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined"> U </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined" rounded="md"> U </v-avatar>
                  <v-avatar size="40" color="primary" variant="outlined" rounded="0"> U </v-avatar>
                </div>
              </UiParentCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
