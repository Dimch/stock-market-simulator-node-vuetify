const CustomerRoutes = {
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
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
    {
      name: 'Portfolio',
      path: 'stocks',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
  ],
};

export default CustomerRoutes;
