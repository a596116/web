import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: '編輯器',
      icon: 'Editor',
    },
  },
  children: [
    // {
    //   name: 'admin/wang',
    //   path: 'wang',
    //   component: () => import('@/views/editor/wang.vue'),
    //   meta: { menu: { title: '富文本' }, permission: 'user', number: 4 },
    // },
    // {
    //   name: 'admin/markdown',
    //   path: 'markdown',
    //   component: () => import('@/views/editor/markdown.vue'),
    //   meta: { menu: { title: 'markdown' }, number: 5 },
    // },
    {
      name: 'admin/calendar',
      path: 'calendar',
      component: () => import('@/views/calendar/calendar.vue'),
      meta: { menu: { title: 'calendar' }, number: 5 },
    },
    {
      name: 'admin/toast',
      path: 'toast',
      component: () => import('@/views/calendar/toast.vue'),
      meta: { menu: { title: 'toast' }, number: 6 },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
