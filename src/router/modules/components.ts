import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const ComponentsDemo: AppRouteRecordRaw = {
  path: '/components',
  name: 'componentsDemos',
  component: LAYOUT,
  meta: {
    title: '各种示例',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'index',
      name: 'indexDemo',
      component: import('@/views/components/index.vue'),
      meta: {
        title: '汇总',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'canvas',
      name: 'canvas',
      component: import('@/views/components/canvas.vue'),
      meta: {
        title: 'canvas',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'mouseSelection',
      name: 'mouseSelection',
      component: import('@/views/components/mouseSelection.vue'),
      meta: {
        title: 'mouseSelection',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};
