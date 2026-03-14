import {
  DashboardOutlined,
  DesktopOutlined,
  IdcardOutlined,
  DatabaseOutlined,
  LineChartOutlined,
} from '@ant-design/icons-vue';

const horizontalItems = [
  {
    title: 'Dashboard',
    icon: DashboardOutlined,
    to: '#',
    children: [
      {
        title: 'Security',
        icon: DashboardOutlined,
        to: '/console/admin/dashboards/security',
      },
      {
        title: 'Market',
        icon: DesktopOutlined,
        to: '/console/admin/dashboards/market',
      },
    ],
  },
  {
    title: 'More',
    icon: IdcardOutlined,
    to: '#',
    children: [
      {
        title: 'Statistics',
        icon: IdcardOutlined,
        to: '/admin/statistics',
      },
    ],
  },
];

export default horizontalItems;
