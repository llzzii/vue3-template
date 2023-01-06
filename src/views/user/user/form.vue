<template>
  <a-button v-if="!isEdit" type="primary" @click="add">新增</a-button>
  <a-button type="link" class="table-link-btn" :disabled="rowData?.id==1" v-else  @click="update">编辑</a-button>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    placement="right"
    width="700"
    @after-visible-change="afterVisibleChange"
  >
    <template #title> {{!isEdit?'新增':"编辑"}}用户 </template>
    <template #extra>
      <a-space>
        <a-button type="primary" @click="submit">确定</a-button>
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      </a-space>
    </template>
    <a-form :label-col="{ span: 6 }" ref="formRef" :model="formState" :wrapper-col="{ span: 17 }">
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item label="用户名" v-bind="validateInfos.username">
            <a-input v-model:value="formState.username" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="昵称" v-bind="validateInfos.realname">
            <a-input v-model:value="formState.realname" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item label="手机号" v-bind="validateInfos.mobile">
            <a-input v-model:value="formState.mobile" :maxlength="11" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="E-mail" v-bind="validateInfos.email">
            <a-input v-model:value="formState.email" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12" v-if="!isEdit">
          <a-form-item label="密码" v-bind="validateInfos.p6d">
            <a-input type="password" v-model:value="formState.p6d" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="性别" v-bind="validateInfos.sex">
            <a-select v-model:value="formState.sex">
              <a-select-option :value="1">男</a-select-option>
              <a-select-option :value="0">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="24">
          <a-form-item label="备注" :labelCol="{ span: 3 }" v-bind="validateInfos.remark">
            <a-textarea
              v-model:value="formState.remark"
              :showCount="true"
              :autosize="{ minRows: 4, maxRows: 6 }"
            ></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>
<script lang="ts" setup>
  import { Form, FormInstance } from 'ant-design-vue';
  import { User, userRules } from './user.instance';
  import { UserService } from '../user.service';
import _ from 'lodash';

  const emits = defineEmits(['refresh']);
  const props = withDefaults(
    defineProps<{
      rowData?:any;
    }>(),
    {
      rowData: null,
    },
  );
  const isEdit=computed(()=>props.rowData!=null)
  const visible = ref(false);
  const formRef = ref<FormInstance>();
  const formState = reactive<User>({
    username: '',
    realname: '',
    sex: 1,
    mobile: '',
    email: '',
    remark: '',
    status: 1,
    p6d: '123456',
  });
  const { resetFields, validate, validateInfos } = Form.useForm(formState, userRules, {
    onValidate: (...args) => console.log(...args),
  });
  const add = () => {
    resetFields();
    visible.value = true;
  };
  const { run:runCreate  } = UserService.addUser();
  const { run:runUpdate } = UserService.updateUser();
  const submit = async () => {
    await validate()
      .then(async () => {
        console.log(toRaw(formState));
        const res = !isEdit?await runCreate(formState):await runUpdate(formState);
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
  const update=()=>{
    resetFields();
    _.assign(formState, props.rowData);
    visible.value = true;
  }
  const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
  };
  const onClose = () => {
    visible.value = false;
  };
</script>
