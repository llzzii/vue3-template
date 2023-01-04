<template>
  <div v-loading="true" style="min-height:200px"></div>
</template>
<script lang="ts" setup>
  import { unref } from 'vue';
  import { useRouter } from 'vue-router';
  const isMounted=ref(false)
  const init = () => {
    const { currentRoute, replace } = useRouter();
    console.log("🚀 ~ file: index.vue:10 ~ init ~ currentRoute", currentRoute)

    const { params, query } = unref(currentRoute);
    const { path, _redirect_type = 'path' } = params;
    // Reflect 是一个内置的对象,有has,get,set,deleteProperty,defineProperty等静态方法
    Reflect.deleteProperty(params, '_redirect_type');
    Reflect.deleteProperty(params, 'path');

    const _path = Array.isArray(path) ? path.join('/') : path;
    console.log("🚀 ~ file: index.vue:18 ~ init ~ _path", _path)

    if (_redirect_type === 'name') {
      replace({
        name: _path,
        query,
        params,
      });
    } else {
      replace({
        path: _path.startsWith('/') ? _path : '/' + _path,
        query,
      });
    }
  };
  onMounted(() => {  
    init();
    nextTick(() => {
      isMounted.value=true;
    })
  });
  onActivated(() => {
    if(isMounted.value){
      init();
    }
  });
</script>
