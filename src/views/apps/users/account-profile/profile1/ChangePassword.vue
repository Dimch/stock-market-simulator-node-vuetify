<script setup>
import {ref, shallowRef} from 'vue';

// icons
import {EyeInvisibleOutlined, EyeOutlined, LineOutlined, CheckOutlined} from '@ant-design/icons-vue';

const cpassword = ref('');
const npassword = ref('');
const conpassword = ref('');
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);

const items = shallowRef([
  {
    title: 'At least 8 characters',
    icon: LineOutlined
  },
  {
    title: 'At least 1 lower letter (a-z)',
    icon: CheckOutlined,
    color: 'success'
  },
  {
    title: 'At least 1 uppercase letter (A-Z)',
    icon: LineOutlined
  },
  {
    title: 'At least 1 number (0-9)',
    icon: LineOutlined
  },
  {
    title: 'At least 1 special characters',
    icon: LineOutlined
  }
]);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card variant="outlined">
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">Change Password</h5>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <v-label class="mb-2">Old Password</v-label>
                    <v-text-field
                      color="primary"
                      single-line
                      placeholder="Enter Old Password"
                      variant="outlined"
                      :type="show1 ? 'text' : 'password'"
                      hide-details
                      v-model="cpassword"
                    >
                      <template #append-inner>
                        <EyeInvisibleOutlined
                          :style="{color: 'rgb(var(--v-theme-secondary))'}"
                          v-if="show1 == false"
                          @click="show1 = !show1"
                        />
                        <EyeOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show1 == true" @click="show1 = !show1" />
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-label class="mb-2">New Password</v-label>
                    <v-text-field
                      color="primary"
                      single-line
                      placeholder="Enter New Password"
                      variant="outlined"
                      :type="show2 ? 'text' : 'password'"
                      hide-details
                      v-model="npassword"
                    >
                      <template #append-inner>
                        <EyeInvisibleOutlined
                          :style="{color: 'rgb(var(--v-theme-secondary))'}"
                          v-if="show2 == false"
                          @click="show2 = !show2"
                        />
                        <EyeOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show2 == true" @click="show2 = !show2" />
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-label class="mb-2">Confirm Password</v-label>
                    <v-text-field
                      color="primary"
                      single-line
                      placeholder="Enter Confirm Password"
                      variant="outlined"
                      :type="show3 ? 'text' : 'password'"
                      hide-details
                      v-model="conpassword"
                    >
                      <template #append-inner>
                        <EyeInvisibleOutlined
                          :style="{color: 'rgb(var(--v-theme-secondary))'}"
                          v-if="show3 == false"
                          @click="show3 = !show3"
                        />
                        <EyeOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show3 == true" @click="show3 = !show3" />
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <h5 class="text-h5">New Password must contain:</h5>
                <v-list aria-label="content" aria-busy="true">
                  <v-list-item v-for="(item, index) in items" :key="index" border>
                    <template #prepend>
                      <component :is="item.icon" :class="`me-2 text-${item.color}`" />
                    </template>
                    <h6 class="text-h6 mb-0">{{ item.title }}</h6>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <div class="text-end mt-4">
              <v-btn color="secondary" variant="outlined" class="me-2">Cancel</v-btn>
              <v-btn color="primary" variant="flat">Update profile</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
