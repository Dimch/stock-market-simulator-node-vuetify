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
    {
      name: 'Data',
      path: 'widget/data',
      component: () => import('@/views/widgets/data/DataPage.vue')
    },
    {
      name: 'Chart',
      path: 'widget/chart',
      component: () => import('@/views/widgets/chart/ChartPage.vue')
    },
    {
      name: 'Editor',
      path: 'forms/plugins/editor',
      component: () => import('@/views/forms/plugins/editor/EditorPage.vue')
    },
    {
      name: 'Dropzone',
      path: 'forms/plugins/dropzone',
      component: () => import('@/views/forms/plugins/dropzone/DropzonePage.vue')
    },
    {
      name: 'Mask',
      path: 'forms/plugins/mask',
      component: () => import('@/views/forms/plugins/mask/MaskPage.vue')
    },
    {
      name: 'Clipboard',
      path: 'forms/plugins/clipboard',
      component: () => import('@/views/forms/plugins/clipboard/ClipboardPage.vue')
    },
    {
      name: 'ApexChart',
      path: 'forms/charts/apexchart',
      component: () => import('@/views/forms/charts/apex-chart/ApexChart.vue')
    },
    {
      name: 'Layouts',
      path: 'forms/layouts/layouts',
      component: () => import('@/views/forms/layouts/LayoutPage.vue')
    },
    {
      name: 'MultiColumnForms',
      path: 'forms/layouts/multi-column-forms',
      component: () => import('@/views/forms/layouts/MultiColumnForms.vue')
    },
    {
      name: 'ActionBar',
      path: 'forms/layouts/action-bar',
      component: () => import('@/views/forms/layouts/ActionBar.vue')
    },
    {
      name: 'StickyActionBar',
      path: 'forms/layouts/sticky-action-bar',
      component: () => import('@/views/forms/layouts/StickyActionBar.vue')
    },
    {
      name: 'TableBasic',
      path: 'tables/tbl-basic',
      component: () => import('@/views/forms/tables/TableBasic.vue')
    },
    {
      name: 'TableDark',
      path: 'tables/tbl-dark',
      component: () => import('@/views/forms/tables/TableDark.vue')
    },
    {
      name: 'TableDensity',
      path: 'tables/tbl-density',
      component: () => import('@/views/forms/tables/TableDensity.vue')
    },
    {
      name: 'TableHeight',
      path: 'tables/tbl-height',
      component: () => import('@/views/forms/tables/TableHeight.vue')
    },
    {
      name: 'TableFixedHeader',
      path: 'tables/tbl-fixed-header',
      component: () => import('@/views/forms/tables/TableHeaderFixed.vue')
    },
    {
      name: 'Form Validation',
      path: 'forms/formvalidation',
      component: () => import('@/views/forms/FormValidation.vue')
    },
    {
      name: 'Form Wizard',
      path: 'forms/formwizard',
      component: () => import('@/views/forms/formWizard/FormWizard.vue')
    },
    {
      name: 'Ant design Icons',
      path: 'icons/ant',
      component: () => import('@/views/utilities/icons/AntDesignIcons.vue')
    },
    {
      name: 'Tabler Icons',
      path: 'icons/tabler',
      component: () => import('@/views/utilities/icons/TablerIcons.vue')
    },
    {
      name: 'Material Icons',
      path: 'icons/material',
      component: () => import('@/views/utilities/icons/MaterialIcons.vue')
    },
    {
      name: 'Pricing 1',
      path: 'pages/pricing1',
      component: () => import('@/views/pages/PricingPage1.vue')
    },
    {
      name: 'UserProfile',
      path: 'app/user/userprofile',
      component: () => import('@/views/apps/users/user-profile/UserProfilePage.vue')
    },
    {
      name: 'SocialProfile',
      path: 'app/user/social/posts',
      component: () => import('@/views/apps/users/social-profile/PostPage.vue')
    },
    {
      name: 'SocialFollowers',
      path: 'app/user/social/followers',
      component: () => import('@/views/apps/users/social-profile/FollowerPage.vue')
    },
    {
      name: 'SocialFriends',
      path: 'app/user/social/friends',
      component: () => import('@/views/apps/users/social-profile/FriendPage.vue')
    },
    {
      name: 'SocialFriendsRequest',
      path: 'app/user/social/friendsrequest',
      component: () => import('@/views/apps/users/social-profile/FriendRequest.vue')
    },
    {
      name: 'SocialGallery',
      path: 'app/user/social/gallery',
      component: () => import('@/views/apps/users/social-profile/GalleryPage.vue')
    },
    {
      name: 'Profile 01',
      path: 'app/user/account-profile/profile1',
      component: () => import('@/views/apps/users/account-profile/profile1/ProfilePage1.vue')
    },
    {
      name: 'Profile 02',
      path: 'app/user/account-profile/profile2',
      component: () => import('@/views/apps/users/account-profile/profile2/ProfilePage2.vue')
    },
    {
      name: 'Profile 03',
      path: 'app/user/account-profile/profile3',
      component: () => import('@/views/apps/users/account-profile/profile3/ProfilePage3.vue')
    },
    {
      name: 'Style 01',
      path: 'app/user/card/card1',
      component: () => import('@/views/apps/users/card/CardStyle1.vue')
    },
    {
      name: 'Style 02',
      path: 'app/user/card/card2',
      component: () => import('@/views/apps/users/card/CardStyle2.vue')
    },
    {
      name: 'Style 03',
      path: 'app/user/card/card3',
      component: () => import('@/views/apps/users/card/CardStyle3.vue')
    },
    {
      name: 'List',
      path: 'app/user/list1',
      component: () => import('@/views/apps/users/list/ListPage1.vue')
    },
    {
      name: 'List2',
      path: 'app/user/list2',
      component: () => import('@/views/apps/users/list/ListPage2.vue')
    },
  ]
};

export default MainRoutes;
