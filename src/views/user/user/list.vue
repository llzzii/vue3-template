<template>
  <DefaultTableWapper
    ref="defaultTableWapper"
    :columns="columns"
    :toolbar="toolbar"
    :showPagination="true"
    :tableData="tableData"
    :pagination="pagination"
    @onTableChange="onTableChange"
  >
    <template #toolbar_buttons>
      <form-btn @refresh="refresh"></form-btn>
    </template>
    <template #beginTimeTitle="{ column }">
      {{ column.title }}
      <span class="custom-sort" :class="{ 'is-order': column.order }">
        <i
          class="iconfont"
          :class="[column.order ? `icon-wind-${column.order}ending ` : 'icon-sort-line']"
        ></i>
      </span>
    </template>
    <template #status="{ row }"> <StatusLabel :status="row.status"></StatusLabel> </template>
    <template #action="{ row }">
      <a-space>
        <a-button type="link" class="table-link-btn" :disabled="row.id==1"  @click="changeStatus(row)">{{ row.status ? '禁用' : '启用' }}</a-button>
      <form-btn @refresh="refresh" :rowData="row"></form-btn>
        <more-actions :actions="actions" :row="row">
          <template #delete>
            <a-button type="link" class="table-link-btn" :disabled="row.id==1" @click="deleteRow(row)">删除</a-button>
          </template>
          
        </more-actions>
       
      </a-space>
    </template>
  </DefaultTableWapper>
</template>
<script lang="ts" setup>
  import { DefaultTableWapper, StatusLabel,MoreActions } from '@/components';
  import _ from 'lodash';
  import formBtn from './form.vue';
  import { UserService } from '../user.service';
  import { UserListQuery, columns } from './user.instance';
  import { onMountedOrActivated } from '@/hooks/onMountedOrActivated';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { MenuPropsObj } from '@/components/MoreActions/index.vue';

  const userReq = new UserListQuery();
  const defaultTableWapper = ref({});
  const { run, data: tableData, pagination, refresh } = UserService.getUserlist();

  const {run:deleteRun}=UserService.deleteUser()
  const {run:runChangeStatus}=UserService.changeUserStatus()
  const {run:runResetPassword}=UserService.resetUserPassword()

  const search = async () => {
    await run({ ...userReq });
  };

  const toolbar = {
    custom: {
      icon: 'iconfont icon-zidingyilie',
    },
  };
  const changeStatus =async (row) => {
    await runChangeStatus(row.id,{status: row.status==0?1:0})
    await refresh()

  };
  const deleteRow = (row) => {
    Modal.confirm({
        title: '确定删除此用户么?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, '删除后不可追回，请谨慎操作！'),
        onOk:async()=> {
          await deleteRun(row.id);
          await refresh()
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
  };
  const resetPassword=(row)=>{
    Modal.confirm({
        title: '确定重置此用户密码么?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, '重置后不可撤销，请谨慎操作！'),
        onOk:async()=> {
          await runResetPassword(row.id);
          await refresh()
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
  }
  const actions=reactive<Array<MenuPropsObj>>([
  {
    title:"重置密码",
    onClick:resetPassword,
    disabled:(e)=>{return e.id==1}
  },{
    disabled:(e)=>{return e.id==1},
    slotName:"delete"
  }
])
  onMountedOrActivated(async () => {
    await search();
  });
</script>
<style scoped>
  .custom-sort {
    padding: 0 4px;
  }
  .custom-sort.is-order {
    color: #409eff;
  }
</style>
