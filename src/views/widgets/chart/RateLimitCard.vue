<script setup>
import {computed} from 'vue';
import {use} from 'echarts/core';
import {SVGRenderer} from 'echarts/renderers';
import {BarChart} from 'echarts/charts'
import {GridComponent, TooltipComponent} from 'echarts/components';
import VChart from 'vue-echarts';
import {flow, identity, map, size, times} from 'lodash/fp';
import {hexColor} from '@/helper';

const generateCategoryLabel = (unit, width) => {
  if (!unit || !width) return identity;
  return index => {
    if (index === 0) return 'Now';
    const value = index * width;
    return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
  };
};
const generateCategories = (unit, width) => flow(times(identity), map(generateCategoryLabel(unit, width)));

const props = defineProps({
  rateLimit: {type: Object, required: true},
  color: {type: String, default: 'blue'},
  height: {type: String, default: '130px'},
});

use([SVGRenderer, GridComponent, TooltipComponent, BarChart]);

const humanizeDuration = computed(() => {
  const {size, unit} = props.rateLimit;
  if (!size || !unit) return '';
  return `${size > 1 ? size : ''} ${unit}${size === 1 ? '' : 's'}`;
});

const chartOptions = computed(() => ({
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b0}: <b>{c0}</b>',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: generateCategories(props.rateLimit.bucket?.unit, props.rateLimit.bucket?.width)(size(props.rateLimit.data)),
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: 'Logins',
      data: props.rateLimit.data,
      type: 'bar',
      barCategoryGap: '3px',
      showBackground: true,
      color: hexColor(props.color),
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
  animationDuration: 200,
}));

const chipColor = computed(() => {
  const percentage = props.rateLimit.percentage;
  if (percentage > 0.8) {
    return 'error';
  } else if (percentage >= 0.5) {
    return 'warning';
  }
  return 'success';
});
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface">
    <v-card-text class="">
      <div class="d-flex align-start justify-space-between">
        <div>
          <h6 class="text-h6 text-lightText">
            {{ rateLimit.title }}
          </h6>
        </div>
        <div>
          <h5 class="text-h5 mb-0 text-end">
            {{ rateLimit.salt }}
          </h5>
          <h4 class="text-h4 mb-0 d-flex align-center flex-wrap gap-1 justify-end">
            {{ rateLimit.value }}
            <span class="text-subtitle-2 ms-2 rl-unit">
              /{{ humanizeDuration }}
            </span>
            <v-chip :color="chipColor" :border="`${chipColor} solid thin opacity-50`" class="ms-2" size="small" label>
              {{ rateLimit.percentage * 100 }}%
            </v-chip>
          </h4>
        </div>
      </div>
    </v-card-text>
    <v-chart class="chart" :option="chartOptions" :style="{width: '100%', height}" autoresize />
  </v-card>
</template>

<style lang="scss" scoped>
.rl-unit {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-lightText));
  display: inline-block;
  position: relative;
  top: 2.5px;
}
.chart {
  padding: 18px;
  padding-top: 0;
}
</style>
