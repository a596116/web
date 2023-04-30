export const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/admin/home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/hd',
        name: 'hd',
        component: () => import('../layout/hd.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/home',
        component: () => import('@/layout/admin.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue'),
        meta: { guest: true },
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import('../views/auth/login.vue'),
        meta: { guest: true },
    },
    {
        path: '/love',
        name: 'love',
        component: () => import('@/layout/love.vue'),
    },
    {
        path: '/birthday/:id?',
        name: 'birthday',
        component: () => import('@/layout/birthday.vue'),
    },
    {
        path: '/chart/:id?',
        name: 'chart',
        component: () => import('@/layout/chart.vue'),
    },
    {
        path: '/:any(.*)',
        name: 'notFound',
        component: () => import('../views/error/404.vue'),
    },
]