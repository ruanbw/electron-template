import type { RouteRecordRaw } from 'vue-router';

const BasicLayout = (): Promise<VueComponent> => import('@renderer/layouts/basic.vue');

const Dashboard: RouteRecordRaw[] = [{
    component: BasicLayout,
    meta: {
        title: 'Dashboard',
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
        {
            component: () => import('@renderer/views/dashboard/analytics/index.vue'),
            meta: {
                title: 'Analytics',
            },
            name: 'Analytics',
            path: '/analytics'
        },
        {
            component: () => import('@renderer/views/dashboard/workspace/index.vue'),
            meta: {
                title: 'Workspace',
            },
            name: 'Workspace',
            path: '/workspace'
        }
    ]
}];

export default Dashboard
