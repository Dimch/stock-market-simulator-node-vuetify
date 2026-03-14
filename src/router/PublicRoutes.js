const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
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
      component: () => import('@/views/pages/landingpage/PrivacyPolicy.vue'),
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
      name: 'Error 404',
      path: '/error',
      component: () => import('@/views/pages/Error404Page.vue'),
    },
    {
      name: 'Error 500',
      path: '/error500',
      component: () => import('@/views/pages/Error500Page.vue'),
    },
  ],
};

export default PublicRoutes;
