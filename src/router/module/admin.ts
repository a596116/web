import type { RouteRecordRaw } from 'vue-router'
export default {
  name: 'admin',
  path: '/admin',
  redirect: '/admin/home',
  component: () => import('@/layout/admin.vue'),
  meta: {
    auth: true,
    menu: {
      title: 'Dashboard',
      icon: 'Dashboard',
    },
  },
  children: [
    {
      name: 'admin/home',
      path: 'home',
      component: () => import('@/views/admin/home.vue'),
      meta: {
        menu: { title: '工作台', }
      },
    },
    {
      name: 'admin/article',
      path: 'article',
      component: () => import('@/views/admin/article.vue'),
      meta: {
        menu: { title: 'List', }
      },
    },
  ],
} as RouteRecordRaw
