import type { RouteRecordRaw } from 'vue-router'
export default {
    page: {
        auth: true,
        name: 'admin',
        menu: {
            title: '管理',
            icon: 'MoreApp',
        },
    },
    children: [
        {
            name: 'admin/birthday',
            path: 'birthday',
            component: () => import('@/views/manage/birthday.vue'),
            meta: { menu: { title: 'Birthday' }, number: 4, permission: 'user' },
        },
        // {
        //     name: 'admin/article',
        //     path: 'article',
        //     component: () => import('@/views/article/article.vue'),
        //     meta: { menu: { title: 'article' }, number: 3 },
        // },
    ],
} as { page: any, children: RouteRecordRaw[] }
