import type { RouteRecordRaw } from 'vue-router'
export default {
    name: 'article',
    path: '/article',
    component: () => import('@/layout/admin.vue'),
    meta: {
        auth: true,
        page: 'admin',
        menu: {
            title: '文章',
            icon: 'Book',
        },
    },
    children: [
        {
            name: 'article/blog',
            path: 'blog',
            component: () => import('@/views/article/blog.vue'),
            meta: { menu: { title: 'blog' }, permission: '浩呆' },
        },
        {
            name: 'article/article',
            path: 'article',
            component: () => import('@/views/article/article.vue'),
            meta: { menu: { title: 'article' } },
        },
    ],
} as RouteRecordRaw
