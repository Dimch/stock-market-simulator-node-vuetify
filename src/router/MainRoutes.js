const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true,
    authStrategy: 'admin',
    loginRoute: '/login',
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Default',
      path: 'dashboard/default',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Analytics',
      path: 'dashboard/analytics',
      component: () => import('@/views/dashboards/analytics/AnalyticsDashboard.vue')
    },
    {
      name: 'Starter',
      path: 'starter',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Stocks',
      path: 'stocks',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Transactions',
      path: 'transactions',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Rate Limits',
      path: 'rate-limits',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Rate Limit Configuration',
      path: 'rate-limits/configuration',
      component: () => import('@/views/StarterPage.vue')
    },
    // TODO: all pages below are to be removed.
    // Choose components to use as needed.
    {
      name: 'Statistics',
      path: 'widget/statistics',
      component: () => import('@/views/widgets/statistics/StatisticsPage.vue')
    },
  ]
};

export default MainRoutes;
