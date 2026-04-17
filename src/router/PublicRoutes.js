const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      name: 'Landing',
      path: '/',
      component: () => import('@/views/pages/landingpage/LandingPage.vue'),
    },
    {
      name: 'AdminAuthentication',
      path: '/login',
      component: () => import('@/views/authentication/LoginPage.vue'),
    },
    {
      name: 'PrivacyPolicy',
      path: '/privacy-policy',
      redirect: '/construction',
    },
    {
      name: 'FAQs',
      path: '/faq',
      component: () => import('@/views/pages/landingpage/FAQs.vue'),
    },
    {
      name: 'Under Construction',
      path: '/construction',
      component: () => import('@/views/pages/UnderConstruction.vue'),
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/views/pages/ErrorPage.vue'),
    },
    {
      name: '500',
      path: '/500',
      component: () => import('@/views/pages/ErrorPage.vue'),
    },
  ],
};

export default PublicRoutes;
