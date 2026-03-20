<script setup>
import {onMounted, watch, computed} from 'vue';
import {useTheme} from 'vuetify';
import {RouterView} from 'vue-router';
import LoaderWrapper from './LoaderWrapper.vue';
import HorizontalHeader from './horizontal/Header.vue';
import HorizontalSidebar from './horizontal/Sidebar.vue';
import VerticalHeader from './vertical/Header.vue';
import VerticalSidebar from './vertical/Sidebar.vue';
import Customizer from './shared/CustomizerPanel.vue';
import FooterPanel from './shared/FooterPanel.vue';
import {useCustomizerStore} from '@/stores/customizer';
import {DirAttrSet, HexToRgb} from '@/utils/utils';
const customizer = useCustomizerStore();
const theme = useTheme();

// Set the initial direction attribute when the component is mounted
onMounted(() => {
  DirAttrSet(customizer.isRtl ? 'rtl' : 'ltr');
});
watch(() => customizer.isRtl, newValue => DirAttrSet(newValue ? 'rtl' : 'ltr'));

// Compute dynamic styles based on the current theme colors
const dynamicStyle = computed(() => ({
  '--v-theme-primary': HexToRgb(theme.current.value.colors.primary),
  '--v-theme-darkprimary': HexToRgb(theme.current.value.colors.darkprimary),
  '--v-theme-lightprimary': HexToRgb(theme.current.value.colors.lightprimary)
}));

// Determine current layout type and select the appropriate header and sidebar components.
const layoutType = computed(() => (customizer.setHorizontalLayout ? 'horizontal' : 'vertical'));
const headers = {
  horizontal: HorizontalHeader,
  vertical: VerticalHeader,
};
const sidebars = {
  horizontal: HorizontalSidebar,
  vertical: VerticalSidebar,
};
const HeaderComponent = computed(() => headers[layoutType.value]);
const SidebarComponent = computed(() => sidebars[layoutType.value]);

// Method to conditionally apply the preset class
const getStyleObject = () => dynamicStyle.value || {};

const applicationClass = computed(() => ({
  'boxed-layout': customizer.boxed,
  'rtl-layout': customizer.isRtl,
  'dark-layout': customizer.darkMode,
  'light-layout': !customizer.darkMode
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
  <v-locale-provider :rtl="customizer.isRtl">
    <v-app :style="getStyleObject()" :theme="theme.global.name.value" :class="applicationClass">
      <Customizer />
      <HeaderComponent />
      <SidebarComponent />

      <v-main ref="wrapperRef" v-resize="calcHeight"
              class="page-wrapper overflow-scroll" :height="wrapperHeight">
        <v-container fluid>
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <LoaderWrapper />
            <RouterView />
          </div>
        </v-container>
        <v-container fluid class="pt-0">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <FooterPanel />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
