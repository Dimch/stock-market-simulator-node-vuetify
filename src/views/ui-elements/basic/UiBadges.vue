<script setup>
import {ref} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// icons
import {
  MailOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  BankOutlined,
  BellOutlined,
  MenuOutlined
} from '@ant-design/icons-vue';

// component content
const page = ref({title: 'Badge'});
const subContent = ref({content: 'Badge generates a small badge to the top-right of its child(ren).'});
const path = ref({filepath: 'src/views/ui-elements/basic/badge'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/badges/'});
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic Badges -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Basic Badges">
            <div class="d-flex align-center flex-row ga-6 justify-center">
              <v-badge color="primary" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="secondary" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="success" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="warning" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="info" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="error" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Maximum Value Badges -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Maximum Value Badges">
            <div class="d-flex align-center flex-row ga-6 justify-center">
              <v-badge color="error" content="9+" offset-x="-2" offset-y="-3">
                <MailOutlined />
              </v-badge>
              <v-badge color="primary" content="99+" offset-x="2" offset-y="-3">
                <MailOutlined />
              </v-badge>
              <v-badge color="secondary" content="999+" offset-x="2" offset-y="-3">
                <MailOutlined />
              </v-badge>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Dot Badges -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Dot Badges">
            <div class="d-flex align-center ga-6 justify-center">
              <v-badge color="primary" dot offset-x="-4" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="secondary" dot offset-x="-4" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="error" dot offset-x="-4" offset-y="-5">
                <MailOutlined />
              </v-badge>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Customized Badges -->
        <v-col cols="12" lg="4" md="6">
          <UiParentCard title="Customized Badges">
            <div class="d-flex align-center ga-6 justify-center">
              <v-badge color="error" size="large" content="2">
                <ShoppingCartOutlined :style="{fontSize: '24px'}" />
              </v-badge>
              <v-badge color="primary" inline content="2">
                <ShoppingCartOutlined :style="{fontSize: '24px'}" />
              </v-badge>
              <v-badge color="secondary" bordered content="2">
                <ShoppingCartOutlined :style="{fontSize: '24px'}" />
              </v-badge>
            </div>
          </UiParentCard>
        </v-col>
        <!-- Content -->
        <v-col cols="12" lg="8">
          <UiParentCard title="Content">
            <v-toolbar density="compact">
              <v-spacer></v-spacer>

              <v-btn class="text-none" stacked>
                <v-badge dot color="success">
                  <HomeOutlined :style="{fontSize: '20px'}" />
                </v-badge>
              </v-btn>

              <v-btn class="text-none" stacked>
                <UsergroupAddOutlined :style="{fontSize: '20px'}" />
              </v-btn>

              <v-btn class="text-none" stacked>
                <v-badge content="9+" color="error">
                  <BankOutlined :style="{fontSize: '20px'}" />
                </v-badge>
              </v-btn>

              <v-btn class="text-none" stacked>
                <v-badge content="2" color="secondary">
                  <BellOutlined :style="{fontSize: '20px'}" />
                </v-badge>
              </v-btn>

              <v-btn class="text-none" stacked>
                <MenuOutlined :style="{fontSize: '20px'}" />
              </v-btn>

              <v-spacer></v-spacer>
            </v-toolbar>
          </UiParentCard>
        </v-col>
        <!-- Alignment Badges -->
        <v-col cols="12" md="6">
          <UiParentCard title="Alignment">
            <div class="d-flex align-center flex-row ga-6 justify-center">
              <v-badge color="primary" location="top end" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="secondary" location="bottom end" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="success" location="top start" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
              <v-badge color="warning" location="bottom start" content="4" offset-x="-5" offset-y="-5">
                <MailOutlined />
              </v-badge>
            </div>
          </UiParentCard>
        </v-col>
        <v-col cols="12" md="6">
          <UiParentCard title="Overlap">
            <div class="d-flex align-center ga-2 justify-center flex-wrap">
              <v-badge color="error" dot offset-x="3">
                <v-avatar color="primary" variant="tonal" rounded="circle">
                  <UserOutlined />
                </v-avatar>
              </v-badge>
              <v-badge color="error" dot offset-x="3">
                <v-avatar color="primary" variant="flat" rounded="circle">
                  <UserOutlined />
                </v-avatar>
              </v-badge>
              <v-badge color="error" dot offset-x="3">
                <v-avatar color="lightprimary" rounded="circle">
                  <img src="@/assets/images/users/vector-2.png" class="rounded-circle" width="40" alt="Julia" />
                </v-avatar>
              </v-badge>
              <v-badge color="success" dot offset-x="-3" offset-y="-3">
                <v-avatar color="lightprimary" rounded="0">
                  <img src="@/assets/images/users/avatar-1.png" class="rounded-0" width="40" alt="Julia" />
                </v-avatar>
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
  </v-row>
</template>
