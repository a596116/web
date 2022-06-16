import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'User',
      icon: 'User',
    },
  },
  children: [
    {
      name: 'admin/users',
      path: 'users',
      component: () => import('@/views/auth/users.vue'),
      meta: {
        menu: { title: '用戶', }, permission: '浩呆', number: 2
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
