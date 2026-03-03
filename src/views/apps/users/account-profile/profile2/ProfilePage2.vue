<script setup>
import {ref} from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

// tabs import
import UserProfileTab from './UserProfileTab.vue';
import BillingTab from './BillingTab.vue';
import PaymentTab from './PaymentTab.vue';
import ChangePasswordTab from './ChangePasswordTab.vue';

// icons
import {UserOutlined, FileTextOutlined, CreditCardOutlined, KeyOutlined} from '@ant-design/icons-vue';

// theme breadcrumb
const page = ref({title: 'Profile 02'});
const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '#'
  },
  {
    title: 'Account',
    disabled: false,
    href: '#'
  },
  {
    title: 'Profile 02',
    disabled: true,
    href: '#'
  }
]);

// tabs data
const tab = ref('tab-profile');
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card variant="outlined">
          <v-card-item>
            <v-card-title class="text-h6">Account Settings</v-card-title>
          </v-card-item>
          <v-divider></v-divider>
          <div class="my-3">
            <v-row class="d-flex flex-row">
              <v-col cols="12" sm="4" class="border-sm-right pe-sm-0 py-sm-0">
                <v-card-text>
                  <v-tabs v-model="tab" direction="vertical" color="primary">
                    <v-tab value="tab-profile" rounded="md" class="text-start overflow-hidden" height="70">
                      <UserOutlined class="v-icon--start" />
                      <div>
                        <div>User Profile</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Profile Settings</span>
                      </div>
                    </v-tab>
                    <v-tab value="tab-billing" rounded="md" class="text-start overflow-hidden" height="70">
                      <FileTextOutlined class="v-icon--start" />
                      <div>
                        <div>Billing</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Billing Information</span>
                      </div>
                    </v-tab>
                    <v-tab value="tab-payment" rounded="md" class="text-start overflow-hidden" height="70">
                      <CreditCardOutlined class="v-icon--start" />
                      <div>
                        <div>Payment</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Add & Update Card</span>
                      </div>
                    </v-tab>
                    <v-tab value="tab-change-password" rounded="md" class="mb-3 text-start overflow-hidden" height="70">
                      <KeyOutlined class="v-icon--start" />
                      <div>
                        <div>Change Password</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Update Profile Security</span>
                      </div>
                    </v-tab>
                  </v-tabs>
                </v-card-text>
                <v-divider class="px-4 d-sm-none"></v-divider>
              </v-col>

              <v-col cols="12" sm="8" class="ps-sm-0 py-sm-0">
                <v-card-text>
                  <v-window v-model="tab">
                    <v-window-item value="tab-profile">
                      <UserProfileTab />
                    </v-window-item>
                    <v-window-item value="tab-billing">
                      <BillingTab />
                    </v-window-item>
                    <v-window-item value="tab-payment">
                      <PaymentTab />
                    </v-window-item>
                    <v-window-item value="tab-change-password">
                      <ChangePasswordTab />
                    </v-window-item>
                  </v-window>
                </v-card-text>
              </v-col>
            </v-row>
          </div>

          <v-divider></v-divider>
          <div class="pa-6 text-end">
            <v-btn color="primary" variant="flat">Continue</v-btn>
          </div>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
