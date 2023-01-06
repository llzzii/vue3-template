import { PaginationReq } from '@/constrant/baseInterface';
import { VxeColumnProps } from 'vxe-table';

export interface User {
  username: string;
  realname: string;
  sex: number;
  mobile: string;
  email: string;
  remark: string;
  status: number;
  p6d: string;
}
export const userRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change',
    },
    {
      pattern: /^[A-Za-z][A-Za-z0-9]{5,16}$/,
      message: '用户名由6-16个字符组成',
      trigger: 'change',
    },
  ],
  realname: [{ required: true, message: '请输入正确昵称', max: 20 }],
  p6d: [{ required: true, message: '请输入密码', max: 16, min: 4 }],
  email: [{ type: 'email', message: '请输入正确格式的邮箱' }],
  mobile: [{ type: 'number', message: '请输入正确格式的手机号', max: 11 }],
};

export class UserListQuery extends PaginationReq {
  realname: string = '';
}
export const columns: VxeColumnProps = [
  {
    key: 'username',
    field: 'username',
    title: '用户名',
    width: 100,
  },
  {
    key: 'realname',
    field: 'realname',
    title: '昵称',
    width: 100,
  },
  {
    key: 'mobile',
    field: 'mobile',
    title: '手机号',
    width: 100,
  },
  {
    key: 'status',
    field: 'status',
    slots: { body: 'status' },

    title: '状态',
    width: 100,
  },
  {
    key: 'updateTime',
    field: 'updateTime',
    title: '更新时间',
    width: 100,
  },
  {
    key: 'createByName',
    field: 'createByName',
    title: '创建人',
    width: 100,
  },
  {
    key: 'updateByName',
    field: 'updateByName',
    title: '更新人',
    width: 100,
  },
  {
    key: 'action',
    field: 'action',
    title: '操作',
    width: 180,
    slots: { body: 'action' },
  },
];
