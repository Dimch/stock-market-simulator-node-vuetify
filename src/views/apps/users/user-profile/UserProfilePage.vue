<script setup>
import {ref} from 'vue';
import ProfileBanner from './ProfileBanner.vue';
import UserBackRight from './UserBackRight.vue';
import UserBackLeft from './UserBackLeft.vue';
import UserDetails from './UserDetails.vue';
import InformationTab from './InformationTab.vue';
import PaymentTab from './PaymentTab.vue';
import ChangePasswordTab from './ChangePasswordTab.vue';
import SettingTab from './SettingTab.vue';

// icons
import {MoreOutlined, UserOutlined, CreditCardOutlined, LockOutlined, SettingOutlined} from '@ant-design/icons-vue';

const tab = ref('one');
function changeTab(e) {
  tab.value = e;
}
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12">
      <v-card class="profile-banner overflow-hidden" variant="flat" color="lightprimary">
        <v-card-item class="pa-3 px-6">
          <div class="d-flex justify-space-between align-center flex-wrap ga-4">
            <ProfileBanner />
            <v-btn variant="flat" color="primary" class="editBtn" @click="changeTab('one')">Edit your profile</v-btn>
          </div>
        </v-card-item>
        <UserBackLeft />
        <UserBackRight />
      </v-card>
    </v-col>
    <v-col cols="12" lg="3" md="4">
      <v-card variant="outlined" class="bg-surface">
        <v-card-item>
          <div class="text-end">
            <v-menu class="rounded-md" elevation="24">
              <template #activator="{props}">
                <v-btn icon color="secondary" size="small" v-bind="props" variant="tonal" rounded>
                  <MoreOutlined :style="{fontSize: '16px'}" />
                </v-btn>
              </template>
              <v-list elevation="24" density="compact">
                <v-list-item value="Edit" color="secondary" @click="changeTab('one')">
                  <v-list-item-title class="text-h6">Edit</v-list-item-title>
                </v-list-item>
                <v-list-item value="Delete" color="secondary" disabled>
                  <v-list-item-title class="text-h6">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <UserDetails />
          <v-tabs v-model="tab" color="primary" class="tabBtn" density="compact" direction="vertical" hide-slider>
            <v-tab value="one" variant="flat" hide-slider> <UserOutlined class="v-icon--start" /> Personal information </v-tab>
            <v-tab value="two" variant="flat" hide-slider><CreditCardOutlined class="v-icon--start" /> Payment </v-tab>
            <v-tab value="three" variant="flat" hide-slider><LockOutlined class="v-icon--start" /> Change password </v-tab>
            <v-tab value="four" variant="flat" hide-slider><SettingOutlined class="v-icon--start" /> Settings </v-tab>
          </v-tabs>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12" lg="9" md="8">
      <v-window v-model="tab">
        <v-window-item value="one">
          <InformationTab />
        </v-window-item>

        <v-window-item value="two">
          <PaymentTab />
        </v-window-item>

        <v-window-item value="three">
          <ChangePasswordTab />
        </v-window-item>

        <v-window-item value="four">
          <SettingTab />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<style>
.editBtn {
  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>
