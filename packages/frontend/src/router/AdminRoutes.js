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
      redirect: '/construction',
    },
    {
      name: 'Transactions',
      path: 'transactions',
      redirect: '/construction',
    },
    {
      name: 'Rate Limits',
      path: 'rate-limits',
      redirect: '/construction',
    },
    {
      name: 'Rate Limit Configuration',
      path: 'rate-limits/configuration',
      redirect: '/construction',
    },
    {
      name: 'Statistics',
      path: 'widget/statistics',
      redirect: '/construction',
    },
  ],
};

export default AdminRoutes;
