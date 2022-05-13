import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'error',
  path: '/error',
  component: () => import('@/layout/admin.vue'),
  meta: {
    auth: true,
    menu: {
      title: '錯誤頁面',
      icon: 'Caution',
    },
  },
  children: [
    {
      name: 'error/404',
      path: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        menu: { title: '404頁面' }, permission: ''
      },
    },
    {
      name: 'error/403',
      path: '403',
      component: () => import('@/views/error/403.vue'),
      meta: {
        menu: { title: '403頁面' },
      },
    },
    {
      name: 'error/500',
      path: '500',
      component: () => import('@/views/error/500.vue'),
      meta: {
        menu: { title: '500頁面' },
      },
    },
  ],
} as RouteRecordRaw
