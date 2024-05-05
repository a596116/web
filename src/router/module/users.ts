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
      component: () => import('@/views/Auth/User.vue'),
      meta: {
        menu: { title: '用戶', }, permission: 'admin', number: 2
      },
      props: (route) => ({ id: route.params.id || 1 })
    },
    {
      name: 'admin/userManage',
      path: 'user/edit/:id?',
      component: () => import('@/views/Auth/UserManage.vue'),
      meta: {
        permission: 'admin', number: 2
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
