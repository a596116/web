import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'editor',
  path: '/editor',
  component: () => import('@/layout/admin.vue'),
  meta: {
    auth: true,
    menu: {
      title: '編輯器',
      icon: 'Editor',
    },
  },
  children: [
    {
      name: 'admin/wang',
      path: 'wang',
      component: () => import('@/views/editor/wang.vue'),
      meta: { menu: { title: '富文本' }, permission: 'editor' },
    },
    {
      name: 'admin/markdown',
      path: 'markdown',
      component: () => import('@/views/editor/markdown.vue'),
      meta: { menu: { title: 'markdown' }, permission: '' },
    },
  ],
} as RouteRecordRaw
