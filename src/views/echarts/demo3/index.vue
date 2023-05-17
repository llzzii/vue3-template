<template>
  <div class="app-container">
    <div class="charts">
      <div v-for="item in domList" :id="item" :key="item" class="chart" />
    </div>
  </div>
</template>

<!-- <script>
  import echarts from '@/utils/echarts';

  const chartNum = 1000; // 图表数量
  const MAX_CURRENT = 50; // 图表最大渲染并发数
  const chartIntervalTime = 2000; // 图表定时渲染毫秒数

  let executing = [];
  /**
   * @params {Number} poolLimit -最大并发限制数
   * @params {Array} array -所有的并发请求|渲染数组
   * @params {Function} iteratorFn -对应执行的并发函数(接受 array 的每一项值)
   */
  async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = []; // 所有执行中的 promises
    executing = []; // 正在执行中的 promises
    for (const item of array) {
      const p = Promise.resolve().then(() => iteratorFn(item));
      ret.push(p);
      if (array.length >= poolLimit) {
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= poolLimit) await Promise.race(executing);
      }
    }
    return Promise.all(ret);
  }

  export default {
    data() {
      return {
        domList: [],
        chartObjs: {},
        chartData: [150, 230, 224, 218, 135, 147, 260],
      };
    },
    mounted() {
      // 创建echart并绘图
      this.createChart();
      // 隔3秒更新图表数据并渲染
      //   this.intervalChartData(chartIntervalTime);
    },
    methods: {
      // 创建echart并绘图
      async createChart() {
        for (let i = 1; i <= chartNum; i++) {
          this.domList.push('chart' + i);
        }
        this.$nextTick(this.renderChartList);
      },
      async renderChartList() {
        const res = await asyncPool(MAX_CURRENT, this.domList, (i, arr) => {
          return new Promise(async (resolve) => {
            const res = await this.initChart(i);
            resolve(res);
          }).then((data) => {
            console.log(data);
            return data;
          });
        });
      },
      // 隔3秒更新图表数据并渲染
      intervalChartData(s) {
        setInterval(() => {
          if (executing.length > 0) return; // 还有正在执行的渲染 不重复添加
          this.renderChartList();
        }, s);
      },
      // 初始化图表
      initChart(domId) {
        return new Promise((resolve) => {
          if (!this.chartObjs[domId]) {
            this.chartObjs[domId] = echarts.init(document.getElementById(domId));
          }
          const option = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: this.chartData,
                type: 'line',
              },
            ],
          };
          this.chartObjs[domId].clear();
          this.chartObjs[domId].setOption(option);
          this.chartObjs[domId].on('finished', () => {
            resolve(domId);
          });
        });
      },
    },
  };
</script> -->

<script setup lang="ts">
  function createRequestPool(limit: number) {
    const queue: any[] = [];
    const runningQueue: Set<any> = new Set();
    function run() {
      if (runningQueue.size >= limit) return;
      const wantage = limit - runningQueue.size;
      queue.splice(0, wantage).forEach((func) => {
        runningQueue.add(func);
        func().then(() => {
          runningQueue.delete(func);
          run();
        });
      });
    }
    return (request: any) => {
      return new Promise((res) => {
        queue.push(() =>
          request().then((result) => {
            res(result);
            return result;
          }),
        );
        run();
      });
    };
  }
  const limitRequest = createRequestPool(3);
  let c = 0;
  let domList: any = [];
  const req = () => {
    return new Promise(async (resolve) => {
      c++;
      domList.push(c);
      let res = c;
      resolve(res);
    }).then((data) => {
      console.log(data);
      return data;
    });
  };
  limitRequest(req);
  limitRequest(req);
  limitRequest(req);
  limitRequest(req);
  limitRequest(req);
  limitRequest(req);
</script>

<style scoped>
  .chart {
    float: left;
    width: 360px;
    height: 300px;
    margin: 10px;
    border: 2px solid #ff9900;
  }
</style>
