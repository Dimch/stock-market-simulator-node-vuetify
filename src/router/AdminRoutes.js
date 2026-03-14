const AdminRoutes = {
  path: '/console/admin',
  meta: {
    requiresAuth: true,
    authStrategy: 'admin',
    loginRoute: '/login',
  },
  redirect: '/console/admin/dashboards/market',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Security',
      path: 'dashboards/security',
      component: () => import('@/views/dashboards/SecurityDashboard.vue'),
    },
    {
      name: 'Market',
      path: 'dashboards/market',
      component: () => import('@/views/dashboards/MarketDashboard.vue'),
    },
    {
      name: 'Stocks',
      path: 'stocks',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
    {
      name: 'Transactions',
      path: 'transactions',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
    {
      name: 'Rate Limits',
      path: 'rate-limits',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
    {
      name: 'Rate Limit Configuration',
      path: 'rate-limits/configuration',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
    {
      name: 'Statistics',
      path: 'widget/statistics',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
  ]
};

export default AdminRoutes;
