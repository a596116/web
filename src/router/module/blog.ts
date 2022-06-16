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
            name: 'admin/article',
            path: 'article',
            component: () => import('@/views/article/article.vue'),
            meta: { menu: { title: 'article' }, number: 3 },
        },
    ],
} as { page: any, children: RouteRecordRaw[] }
