import type { RouteRecordRaw } from 'vue-router'
export default {
  name: 'admin',
  path: '/admin',
  redirect: '/admin/home',
  component: () => import('@/layout/admin.vue'),
  meta: {
    auth: true,
    page: 'admin',
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
        menu: { title: '工作台', }
      },
    },
  ],
} as RouteRecordRaw
