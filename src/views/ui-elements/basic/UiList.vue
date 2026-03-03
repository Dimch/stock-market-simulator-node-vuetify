<script setup>
import {ref, shallowRef} from 'vue';
// common components
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

// icons
import {
  LayoutOutlined,
  FilePptOutlined,
  RadiusUprightOutlined,
  SettingOutlined,
  CameraOutlined,
  FileSearchOutlined,
  AimOutlined,
  GiftOutlined,
  MessageOutlined,
  MoreOutlined
} from '@ant-design/icons-vue';

// assets
import User1 from '@/assets/images/users/avatar-1.png';
import User2 from '@/assets/images/users/avatar-2.png';
import User3 from '@/assets/images/users/avatar-3.png';
import User4 from '@/assets/images/users/avatar-4.png';
import User5 from '@/assets/images/users/avatar-5.png';

// component content
const page = ref({title: 'Lists'});
const subContent = ref({content: 'Lists are continuous, vertical indexes of text or images.'});
const path = ref({filepath: 'src/views/ui-elements/basic/list'});
const link = ref({filelink: 'https://vuetifyjs.com/en/components/lists/'});

// List 1,3 Data
const list1 = shallowRef([
  {
    name: 'List item 01',
    id: 1,
    link: ''
  },
  {
    name: 'List item 02',
    id: 2,
    link: ''
  },
  {
    name: 'Sample',
    icon: LayoutOutlined,
    id: 3,
    link: '/basic/uilist'
  },
  {
    name: 'Page',
    icon: FilePptOutlined,
    id: 4,
    link: ''
  },
  {
    name: 'Ui elements',
    icon: RadiusUprightOutlined,
    id: 5,
    link: ''
  }
]);

// List 2 data
const open = ref(['Users']);
const open1 = ref(['Users']);

// List 5 data
const folders = shallowRef([
  {
    image: User1,
    subtitle: '— I wll be in your neighborhood doing errands this…',
    title: 'Brunch this weekend?',
    submaintitle: 'Ali Connors'
  },
  {
    image: User2,
    subtitle: "— Wish I could come, but I'm out of town this…",
    title: 'Summer BBQ',
    submaintitle: 'to Scott, Alex, Jennifer'
  },
  {
    image: User3,
    subtitle: '— Do you have Paris recommendations? Have you ever…',
    title: 'Oui Oui',
    submaintitle: 'Sandra Adams'
  }
]);

// List folder data
const folders1 = shallowRef([
  {
    icon: CameraOutlined,
    subtitle: 'Jan 9, 2023',
    title: 'Photos',
    color: 'warning'
  },
  {
    icon: FileSearchOutlined,
    subtitle: 'Jan 7, 2023',
    title: 'Work',
    color: 'primary'
  },
  {
    icon: AimOutlined,
    subtitle: 'July 20, 2023',
    title: 'Vacation',
    color: 'info'
  }
]);

const transaction = shallowRef([
  {
    icon: GiftOutlined,
    subtitle: 'Today, 2:00 AM',
    title: 'Payment from #002434',
    color: 'success',
    price: '+ $1,430',
    pricepercent: '78%'
  },
  {
    icon: MessageOutlined,
    subtitle: '5 August, 1:45 PM',
    title: 'Payment from #984947',
    color: 'primary',
    price: '+ $302',
    pricepercent: '8%'
  },
  {
    icon: SettingOutlined,
    subtitle: '7 hours ago',
    title: 'Payment from #988784',
    color: 'error',
    price: '+ $682',
    pricepercent: '16%'
  }
]);

const userList = shallowRef([
  {
    image: User4,
    subtitle: 'Developer',
    title: 'Jone Doe'
  },
  {
    image: User5,
    subtitle: '5 August, 1:45 PM',
    title: 'Payment from #984947'
  }
]);

const notificationList = shallowRef([
  {
    image: User1,
    subtitle: '2 min ago',
    title: 'birthday today.',
    name: "Cristina danny's",
    time: '3:00 AM'
  },
  {
    image: User2,
    subtitle: '5 August',
    title: 'commented your post.',
    name: 'Aida Burg',
    time: '6:00 PM'
  },
  {
    image: User3,
    subtitle: '7 hours ago',
    title: 'Profile Complete',
    lastContent: '60%',
    time: '2:45 PM'
  },
  {
    image: User4,
    subtitle: 'Daily scrum meeting time',
    title: 'invited to join',
    name: 'Cristina Danny',
    lastContent: 'Meeting.',
    time: '9:10 PM'
  }
]);
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Basic -->
        <v-col cols="12" sm="6">
          <UiTitleCard title="Basic" class-name="px-0 pb-0">
            <v-list class="py-0" aria-label="list" aria-busy="true">
              <v-list-item v-for="(list, i) in list1" :value="list" rounded="0" :key="i" color="secondary" border>
                <template #prepend>
                  <component :is="list.icon" class="me-2" />
                </template>
                <v-list-item-title class="text-h6">{{ list.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- Nested List -->
        <v-col cols="12" sm="6">
          <UiTitleCard title="Nested" class-name="px-0 pb-0">
            <v-list v-model:opened="open" class="py-0" aria-label="list" aria-busy="true">
              <v-list-group value="Users">
                <template #activator="{props}">
                  <v-list-item v-bind="props" rounded="0" color="secondary" border>
                    <template #prepend>
                      <LayoutOutlined class="me-2" />
                    </template>
                    <v-list-item-title class="text-h6">Sample</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list-item value="List item 01" rounded="0" variant="tonal">
                  <v-list-item-title class="text-h6">List item 01</v-list-item-title>
                </v-list-item>
                <v-list-item value="List item 02" rounded="0" variant="tonal">
                  <v-list-item-title class="text-h6">List item 02</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list>
            <v-list v-model:opened="open1" class="py-0" aria-label="list" aria-busy="true">
              <v-list-group value="Settings">
                <template #activator="{props}">
                  <v-list-item v-bind="props" rounded="0" color="secondary" border>
                    <template #prepend>
                      <SettingOutlined class="me-2" />
                    </template>
                    <v-list-item-title class="text-h6">Settings</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list-item value="List item 03" rounded="0" variant="tonal">
                  <v-list-item-title class="text-h6">List item 03</v-list-item-title>
                </v-list-item>
                <v-list-item value="List item 04" rounded="0" variant="tonal">
                  <v-list-item-title class="text-h6">List item 04</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list>
            <v-list class="py-0" aria-label="list" aria-busy="true">
              <v-list-item value="Ui elements" color="secondary" rounded="md" border>
                <template #prepend>
                  <RadiusUprightOutlined class="me-2" />
                </template>
                <v-list-item-title class="text-h6">Ui elements</v-list-item-title>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- Selected List Item -->
        <v-col cols="12" sm="6">
          <UiTitleCard title="Selected" class-name="px-0 pb-0">
            <v-list v-model:opened="open1" class="py-0" aria-label="list" aria-busy="true">
              <v-list-group value="Users">
                <template #activator="{props}">
                  <v-list-item v-bind="props" rounded="0" color="primary" border active variant="text">
                    <template #prepend>
                      <LayoutOutlined class="me-2" />
                    </template>
                    <v-list-item-title class="text-h6">Sample</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list-item value="List item 01" rounded="0" variant="text">
                  <v-list-item-title class="text-h6">List item 01</v-list-item-title>
                </v-list-item>
                <v-list-item value="List item 02" rounded="0" variant="text">
                  <v-list-item-title class="text-h6">List item 02</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list>
            <v-list v-model:opened="open1" class="py-0" aria-label="list" aria-busy="true">
              <v-list-group value="Settings">
                <template #activator="{props}">
                  <v-list-item v-bind="props" rounded="0" color="primary" border variant="text">
                    <template #prepend>
                      <SettingOutlined class="me-2" />
                    </template>
                    <v-list-item-title class="text-h6">Settings</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list-item value="List item 03" rounded="0" variant="text">
                  <v-list-item-title class="text-h6">List item 03</v-list-item-title>
                </v-list-item>
                <v-list-item value="List item 04" rounded="0" variant="text">
                  <v-list-item-title class="text-h6">List item 04</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list>
            <v-list class="py-0" aria-label="list" aria-busy="true">
              <v-list-item value="Ui elements" color="secondary" rounded="md" border>
                <template #prepend>
                  <RadiusUprightOutlined class="me-2" />
                </template>
                <v-list-item-title class="text-h6">Ui elements</v-list-item-title>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- align List -->
        <v-col cols="12" sm="6">
          <UiTitleCard title="Align Item" class-name="px-0 pb-0 user-list">
            <v-list lines="two" class="pt-3 pb-7" aria-label="list" aria-busy="true">
              <v-list-item v-for="folder in folders" :key="folder.title" :subtitle="folder.subtitle" class="pe-0 pb-0 align-start">
                <template #prepend>
                  <v-avatar size="40" variant="flat" color="lightprimary">
                    <img :src="folder.image" width="40" alt="Julia" />
                  </v-avatar>
                </template>

                <template #title>
                  <h5 class="text-subtitle-1 mb-0">{{ folder.title }}</h5>
                </template>
                <template #subtitle>
                  <span class="text-subtitle-2 text-darkText">{{ folder.submaintitle }}</span>
                  <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                </template>
                <v-divider inset class="mt-3"></v-divider>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- Folder List -->
        <v-col cols="12" md="6">
          <UiTitleCard title="Folder List" class-name="px-0 pb-0">
            <v-list lines="two" aria-label="list" aria-busy="true">
              <v-list-item v-for="folder in folders1" :key="folder.title" :subtitle="folder.subtitle">
                <template #prepend>
                  <v-avatar
                    size="40"
                    :color="folder.color"
                    :class="`text-${folder.color} border-solid border-${folder.color} border-thin border-opacity-100`"
                    variant="tonal"
                  >
                    <component :is="folder.icon" :style="{fontSize: '16px'}" />
                  </v-avatar>
                </template>

                <template #title>
                  <h5 class="text-subtitle-1 mb-0">{{ folder.title }}</h5>
                </template>
                <template #subtitle>
                  <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                </template>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- transaction List -->
        <v-col cols="12" md="6">
          <UiTitleCard title="Transaction History" class-name="px-0 pb-0">
            <v-list lines="two" class="py-0" aria-label="list" aria-busy="true">
              <v-list-item v-for="history in transaction" :key="history.title" border>
                <template #prepend>
                  <v-avatar
                    size="40"
                    :color="history.color"
                    :class="`text-${history.color} border-solid border-${history.color} border-thin border-opacity-100`"
                    variant="tonal"
                  >
                    <component :is="history.icon" :style="{fontSize: '16px'}" />
                  </v-avatar>
                </template>
                <div class="d-flex align-center justify-space-between w-100 ga-2">
                  <div>
                    <h6 class="text-subtitle-1 mb-0">{{ history.title }}</h6>
                    <span class="text-subtitle-2 text-lightText font-weight-regular">{{ history.subtitle }}</span>
                  </div>
                  <div class="text-end">
                    <h6 class="text-subtitle-1 mb-0">{{ history.price }}</h6>
                    <span class="text-h6 text-lightText">{{ history.pricepercent }}</span>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- Scrollable List -->
        <v-col cols="12" md="6">
          <UiTitleCard title="Scrollable" class-name="px-0 pb-0">
            <perfect-scrollbar style="max-height: 310px" :options="{suppressScrollX: true}">
              <v-list class="py-0" aria-label="list" aria-busy="true">
                <v-list-item v-for="(n, index) in 200" :value="n" :key="index" color="secondary" border>
                  <v-list-item-title class="text-h6">Item {{ n }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </perfect-scrollbar>
          </UiTitleCard>
        </v-col>
        <!-- Notification List -->
        <v-col cols="12" md="6">
          <UiTitleCard title="Notification" class-name="px-0 pb-0 user-list">
            <v-list lines="two" class="py-0" aria-label="list" aria-busy="true">
              <v-list-item v-for="item in notificationList" :key="item.title" border>
                <template #prepend>
                  <v-avatar size="40" variant="flat" color="lightprimary">
                    <img :src="item.image" width="40" alt="Julia" />
                  </v-avatar>
                </template>
                <div class="d-flex align-start justify-space-between w-100 ga-2">
                  <div>
                    <h6 class="text-subtitle-1 mb-0">
                      <span class="me-1">{{ item.name }}</span>
                      <span class="font-weight-regular">{{ item.title }}</span>
                      <span class="ms-1">{{ item.lastContent }}</span>
                    </h6>
                    <span class="text-subtitle-2 text-lightText font-weight-regular">{{ item.subtitle }}</span>
                  </div>
                  <div class="text-end">
                    <span class="text-subtitle-2">{{ item.time }}</span>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
        <!-- Users List -->
        <v-col cols="12" md="6">
          <UiTitleCard title="Users" class-name="px-0 pb-0 user-list">
            <v-list lines="two" class="py-0" aria-label="list" aria-busy="true">
              <v-list-item v-for="item in userList" :key="item.title" border>
                <template #prepend>
                  <v-avatar size="40" variant="flat" color="lightprimary">
                    <img :src="item.image" width="40" alt="Julia" />
                  </v-avatar>
                </template>
                <div class="d-flex align-center justify-space-between w-100">
                  <div>
                    <h6 class="text-subtitle-1 mb-0">{{ item.title }}</h6>
                    <span class="text-subtitle-2 text-lightText font-weight-regular">{{ item.subtitle }}</span>
                  </div>
                  <div class="text-end">
                    <v-btn variant="text" icon rounded color="primary" size="small">
                      <MoreOutlined :style="{fontSize: '16px'}" />
                    </v-btn>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </UiTitleCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.user-list {
  .v-list-item__prepend {
    align-self: flex-start;
  }
  .v-list-item-subtitle {
    padding-right: 40px;
    [dir='rtl'] & {
      padding-right: unset;
      padding-left: 40px;
    }
    @media (max-width: 991px) {
      padding-right: 20px;
      [dir='rtl'] & {
        padding-right: unset;
        padding-left: 20px;
      }
    }
  }
}
</style>
