import { PaginationReq } from '@/constrant/baseInterface';
import { VxeColumnProps } from 'vxe-table';

export interface Menu {
  id?: number;
  parentId: number;
  parentName?: string;
  name: string;
  icon: string;
  type: string
  sort: number;
  status: number;
  visible: boolean;
  keepAlive: boolean;
}
export const menuRules = {
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'change',
      max:50
    }
  ],
  parentId: [{ required: true, message: '请选择父菜单' }],
  
};

export class MenuListQuery extends PaginationReq {
  name: string = '';
}
export const columns: VxeColumnProps = [
  {
    key: 'name',
    field: 'name',
    title: '菜单名称',
    width: 100,
  },
  {
    key: 'type',
    field: 'type',
    title: '类型',
    width: 100,
  },
  {
    key: 'path',
    field: 'path',
    title: '路由地址',
    width: 100,
  },
  {
    key: 'icon',
    field: 'icon',
    title: '菜单图标',
    width: 100,
  },
  {
    key: 'component',
    field: 'component',
    title: '组件路径',
    width: 100,
  },
  {
    key: 'permission',
    field: 'permission',
    title: '权限标识',
    width: 100,
  },
  {
    key: 'visible',
    field: 'visible',
    slots: { body: 'visible' },

    title: '是否可见',
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
