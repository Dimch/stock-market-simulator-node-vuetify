<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
// icons
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons-vue';

const valid = ref(false);
const logform = ref();
const password = ref('');
const conpassword = ref('');
const show1 = ref(false);
const passwordRules = ref([
  (v) => !!v || 'Password is required',
  (v) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const confirmpasswordRules = ref([
  (v) => !!v || 'Password is required',
  (v) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);

const router = useRouter();

function validate() {
  // logform.value.validate();
  if (logform.value && logform.value.validate()) {
    router.push('/starter');
  }
}
</script>

<template>
  <v-form ref="logform" lazy-validation v-model="valid" action="/starter" @submit.prevent="validate" class="mt-7 loginForm">
    <div class="mb-6">
      <v-label>Password</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        required
        placeholder="Enter password"
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="mt-2 mb-4"
      >
        <template #append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show1 == false" @click="show1 = !show1" />
            <EyeOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>
    <div class="mb-6">
      <v-label>Confirm Password</v-label>
      <v-text-field
        v-model="conpassword"
        :rules="confirmpasswordRules"
        placeholder="Enter confirm password"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        class="mt-2"
      ></v-text-field>
    </div>
    <v-btn color="primary" block class="mt-5" variant="flat" size="large" :disabled="!valid" type="submit">Reset Password </v-btn>
  </v-form>
</template>
<style lang="scss">
.loginForm {
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
