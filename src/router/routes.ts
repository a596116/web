export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/hd',
        name: 'hd',
        component: () => import('../layout/hd.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue'),
        meta: { guest: true },
    },
    {
        path: '/:any(.*)',
        name: 'notFound',
        component: () => import('../views/error/404.vue'),
    },
]