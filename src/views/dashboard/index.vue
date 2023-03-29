<template>
  <div class="banner" :style="{'background':bgcolor}">
    <img :src="bannerSrc" />
  </div>
  <div class="header">
    <a-row :gutter="10">
      <a-col :span="6">
        <a-card size="small">
          <template #title>访问人数 </template>
          <template #extra>
            <a-tag color="success" class="right-tag">日</a-tag>
          </template>
          <div class="card-content">
            <CountTo class="count-span" :start-value="1" :end-value="titleData?.data2" />
          </div>
          <template #actions>
            <p class="footer-actions">
              <span>总访问人数</span>
              <span>
                <CountTo :start-value="1" :end-value="titleData?.data2" />
              </span>
            </p>
          </template>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card size="small">
          <template #title>付款 </template>
          <template #extra>
            <a-tag color="success" class="right-tag">年</a-tag>
          </template>
          <div class="card-content">
            <CountTo
              class="count-span"
              :start-value="1"
              :prefix="'$'"
              :end-value="titleData?.data3"
            />
            <a-progress
              :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
              }"
              :strokeWidth="20"
              :percent="percent"
            />
          </div>

          <template #actions>
            <p class="footer-actions">
              <span>总价</span>
              <span>
                <CountTo :start-value="1" :end-value="titleData?.data4" />
              </span>
            </p>
          </template>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card size="small">
          <template #title>访问人数 </template>
          <template #extra>
            <a-tag color="success" class="right-tag">日</a-tag>
          </template>
          <div class="card-content">
            <CountTo class="count-span" :start-value="1" :end-value="titleData?.data2" />
          </div>
          <template #actions>
            <p class="footer-actions">
              <span>总访问人数</span>
              <span>
                <CountTo :start-value="1" :end-value="titleData?.data2" />
              </span>
            </p>
          </template>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card size="small">
          <template #title>访问人数 </template>
          <template #extra>
            <a-tag color="success" class="right-tag">日</a-tag>
          </template>
          <div class="card-content">
            <CountTo class="count-span" :start-value="1" :end-value="titleData?.data2" />
          </div>
          <template #actions>
            <p class="footer-actions">
              <span>总访问人数</span>
              <span>
                <CountTo :start-value="1" :end-value="titleData?.data2" />
              </span>
            </p>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <div>
    <a-upload v-model:file-list="fileList" :before-upload="beforeUpload">
      <a-button>
        <upload-outlined></upload-outlined>
        Upload
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '@/components';
  import { UseHandleImg } from '@/hooks/useHandleImg';
  import { UploadProps } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  const titleData = reactive({
    data1: 185362,
    data2: 1895362,
    data3: 295362,
    data4: 2895362,
    data5: 35362,
    data6: 395362,
    data7: 495362,
    data8: 4895362,
  });
  const percent = ref(0);
  const fileList = ref([]);
  const timer = setInterval(() => {
    if (percent.value < (100 * titleData.data3) / titleData.data4) {
      percent.value++;
    } else {
      clearInterval(timer);
    }
  }, 100);
  let bannerSrc = ref('');
  let bgcolor = ref('#fff');
  const { getImgThemeColor } = UseHandleImg();
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    return new Promise(async (resolve: any) => {
      const reader = new FileReader();
      await reader.readAsDataURL(file);

      reader.onload = async () => {
        bannerSrc.value = reader.result as string;

        const color =await getImgThemeColor(reader.result as string);
        bgcolor.value=color?`rgb(${color[0]},${color[1]},${color[2]})`:''
        console.log('🚀 ~ file: index.vue:135 ~ returnnewPromise ~ file:', color);
      };
    });
  };
</script>
<style lang="less" scoped>
  .header {
    margin: 10px;
  }

  .right-tag {
  }
  .count-span {
    font-size: 36px;
  }
  .card-content {
    height: 100px;
  }
  .footer-actions {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0 10px;
    color: #000000d9;
  }
  .banner {
    text-align: center;
    img {
      width: 800px;
    }
  }
</style>
