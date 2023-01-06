<template>
  <a-dropdown v-model:visible="visible" v-if="actions && actions.length > 0">
    <a class="ant-dropdown-link" @click.prevent>
      <slot name="moreTitle">更多</slot>
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item v-for="(item,index) in actions" :disabled="item.disabled&&item.disabled(row)"  :key="index">
            <slot :name="item.slotName"> {{ item.title }}</slot>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
  import { DownOutlined } from '@ant-design/icons-vue';
  import type { MenuProps } from 'ant-design-vue';
  import { ref } from 'vue';

  export interface MenuPropsObj {
    title?: string;
    onClick?: Function;
    disabled?: Function;
    slotName?: string;
  }
  const props = withDefaults(
    defineProps<{
      actions: Array<MenuPropsObj> | null;
        row:any
    }>(),
    {
      actions: null,
      row:{}
    },
  );

  const visible = ref(false);
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    if(props.actions&&props.actions[e.key]&&props.actions[e.key].onClick){
        props.actions[e.key].onClick(props.row)
    }
  };
</script>
