import type { RouteRecordRaw } from 'vue-router'
export default {
    page: {
        auth: true,
        name: 'admin',
        menu: {
            title: '文章',
            icon: 'Book',
        },
    },
    children: [
        {
            name: 'admin/blog',
            path: 'blog',
            component: () => import('@/views/article/blog.vue'),
            meta: { menu: { title: 'Blog' }, number: 3, permission: 'admin' },
        },
        {
            name: 'admin/article',
            path: 'article',
            component: () => import('@/views/article/article.vue'),
            meta: { menu: { title: 'article' }, number: 3 },
        },
    ],
} as { page: any, children: RouteRecordRaw[] }
