const horizontalItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-gauge',
    to: '#',
    children: [
      {
        title: 'Security',
        icon: 'mdi-shield-lock-outline',
        to: '/console/admin/dashboards/security',
      },
      {
        title: 'Market',
        icon: 'mdi-finance',
        to: '/console/admin/dashboards/market',
      },
    ],
  },
  {
    title: 'More',
    icon: 'chart-bell-curve',
    to: '#',
    children: [
      {
        title: 'Statistics',
        icon: 'chart-timeline',
        to: '/admin/statistics',
      },
    ],
  },
];

export default horizontalItems;
