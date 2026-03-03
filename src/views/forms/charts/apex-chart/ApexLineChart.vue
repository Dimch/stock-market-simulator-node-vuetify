<script setup>
import {computed} from 'vue';

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'line',
      height: 350,
      fontFamily: `inherit`,
      foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))'
    },
    colors: ['rgba(var(--v-theme-darkprimary), var(--v-medium-opacity))'],

    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      axisBorder: {
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
      },
      axisTicks: {
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
    },
    tooltip: {
      y: {
        formatter(val) {
          return '$ ' + val + ' thousands';
        }
      }
    }
  };
});
const lineChart = {
  series: [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ]
};
</script>

<template>
  <!-- ---------------------------------------------------- -->
  <!-- Line Chart -->
  <!-- ---------------------------------------------------- -->

  <apexchart type="line" height="350" :options="chartOptions" :series="lineChart.series"> </apexchart>
</template>
