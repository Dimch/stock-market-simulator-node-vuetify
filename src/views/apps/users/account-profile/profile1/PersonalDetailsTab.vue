<script setup>
import {ref} from 'vue';

// icons
import {TwitterSquareFilled, FacebookFilled, LinkedinFilled} from '@ant-design/icons-vue';

const experience = ref(['Start up', '6 months', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '10+ years']);
const tel = ref(['+91', '1-671', '+36', '(255)', '+39', '1-876', '+7', '(254)', '(373)', '1-664', '+95', '(264)']);

const textFname = ref('Anshan');
const textLname = ref('Handgun');
const textcountry = ref('New york');
const textcode = ref('956754');
const textExperience = ref('Start up');
const texttel = ref('1-876');
const textBio = ref(
  'Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.'
);
const textContact = ref('+1 (865) 423-9581');
const textEmail = ref('stebin.ben@gmail.com');
const textURL = ref('https://anshan.dh.url');
const textAddress = ref('Street 110-B Kalians Bag, Dewan, M.P. New York');
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card variant="flat">
        <v-card variant="outlined">
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">Personal Information</h5>
          </div>

          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-avatar size="72" variant="flat" color="lightprimary">
                  <img src="@/assets/images/users/vector-1.png" width="72" alt="profile" />
                  <input type="file" aria-label="preview" class="preview-upload" />
                </v-avatar>
              </v-col>
              <v-col cols="12" lg="6">
                <v-label class="mb-2">First name</v-label>
                <v-text-field
                  color="primary"
                  single-line
                  variant="outlined"
                  aria-label="firstname"
                  type="text"
                  hide-details
                  v-model="textFname"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <v-label class="mb-2">Last name</v-label>
                <v-text-field
                  color="primary"
                  single-line
                  label="Last Name"
                  aria-label="lastname"
                  variant="outlined"
                  type="text"
                  hide-details
                  v-model="textLname"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <v-label class="mb-2">Country</v-label>
                <v-text-field
                  color="primary"
                  aria-label="country"
                  single-line
                  label="country Name"
                  variant="outlined"
                  type="text"
                  hide-details
                  v-model="textcountry"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <v-label class="mb-2">Zip code</v-label>
                <v-text-field
                  color="primary"
                  single-line
                  label="Zip code"
                  aria-label="zip"
                  variant="outlined"
                  type="text"
                  hide-details
                  v-model="textcode"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-label class="mb-2">Bio</v-label>
                <v-textarea color="primary" single-line label="Bio" aria-label="bio" variant="outlined" v-model="textBio" hide-details>
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-label class="mb-2">Experiance</v-label>
                <v-select
                  color="primary"
                  single-line
                  role="link"
                  :items="experience"
                  label="Experience"
                  variant="outlined"
                  v-model="textExperience"
                  hide-details
                >
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card variant="flat" class="mb-6">
        <v-card variant="outlined">
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">Social Network</h5>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <v-list class="py-0" density="compact" aria-label="social list" aria-busy="true">
              <v-list-item class="pa-0">
                <v-btn color="twitter" variant="text">
                  <template #prepend>
                    <TwitterSquareFilled :style="{fontSize: '18px'}" />
                  </template>
                  Twitter
                </v-btn>
                <template #append>
                  <v-btn color="error" variant="text"> Connect </v-btn>
                </template>
              </v-list-item>
              <v-list-item class="pa-0">
                <v-btn color="facebook" variant="text">
                  <template #prepend>
                    <FacebookFilled :style="{fontSize: '18px'}" />
                  </template>
                  Facebook
                </v-btn>
                <template #append>
                  <h6 class="text-subtitle-1 text-facebook mb-0">Anshan Handgun</h6>
                </template>
              </v-list-item>
              <v-list-item class="pa-0">
                <v-btn color="linkedin" variant="text">
                  <template #prepend>
                    <LinkedinFilled :style="{fontSize: '18px'}" />
                  </template>
                  Twitter
                </v-btn>
                <template #append>
                  <v-btn color="error" variant="text"> Connect </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-card>
      <v-card variant="flat">
        <v-card variant="outlined">
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">Contact Information</h5>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" lg="6">
                <v-label class="mb-2">Phone Number</v-label>
                <div class="d-flex ga-4">
                  <v-select
                    color="primary"
                    style="width: 30px"
                    single-line
                    role="link"
                    :items="tel"
                    label="Experience"
                    variant="outlined"
                    v-model="texttel"
                    hide-details
                  >
                  </v-select>
                  <v-text-field
                    color="primary"
                    single-line
                    aria-label="contact"
                    label="Contact Phone"
                    variant="outlined"
                    type="text"
                    hide-details
                    v-model="textContact"
                  >
                  </v-text-field>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <v-label class="mb-2">Email Address</v-label>
                <v-text-field
                  color="primary"
                  single-line
                  label="Email"
                  aria-label="email"
                  variant="outlined"
                  type="email"
                  hide-details
                  v-model="textEmail"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-label class="mb-2">Portfolio URL</v-label>
                <v-text-field
                  color="primary"
                  single-line
                  aria-label="url"
                  label="Portfolio URL"
                  variant="outlined"
                  type="text"
                  hide-details
                  v-model="textURL"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-label class="mb-2">Address</v-label>
                <v-text-field
                  color="primary"
                  single-line
                  aria-label="address"
                  label="Address"
                  variant="outlined"
                  rows="3"
                  type="text"
                  hide-details
                  v-model="textAddress"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
    <v-col cols="12" class="text-end">
      <v-btn color="secondary" variant="outlined" class="me-4"> Cancel </v-btn>
      <v-btn color="primary" variant="flat"> Update profile </v-btn>
    </v-col>
  </v-row>
</template>
