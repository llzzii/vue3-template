<template>
  <span>
    <b class="status-null" v-if="calcStatus==null"></b>
    <check-circle-filled v-else-if="calcStatus"  class="status-true" />
    <close-circle-filled v-else-if="!calcStatus" class="status-false" />
  </span>
</template>

<script lang="ts" setup>
  import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';
  const props = withDefaults(
    defineProps<{
      status?: boolean | null|string|number;
    }>(),
    {
      status: null,
    },
  );
  const calcStatus=computed(()=>{
    if(props.status==null||typeof props.status=="boolean"){
        return props.status
    }else{
        return !!props.status
    }
   
  })
</script>
<style lang="less" scoped>
  .status-null {
    display: inline-block;
    background: #999;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: relative;
    top: 2px;
  }
  .status-true {
    color: rgb(20, 192, 49);
  }
  .status-false {
    color: rgb(224, 3, 3);
  }
</style>
