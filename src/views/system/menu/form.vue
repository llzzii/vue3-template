<template>
  <a-button v-if="!isEdit" type="primary" @click="add">新增</a-button>
  <a-button type="link" class="table-link-btn" :disabled="rowData?.id == 1" v-else @click="update"
    >编辑</a-button
  >
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    placement="right"
    width="700"
    @after-visible-change="afterVisibleChange"
  >
    <template #title> {{ !isEdit ? '新增' : '编辑' }}菜单 </template>
    <template #extra>
      <a-space>
        <a-button type="primary" @click="submit">确定</a-button>
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      </a-space>
    </template>
    <a-form :label-col="{ span: 6 }" ref="formRef" :model="formState" :wrapper-col="{ span: 17 }">
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item label="父菜单" v-bind="validateInfos.parentId">
            <a-input v-model:value="formState.parentId" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="菜单名称" v-bind="validateInfos.name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item label="类型" v-bind="validateInfos.type">
            <a-select v-model:value="formState.type">
              <a-select-option :value="1">菜单</a-select-option>
              <a-select-option :value="0">目录</a-select-option>
              <a-select-option :value="2">操作</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="路由地址" v-bind="validateInfos.path">
            <a-input v-model:value="formState.path" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item label="菜单图标" v-bind="validateInfos.icon">
            <a-input v-model:value="formState.icon" />
          </a-form-item>
        </a-col>

        <a-col span="12">
          <a-form-item label="组件路径" v-bind="validateInfos.component">
            <a-input v-model:value="formState.component" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item label="是否缓存" v-bind="validateInfos.keepAlive">
            <a-switch v-model:checked="formState.keepAlive" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="是否可见" v-bind="validateInfos.visible">
            <a-switch v-model:checked="formState.visible" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>
<script lang="ts" setup>
  import { Form, FormInstance } from 'ant-design-vue';
  import _ from 'lodash';
import { Menu, menuRules } from './menu.interface';
import { MenuService } from './menu.service';

  const emits = defineEmits(['refresh']);
  const props = withDefaults(
    defineProps<{
      rowData?: any;
    }>(),
    {
      rowData: null,
    },
  );
  const isEdit = computed(() => props.rowData != null);
  const visible = ref(false);
  const formRef = ref<FormInstance>();
  const formState = reactive<Menu>({
  parentId: 0,
  name: '',
  icon: '',
  type: '1',
  sort: 1,
  status: 1,
  visible: true,
  keepAlive: true,
  });
  const { resetFields, validate, validateInfos } = Form.useForm(formState, menuRules, {
    onValidate: (...args) => console.log(...args),
  });
  const add = () => {
    resetFields();
    visible.value = true;
  };
  const { run: runCreate } = MenuService.addMenu();
  const { run: runUpdate } = MenuService.updateMenu();
  const submit = async () => {
    await validate()
      .then(async () => {
        console.log(toRaw(formState));
        const res = !isEdit ? await runCreate(formState) : await runUpdate(formState);
        console.log('🚀 ~ file: form.vue:100 ~ .then ~ res', res);
        if (res?.code === '0000') {
          emits('refresh');
          visible.value = false;
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  const update = () => {
    resetFields();
    _.assign(formState, props.rowData);
    visible.value = true;
  };
  const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
  };
  const onClose = () => {
    visible.value = false;
  };
</script>
