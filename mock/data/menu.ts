import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const dashboard = {
  id: '1',
  icon: 'icon-dashboard',
  name: '仪表盘',
  path: '/dashboard',
  children: [],
};

const demos = {
  id: '3',
  icon: 'icon-changyongshili',
  name: '示例',
  path: '/vxe-demo',
  children: [
    {
      id: '3-1',
      icon: 'icon-biaodanzujian-biaoge',
      name: '普通列表',
      path: '/vxe-demo/demo1',
      children: [],
    },
    {
      id: '3-2',
      icon: 'icon-Group-',
      name: '树列表',
      path: '/vxe-demo/demo2',
      children: [],
    },
    {
      id: '3-3',
      icon: 'icon-kebianjibiaoge',
      name: '可编辑列表',
      path: '/vxe-demo/demo3',
      children: [],
    },
    {
      id: '3-4',
      icon: 'icon-kebianjibiaoge',
      name: 'grid表格',
      path: '/vxe-demo/demo4',
      children: [],
    },
    {
      id: '3-7',
      icon: 'icon-daimashili',
      name: 'AntDesignTable',
      path: '/vxe-demo/demo5',
      children: [],
    },
  ],
};
const system = {
  id: '4',
  icon: 'icon-xitong',
  name: '系统',
  path: '/management',
  children: [
    {
      id: '4-1',
      icon: 'icon-zuozhe',
      name: '个人设置',
      path: '/manage/document',
      children: [],
    },
  ],
};

const echarts = {
  id: '5',
  icon: 'icon-tubiao-zhexiantu',
  name: '图表',
  path: '/echarts',
  children: [
    {
      id: '5-1',
      icon: 'icon-tubiao-zhexiantu',
      name: '图表1',
      path: '/echarts/demo1',
      children: [],
    },
  ],
};
const components = {
  id: '6',
  icon: 'icon-xitong',
  name: '组件',
  path: '/components',
  children: [
    {
      id: '6-0',
      icon: 'icon-shujuhuizong',
      name: '汇总',
      path: '/components/index',
      children: [],
    },
    {
      id: '6-7',
      icon: 'icon-canvas',
      name: 'canvas',
      path: '/components/canvas',
      children: [],
    },
    {
      id: '6-7',
      icon: 'icon-canvas',
      name: 'mouseSelection',
      path: '/components/mouseSelection',
      children: [],
    },
  ],
};
const menuList = [dashboard, components, demos, echarts, system];
export default [
  {
    url: '/basic-api/system/getMenuList',
    method: 'get',
    response: () => {
      return resultSuccess(menuList);
    },
  },
] as MockMethod[];
