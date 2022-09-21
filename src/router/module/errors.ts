import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: '錯誤頁面',
      icon: 'Caution',
    },
  },
  children: [
    // {
    //   name: 'error/404',
    //   path: '404',
    //   component: () => import('@/views/error/404.vue'),
    //   meta: {
    //     menu: { title: '404頁面' }, number: 6
    //   },
    // },
    // {
    //   name: 'error/403',
    //   path: '403',
    //   component: () => import('@/views/error/403.vue'),
    //   meta: {
    //     menu: { title: '403頁面' }, number: 7
    //   },
    // },
    // {
    //   name: 'error/500',
    //   path: '500',
    //   component: () => import('@/views/error/500.vue'),
    //   meta: {
    //     menu: { title: '500頁面' }, number: 8
    //   },
    // },
  ],
} as { page: any, children: RouteRecordRaw[] }
