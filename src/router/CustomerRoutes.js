const MainRoutes = {
  path: '/trader',
  meta: {
    requiresAuth: true,
    authStrategy: 'customer',
  },
  redirect: '/trader/floor',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  children: [
    {
      name: 'Trading Floor',
      path: 'floor',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Portfolio',
      path: 'stocks',
      component: () => import('@/views/dashboards/analytics/AnalyticsDashboard.vue')
    },
  ]
};

export default MainRoutes;
