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
      component: () => import('@/views/member/info.vue'),
      meta: {},
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
