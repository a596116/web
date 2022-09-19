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
      name: 'admin/user',
      path: 'user/:id?',
      component: () => import('@/views/auth/user.vue'),
      meta: {
        menu: { title: '用戶', }, permission: 'admin', number: 2
      },
      props: (route) => ({ id: route.params.id || 1 })
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
