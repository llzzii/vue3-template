<template>
  <a-row class="container">
    <a-col :span="6" class="mb10"><Echart :option="options" :is-loading="loading" /></a-col>
    <a-col :span="24"></a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { Echart } from '@/components';
  import { EChartsOption } from 'echarts';
  import { ref } from 'vue';
  const loading = ref(true);
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },

    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: [
          { value: 500, name: '电子产品' },
          { value: 310, name: '服装' },
          { value: 274, name: '化妆品' },
          { value: 400, name: '家居' },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 400;
        },
      },
    ],
  };
  setTimeout(() => {
    loading.value = false;
  }, 2000);
</script>
<style lang="less">
  .container {
    background-color: #fff;
    margin: 10px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
</style>
