import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'Test',
      icon: 'Lightning',
    },
  },
  children: [
    {
      name: 'admin/test',
      path: 'test',
      component: () => import('@/views/test/test.vue'),
      meta: {
        menu: { title: 'Test' }
        , number: 11,
      },
    },
    {
      name: 'admin/hi',
      path: 'hi',
      component: () => import('@/views/test/hi.vue'),
      meta: {
        menu: { title: 'hi' }
        , number: 12,
      },
    },
    {
      name: 'admin/login',
      path: 'login',
      component: () => import('@/views/test/login.vue'),
      meta: {
        menu: { title: 'Login' }
        , number: 12,
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
