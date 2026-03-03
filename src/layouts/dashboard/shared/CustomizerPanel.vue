<script setup>
import {onMounted, ref, shallowRef, watch} from 'vue';
import {useTheme} from 'vuetify';
import {useCustomizerStore} from '@/stores/customizer';
// icons
import {
  CloseCircleOutlined,
  BorderInnerOutlined,
  HighlightOutlined,
  BgColorsOutlined,
  FontColorsOutlined,
  LayoutOutlined
} from '@ant-design/icons-vue';

// assets
import Color from '@/assets/images/customizer/theme-color.svg';

const customizer = useCustomizerStore();

// Theme string constants for readability
const Theme = {
  Light: 'light',
  Dark: 'dark',
  System: 'system'
};

// RTL mode state
const rtlmode = ref(true);

// themes color options
const themeColors = ref([
  {
    bg: 'themeDefault',
    color: '#1677ff',
    darkColor: '#0958d9',
    lightcolor: '#e6f4ff',
    lightcolorfordark: '#111a2c',
    label: 'default'
  },
  {
    bg: 'themeLightTheme1',
    color: '#3366ff',
    darkColor: '#254edb',
    lightcolor: '#d6e4ff',
    lightcolorfordark: '#1c2134',
    label: 'theme1'
  },
  {
    bg: 'themeLightTheme2',
    color: '#7265e6',
    darkColor: '#6559cb',
    lightcolor: '#eeedfc',
    lightcolorfordark: '#222130',
    label: 'theme2'
  },
  {
    bg: 'themeLightTheme3',
    color: '#068e44',
    darkColor: '#0a7c3e',
    lightcolor: '#e6f3ec',
    lightcolorfordark: '#1a231f',
    label: 'theme3'
  },
  {
    bg: 'themeLightTheme4',
    color: '#3c64d0',
    darkColor: '#3051ab',
    lightcolor: '#f0f6ff',
    lightcolorfordark: '#1d212d',
    label: 'theme4'
  },
  {
    bg: 'themeLightTheme5',
    color: '#f27013',
    darkColor: '#d96818',
    lightcolor: '#fff4e6',
    lightcolorfordark: '#32221a',
    label: 'theme5'
  },
  {
    bg: 'themeLightTheme6',
    color: '#2aa1af',
    darkColor: '#2694a1',
    lightcolor: '#e1f0ef',
    lightcolorfordark: '#1c2628',
    label: 'theme6'
  },
  {
    bg: 'themeLightTheme7',
    color: '#00a854',
    darkColor: '#029149',
    lightcolor: '#e3f1e8',
    lightcolorfordark: '#1a2721',
    label: 'theme7'
  },
  {
    bg: 'themeLightTheme8',
    color: '#009688',
    darkColor: '#04897c',
    lightcolor: '#e6efec',
    lightcolorfordark: '#1a2524',
    label: 'theme8'
  }
]);

// Get the Vuetify theme instance
const vuetifyTheme = useTheme();

// Define refs for primary and dark primary colors
const customPrimaryColor = ref('#1677ff');
const customDarkPrimaryColor = ref('#0958d9');
const customLightPrimaryColor = ref('#e6f4ff');
const customLightPrimaryColorForDark = ref('#111a2c');

// Watch for changes in the primary colors and update the theme accordingly
watch(
  [customPrimaryColor, customDarkPrimaryColor, customLightPrimaryColor, customLightPrimaryColorForDark],
  ([newPrimaryColor, newDarkPrimaryColor, newLightPrimaryColor, newLightPrimaryColorForDark]) => {
    vuetifyTheme.themes.value.light.colors.primary = newPrimaryColor;
    vuetifyTheme.themes.value.light.colors.darkprimary = newDarkPrimaryColor;
    vuetifyTheme.themes.value.dark.colors.primary = newPrimaryColor;
    vuetifyTheme.themes.value.dark.colors.darkprimary = newDarkPrimaryColor;

    vuetifyTheme.themes.value.light.colors.lightprimary = newLightPrimaryColor;
    vuetifyTheme.themes.value.dark.colors.lightprimary = newLightPrimaryColorForDark;
  }
);

// Function to set primary and dark primary colors
const setPrimaryColors = (primaryColor, darkPrimaryColor, lightPrimaryColor, lightPrimaryColorForDark) => {
  customPrimaryColor.value = primaryColor;
  customDarkPrimaryColor.value = darkPrimaryColor;

  customLightPrimaryColor.value = lightPrimaryColor;
  customLightPrimaryColorForDark.value = lightPrimaryColorForDark;
};

// Ref for the selected color index
const selectedColorIndex = ref(0);

// Set the default primary and dark primary colors
setPrimaryColors(
  themeColors.value[selectedColorIndex.value].color,
  themeColors.value[selectedColorIndex.value].darkColor,
  themeColors.value[selectedColorIndex.value].lightcolor,
  themeColors.value[selectedColorIndex.value].lightcolorfordark
);

// Function to select a color and update the primary and dark primary colors
const selectColor = (color, darkColor, lightcolor, lightcolorfordark, index) => {
  selectedColorIndex.value = index;
  setPrimaryColors(color, darkColor, lightcolor, lightcolorfordark);
};

// themes font Family options
const fontFamily = ref(['Inter', 'Roboto', 'Poppins', 'Public sans']);
// themes font Family options

// Helper function to check if dark mode is preferred
const isSystemDarkMode = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// for system mode
// Function to update the theme based on the user's preferred color scheme
const updateTheme = () => {
  const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (customizer.actTheme === Theme.System) customizer.SET_THEME(preferredColorScheme);
};

// Call updateTheme on component mounted
onMounted(() => {
  updateTheme();

  // Watch for changes in the user's preferred color scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
});

// Watch for changes in the customizer's theme setting
watch(
  () => customizer.actTheme,
  (newValue, oldValue) => {
    if (newValue === Theme.System && newValue !== oldValue) updateTheme();
  }
);

const multiple = ref([0, 1, 2, 3, 4, 5, 6]);

function clearoptions() {
  customizer.actTheme = 'light';
  customizer.setHorizontalLayout = false;
  customizer.inputBg = false;
  customizer.boxed = false;
  customizer.fontTheme = 'Public sans';
  customizer.isRtl = false;

  // Reset the selected color index to default (0)
  selectedColorIndex.value = 0;

  // Set the default primary and dark primary colors
  setPrimaryColors(
    themeColors.value[0].color,
    themeColors.value[0].darkColor,
    themeColors.value[0].lightcolor,
    themeColors.value[0].lightcolorfordark
  );
}

const imgStyle = shallowRef({
  height: '64px',
  width: '64px',
});
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
  <v-navigation-drawer app temporary elevation="24" location="end" border="0" v-model="customizer.Customizer_drawer" width="340">
    <v-row class="ma-0">
      <v-col cols="12" class="pa-0">
        <div class="pa-5 d-flex justify-space-between align-center bg-primary">
          <div class="text-h5 font-weight-medium">Theme Customization</div>
          <div>
            <v-btn variant="text" icon density="compact" @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">
              <CloseCircleOutlined />
            </v-btn>
          </div>
        </div>
        <v-divider />
      </v-col>
    </v-row>
    <perfect-scrollbar style="height: calc(100vh - 69px)">
      <div>
        <v-row class="ma-0">
          <v-col cols="12" class="pa-0">
            <v-expansion-panels v-model="multiple" class="customizer-accordion" multiple>
              <!------------------------------------->
              <!-- RTL layout -->
              <!------------------------------------->
              <v-expansion-panel elevation="0" class="border-0 mb-1">
                <v-expansion-panel-title class="pb-2">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <LayoutOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Theme Layout</h6>
                      <p class="text-caption mb-0">Choose your layout</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div>
                    <v-radio-group v-model="customizer.isRtl" class="custom-radio ma-n2" hide-details>
                      <v-radio :value="false" color="primary" class="ma-2 text-center" label="Default">
                        <img src="@/assets/images/customizer/default.svg" alt="ltr" :style="imgStyle" />
                      </v-radio>
                      <v-radio :value="rtlmode" color="primary" class="ma-2 text-center" label="RTL">
                        <img src="@/assets/images/customizer/rtl.svg" alt="rtl" :style="imgStyle" />
                      </v-radio>
                    </v-radio-group>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!------------------------------------->
              <!-- end RTL layout -->
              <!------------------------------------->

              <v-expansion-panel elevation="0" class="mb-1">
                <v-expansion-panel-title class="pb-2">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <BorderInnerOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Menu Orientation</h6>
                      <p class="text-caption mb-0">Choose Vertical or Horizontal Menu Orientation</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <!-- sidebar layout -->
                  <!------------------------------------->
                  <div>
                    <v-radio-group class="custom-radio ma-n2" v-model="customizer.setHorizontalLayout" hide-details>
                      <v-radio :value="false" color="primary" class="ma-2 text-center" label="Vertical">
                        <img src="@/assets/images/customizer/default.svg" alt="menu layout" :style="imgStyle" />
                      </v-radio>
                      <v-radio :value="true" color="primary" class="ma-2 text-center" label="Horizontal">
                        <img src="@/assets/images/customizer/container.svg" alt="menu layout" :style="imgStyle" />
                      </v-radio>
                    </v-radio-group>
                  </div>
                  <!------------------------------------->
                  <!-- end sidebar layout -->
                  <!------------------------------------->
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!------------------------------------->
              <!-- Theme mode -->
              <!------------------------------------->
              <v-expansion-panel elevation="0" class="mb-1">
                <v-expansion-panel-title class="pb-2">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <HighlightOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Theme mode</h6>
                      <p class="text-caption mb-0">Choose light & dark mode</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div>
                    <v-radio-group class="custom-radio ma-n2" v-model="customizer.actTheme" hide-details>
                      <v-radio :value="Theme.Light" color="primary" class="ma-2 text-center" label="Light">
                        <img src="@/assets/images/customizer/default.svg" alt="light layout" :style="imgStyle" />
                      </v-radio>
                      <v-radio :value="Theme.Dark" color="primary" class="ma-2 text-center" label="Dark">
                        <img src="@/assets/images/customizer/dark.svg" alt="dark layout" :style="imgStyle" />
                      </v-radio>
                      <v-radio :value="Theme.System" color="primary" class="ma-2 text-center" label="System">
                        <img :src="`@/assets/images/customizer/${isSystemDarkMode() ? 'dark' : 'default'}.svg`"
                             alt="dark layout" :style="imgStyle" />
                      </v-radio>
                    </v-radio-group>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!------------------------------------->
              <!-- end Theme mode -->
              <!------------------------------------->

              <!------------------------------------->
              <!-- Preset color -->
              <!------------------------------------->
              <v-expansion-panel elevation="0" class="mb-1">
                <v-expansion-panel-title class="pb-2">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <BgColorsOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Color Scheme</h6>
                      <p class="text-caption mb-0">Choose your primary theme color</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-card-item class="pa-0">
                    <v-card-text class="pa-1 colors-scheme">
                      <v-item-group mandatory class="d-flex flex-wrap ga-4">
                        <v-item
                          v-for="(theme, index) in themeColors"
                          :key="theme.color"
                          :value="{
                            primary: theme.color,
                            darkPrimary: theme.darkColor,
                            lightprimary: theme.lightcolor || theme.lightcolorfordark
                          }"
                        >
                          <div
                            class="d-flex flex-column bg-gray100 pa-2 rounded cursor-pointer"
                            :class="{
                              Selected: vuetifyTheme.current.value?.colors.primary === theme.color
                            }"
                            @click="selectColor(theme.color, theme.darkColor, theme.lightcolor, theme.lightcolorfordark, index)"
                          >
                            <v-img :src="Color" alt="book" height="40px" width="40px" cover :class="theme.bg" class="ma-auto rounded" />
                            <span class="text-caption mt-3">{{ theme.label }}</span>
                          </div>
                        </v-item>
                      </v-item-group>
                    </v-card-text>
                  </v-card-item>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!------------------------------------->
              <!-- end Preset color -->
              <!------------------------------------->

              <!------------------------------------->
              <!------------------------------------->
              <!-- Input Outlined With Filled -->
              <!------------------------------------->
              <v-expansion-panel elevation="0" class="mb-1">
                <v-expansion-panel-title class="pb-2">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <HighlightOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Input Background</h6>
                      <p class="text-caption mb-0">Choose option with background or without background for input</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-radio-group class="custom-radio input-radio ma-n2" v-model="customizer.inputBg" hide-details>
                    <v-radio :value="true" color="primary" class="ma-2 input-bg px-2" label="With Background"> </v-radio>
                    <v-radio :value="false" color="primary" class="ma-2 without-bg px-2" label="Without Background"> </v-radio>
                  </v-radio-group>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!------------------------------------->
              <!-- End Input Outlined With Filled -->
              <!------------------------------------->

              <!------------------------------------->
              <!-- Boxed Container -->
              <!------------------------------------->
              <v-expansion-panel elevation="0" class="mb-1">
                <v-expansion-panel-title class="pb-2">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <BorderInnerOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Layout Width</h6>
                      <p class="text-caption mb-0">Choose fluid or container layout</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-radio-group class="custom-radio ma-n2" v-model="customizer.boxed" hide-details>
                    <v-radio :value="false" color="primary" class="ma-2 text-center" label="Fluid">
                      <img src="@/assets/images/customizer/default.svg" alt="layout" :style="imgStyle" />
                    </v-radio>
                    <v-radio :value="true" color="primary" class="ma-2 text-center" label="Container">
                      <img src="@/assets/images/customizer/container.svg" alt="layout" :style="imgStyle" />
                    </v-radio>
                  </v-radio-group>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!------------------------------------->
              <!-- End Box Container -->
              <!------------------------------------->

              <!------------------------------------->
              <!-- Font Family -->
              <!------------------------------------->
              <v-expansion-panel elevation="0" class="mb-1">
                <v-expansion-panel-title class="pb-1">
                  <div class="d-flex align-center">
                    <v-avatar variant="tonal" color="primary" rounded>
                      <FontColorsOutlined :style="{fontSize: '16px'}" />
                    </v-avatar>
                    <div class="ms-3">
                      <h6 class="text-subtitle-1 mb-0">Font Family</h6>
                      <p class="text-caption mb-0">Choose your font family.</p>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-radio-group v-model="customizer.fontTheme" hide-details class="custom-font">
                    <v-radio v-for="font in fontFamily" :key="font" :value="font" color="primary" class="mb-2 text-center">
                      <template #label>
                        <h5 :class="`${font} text-h5 mb-0`">Aa</h5>
                        <span class="text-caption text-lightText">{{ font }}</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!------------------------------------->
              <!-- end Font Family -->
              <!------------------------------------->
              <!------------------------------------->
            </v-expansion-panels>
            <v-divider></v-divider>
            <div class="d-flex pa-4">
              <v-btn color="error" variant="tonal" block @click="clearoptions"> Reset </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
<style lang="scss">
@use '@/styles/_variables.scss' as *;
.customizer-accordion {
  .v-expansion-panel-title {
    padding: 16px;
  }
  .v-expansion-panel {
    border-width: 0;
    border-top: 1px solid rgb(var(--v-theme-borderLight));
    border-radius: 0;
    &.v-expansion-panel--active {
      .v-expansion-panel-title--active {
        .v-expansion-panel-title__overlay {
          background: transparent;
        }
      }
    }
    .v-expansion-panel-text__wrapper {
      padding: 16px;
      border-top: none;
    }
  }
  .v-expansion-panel-title {
    &:hover {
      > .v-expansion-panel-title__overlay {
        opacity: 0;
      }
    }
  }
}
.custom-radio {
  .v-selection-control-group {
    flex-direction: row;
    .v-selection-control {
      width: 80px;
      height: 108px;
      align-items: center;
      justify-content: center;
      flex: unset;
      display: block;
      background: rgb(var(--v-theme-gray100));
      border-radius: 4px;
      box-shadow: $box-shadow;
      .v-label {
        justify-content: center;
        font-size: 0.75rem;
        line-height: 1.66;
        padding-top: 70px;
        --v-medium-emphasis-opacity: 1;
      }
      &.v-selection-control--dirty {
        box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
        background-color: rgba(var(--v-theme-primary), 0.1);
      }
      .v-selection-control__wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        .v-selection-control__input {
          opacity: 0;
          width: 100%;
          height: 100%;
        }
        img {
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: -1;
          [dir='rtl'] & {
            left: unset;
            right: 8px;
          }
        }
      }
    }
  }
}
.colors-scheme {
  .bg-gray100 {
    box-shadow: $box-shadow;
    &.Selected {
      box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
      background-color: rgba(var(--v-theme-primary), 0.1) !important;
    }
  }
}
.input-bg {
  background-color: rgb(var(--v-theme-gray100)) !important;
}
.without-bg {
  background-color: rgb(var(--v-theme-surface)) !important;
}
.input-radio {
  .v-selection-control-group {
    .v-selection-control {
      height: 30px;
      width: 100%;
      .v-label {
        padding-top: 0;
      }
    }
  }
}
.custom-font {
  .v-selection-control-group {
    flex-direction: row;
    flex-wrap: wrap;
    .v-selection-control__wrapper {
      display: none;
    }
    .v-selection-control {
      .v-label {
        display: block;
        text-align: center;
        --v-medium-emphasis-opacity: 1;
        border: 6px solid rgb(var(--v-theme-gray100));
        border-radius: 4px;
        margin: 6px;
        padding: 8px;
        min-width: 80px;
        height: unset;
      }
      &.v-selection-control--dirty {
        .v-label {
          border: 6px solid rgba(var(--v-theme-primary), 0.1);
          box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
        }
      }
    }
  }
  .v-selection-control {
    justify-content: center;
  }
}
</style>
