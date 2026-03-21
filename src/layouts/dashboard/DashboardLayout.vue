<script setup>
import {computed} from 'vue';
import {useTheme} from 'vuetify';
import {RouterView} from 'vue-router';
import LoaderWrapper from './LoaderWrapper.vue';
// import HorizontalHeader from './horizontal/Header.vue';
// import HorizontalSidebar from './horizontal/Sidebar.vue';
import VerticalHeader from './vertical/Header.vue';
import VerticalSidebar from './vertical/Sidebar.vue';
import FooterPanel from './shared/FooterPanel.vue';
const theme = useTheme();

const HeaderComponent = computed(() => VerticalHeader);
const SidebarComponent = computed(() => VerticalSidebar);

const applicationClass = computed(() => ({
  'boxed-layout': false,
  'rtl-layout': false,
  'dark-layout': theme.current.value.dark,
  'light-layout': !theme.current.value.dark
}));

// Responsive height calculation for the main content area
const wrapperRef = ref(null);
const wrapperHeight = ref('auto');
const calcPosInDoc = el => (el?.offsetParent ? calcPosInDoc(el.offsetParent) + el.offsetTop : el?.offsetTop || 0);
const calcHeight = () => {
  if (!wrapperRef.value) {
    wrapperHeight.value = 'auto';
    return;
  }
  wrapperHeight.value = window.innerHeight - calcPosInDoc(wrapperRef.value.$el);
};
</script>

<template>
  <v-locale-provider>
    <v-app :theme="theme.global.name.value" :class="applicationClass">
      <HeaderComponent />
      <SidebarComponent />

      <v-main ref="wrapperRef" v-resize="calcHeight"
              class="page-wrapper overflow-scroll" :height="wrapperHeight">
        <v-container fluid>
          <div>
            <LoaderWrapper />
            <RouterView />
          </div>
        </v-container>
        <v-container fluid class="pt-0">
          <div>
            <FooterPanel />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
