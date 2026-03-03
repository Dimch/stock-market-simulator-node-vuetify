<script setup>
import {ref} from 'vue';
// icons
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons-vue';
import {useAdminAuthStore} from '@/stores/auth';
import {Form as VeeForm} from 'vee-validate';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('password');
const username = ref('admin@example.com');
// Password validation rules
const passwordRules = ref([
  (v) => !!v || 'Password is required',
  (v) => v === v.trim() || 'Password cannot start or end with spaces',
  (v) => v.length <= 10 || 'Password must be less than 10 characters'
]);
// Email validation rules
const emailRules = ref([
  (v) => !!v.trim() || 'E-mail is required',
  (v) => {
    const trimmedEmail = v.trim();
    return !/\s/.test(trimmedEmail) || 'E-mail must not contain spaces';
  },
  (v) => /.+@.+\..+/.test(v.trim()) || 'E-mail must be valid'
]);

const validate = async (values, {setErrors}) => {
  // Trim the username before validation
  const trimmedUsername = username.value.trim();

  // Update the username with trimmed value
  username.value = trimmedUsername;

  const authStore = useAdminAuthStore();
  return authStore.login(trimmedUsername, password.value).catch((error) => setErrors({apiError: error}));
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Login</h3>
    <router-link to="/register1" class="text-primary text-decoration-none">Don't Have an account?</router-link>
  </div>
  <vee-form @submit="validate" class="mt-7 loginForm" v-slot="{errors, isSubmitting}">
    <div class="mb-6">
      <v-label>Email Address</v-label>
      <v-text-field aria-label="email address" v-model="username" :rules="emailRules" class="mt-2" required
        hide-details="auto" variant="outlined" color="primary"></v-text-field>
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field aria-label="password" v-model="password" :rules="passwordRules" required variant="outlined"
        color="primary" hide-details="auto" :type="show1 ? 'text' : 'password'" class="mt-2">
        <template #append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show1 == false"
              @click="show1 = !show1" />
            <EyeOutlined :style="{color: 'rgb(var(--v-theme-secondary))'}" v-if="show1 == true"
              @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']" label="Keep me sign in"
        required color="primary" class="ms-n2" hide-details />
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-5" variant="flat" size="large" :disabled="valid"
      type="submit">
      Login</v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">
        {{ errors.apiError }}
      </v-alert>
    </div>
  </vee-form>
</template>

<style lang="scss">
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }

  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
