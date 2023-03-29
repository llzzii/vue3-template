import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const System: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: LAYOUT,
  meta: {
    title: '系统管理',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'user',
      name: 'userList',
      component: ()=>import('@/views/system/user/list.vue'),
      meta: {
        title: '用户管理',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'menu',
      name: 'menuList',
      component: ()=>import('@/views/system/menu/list.vue'),
      meta: {
        title: '菜单管理',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    }
  ],
};
