import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'Member',
      icon: 'Member',
    },
  },
  children: [
    {
      name: 'admin/member/info',
      path: 'member/info',
      component: () => import('@/views/member/layout.vue'),
      meta: {},
    },
    {
      name: 'admin/member/password',
      path: 'member/password',
      component: () => import('@/views/member/layout.vue'),
      meta: {},
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
