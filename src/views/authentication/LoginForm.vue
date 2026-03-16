<script setup>
import {computed, ref} from 'vue';
// icons
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons-vue';
import {useAdminAuthStore} from '@/stores/auth';
import {Form as VeeForm} from 'vee-validate';

const checkbox = ref(false);
const valid = ref(false);
const showPass = ref(false);
const passType = computed(() => showPass.value ? 'text' : 'password');
const password = ref('password');
const username = ref('admin@example.com');
// Password validation rules
const passwordRules = ref([
  v => !!v || 'Password is required',
]);
// Email validation rules
const emailRules = ref([
  v => !!v.trim() || 'Email is required',
  v => /.+@.+\..+/.test(v.trim()) || 'Email must be valid',
]);

const validate = async (values, {setErrors}) => {
  username.value = username.value.trim();
  const authStore = useAdminAuthStore();
  return authStore.login(username.value, password.value)
    .catch((err) => setErrors({apiError: err}));
};
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Login</h3>
    <router-link to="/register" class="text-primary text-decoration-none">
      Don't have an account?
    </router-link>
  </div>
  <vee-form @submit="validate" class="mt-7 login-form" v-slot="{errors, isSubmitting}">
    <div class="mb-6">
      <v-label>Email</v-label>
      <v-text-field aria-label="email" v-model="username" :rules="emailRules" class="mt-2" required
                    hide-details="auto" variant="outlined" color="primary"></v-text-field>
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field aria-label="password" v-model="password" :rules="passwordRules" required variant="outlined"
                    color="primary" hide-details="auto" :type="passType" class="mt-2">
        <template #append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeOutlined v-if="showPass" color="rgb(var(--v-theme-secondary))"
                         @click="showPass = !showPass" />
            <EyeInvisibleOutlined v-else color="rgb(var(--v-theme-secondary))"
                                  @click="showPass = !showPass" />
          </v-btn>
        </template> 
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']"
                  label="Randomly sign me out" required color="primary" class="ms-n2" hide-details />
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-5" variant="flat" size="large" :disabled="valid"
           type="submit" prepend-icon="mdi-login">
      Login
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">
        {{ errors.apiError }}
      </v-alert>
    </div>
  </vee-form>
</template>

<style lang="scss">
.login-form {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }

  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
