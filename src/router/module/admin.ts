import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'Dashboard',
      icon: 'Dashboard',
    },
  },
  children: [
    {
      name: 'admin/home',
      path: 'home',
      component: () => import('@/views/admin/dashboard.vue'),
      meta: {
        menu: { title: '工作台' }
        , number: 1,
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
