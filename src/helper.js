import {ref, onMounted, onUnmounted} from 'vue';
import colors from 'vuetify/lib/util/colors';

const baseColors = ['red','pink','purple','deep-purple','indigo','blue','light-blue','cyan','teal','green','light-green','lime','yellow','amber','orange','deep-orange','brown','blue-grey','grey'];
const shades = ['black', 'white', 'transparent'];
export const hexColor = (name) => {
  const match = [...baseColors,...shades].find(c => name.startsWith(c)) || null;
  const remainder = match 
    ? name.slice(match.length) 
    : null;
  const base = match.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
  const variety = remainder 
    ? remainder.replaceAll('-','')
    : 'base';
  const nameStructured = shades.find(shade => match === shade) 
    ? { base:'shades', variety:base}
    : { base:base, variety:variety};
  return colors[nameStructured.base][nameStructured.variety];
};

export const useInterval = (fn, delay = 1000) => {
  const handle = ref(null);
  
  const start = () => {
    handle.value = setInterval(fn, delay);
  }

  const stop = () => {
    clearInterval(handle.value);
    handle.value = null;
  }

  onMounted(start);
  onUnmounted(stop);

  return {start, stop};
};
