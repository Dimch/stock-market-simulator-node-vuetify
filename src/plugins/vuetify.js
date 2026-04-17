import {createVuetify} from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'

export const PrimaryColor = '#1677ff';
export const PrimaryDarkColor = '#0958d9';
export const PrimaryLightColor = '#e6f4ff';
export const PrimaryLightColorForDark = '#111a2c';

const light = {
  dark: false,
  variables: {
    'border-color': '#f0f0f0',
    'carousel-control-size': 10,
    'gradient':
      'linear-gradient(250.38deg, rgba(var(--v-theme-primary), var(--v-shadow-opacity)) 2.39%, rgba(var(--v-theme-primary), var(--v-half-opacity)) 34.42%, rgb(var(--v-theme-primary)) 60.95%, rgba(var(--v-theme-darkprimary), var(--v-medium-opacity)) 84.83%, rgb(var(--v-theme-darkprimary)) 104.37%)',
    'gradientRtl':
      'linear-gradient(250.38deg, rgb(var(--v-theme-darkprimary)) 2.39%, rgba(var(--v-theme-darkprimary), var(--v-medium-opacity)) 34.42%, rgb(var(--v-theme-primary)) 60.95%, rgba(var(--v-theme-primary), var(--v-half-opacity)) 84.83%, rgba(var(--v-theme-primary), var(--v-shadow-opacity)) 104.37%)',
    'gradient2': 'linear-gradient(to right, rgb(var(--v-theme-darkprimary)), rgb(var(--v-theme-primary)))',
    'card-shadow': '0px 1px 4px rgba(0, 0, 0, 0.08)',
    'gradient-opacity': 0.2,
    'medium-opacity': 0.85,
    'chart-opacity': 0.6,
    'half-opacity': 0.5,
    'high-opacity': 1,
    'shadow-opacity': 0.08
  },
  colors: {
    'primary': PrimaryColor,
    'secondary': '#8c8c8c',
    'info': '#13c2c2',
    'success': '#52c41a',
    'accent': '#FFAB91',
    'warning': '#faad14',
    'error': '#ff4d4f',
    'lightprimary': PrimaryLightColor,
    'lightsecondary': '#f5f5f5',
    'lightsuccess': '#EAFCD4',
    'lighterror': '#FFE7D3',
    'lightwarning': '#FFF6D0',
    'darkText': '#212121',
    'lightText': '#8c8c8c',
    'darkprimary': PrimaryDarkColor,
    'darksecondary': '#7a7878',
    'borderLight': '#e6ebf1',
    'inputBorder': '#a1a1a5',
    'containerBg': '#fafafb',
    'surface': '#fff',
    'on-surface-variant': '#fff',
    'surface-light': '#fff',
    'facebook': '#4267b2',
    'twitter': '#1da1f2',
    'linkedin': '#0e76a8',
    'gray100': '#f5f5f5',
    'primary200': '#a1d2ff',
    'secondary200': '#eeeeee'
  }
};

const dark = {
  dark: true,
  variables: {
    'border-color': '#595959',
    'gradient':
      'linear-gradient(250.38deg, rgba(var(--v-theme-primary), var(--v-shadow-opacity)) 2.39%, rgba(var(--v-theme-primary), var(--v-half-opacity)) 34.42%, rgb(var(--v-theme-darkprimary)) 60.95%, rgba(var(--v-theme-darkprimary), var(--v-medium-opacity)) 84.83%, rgb(var(--v-theme-darkprimary)) 104.37%)',
    'gradientRtl':
      'linear-gradient(250.38deg, rgb(var(--v-theme-darkprimary)) 2.39%, rgba(var(--v-theme-darkprimary), var(--v-medium-opacity)) 34.42%, rgb(var(--v-theme-darkprimary)) 60.95%, rgba(var(--v-theme-primary), var(--v-half-opacity)) 84.83%, rgba(var(--v-theme-primary), var(--v-shadow-opacity)) 104.37%)',
    'card-shadow': '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.20)'
  },
  colors: {
    'primary': PrimaryColor,
    'secondary': '#d9d9d9',
    'info': '#13a8a8',
    'success': '#49aa19',
    'accent': '#fc4b6c',
    'warning': '#d89614',
    'error': '#a61d24',
    'lightprimary': PrimaryLightColorForDark,
    'lightsecondary': '#343131',
    'lightsuccess': '#162312',
    'lighterror': '#2a1215',
    'lightwarning': '#2b2111',
    'darkprimary': PrimaryDarkColor,
    'darksecondary': '#8c8c8c',
    'darkText': '#e0e0e0',
    'lightText': '#7d7d7d',
    'borderLight': '#292929',
    'inputBorder': '#595959',
    'containerBg': '#121212',
    'surface': '#1e1e1e',
    'background': '#1e1e1e',
    'on-surface-variant': '#1e1e1e',
    'surface-light': '#1e1e1e',
    'facebook': '#4267b2',
    'twitter': '#1da1f2',
    'linkedin': '#0e76a8',
    'gray100': '#141414',
    'primary200': '#8dc5f8',
    'secondary200': '#bdbdbd'
  }
};

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'system',
    themes: {
      light,
      dark
    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'lg'
    },
    VTooltip: {
      location: 'top'
    }
  }
});
