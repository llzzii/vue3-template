<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { ConfigProvider } from 'ant-design-vue';
  
  //@ts-ignore
  window.$router=useRouter()
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <router-view />
  </ConfigProvider>
</template>
