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
        title: 'Dashboard',
        icon: DashboardOutlined,
        to: '#',
        children: [
          {
            title: 'Security',
            icon: DashboardOutlined,
            to: '/main/dashboards/security'
          },
          {
            title: 'Market',
            icon: DesktopOutlined,
            to: '/main/dashboards/market'
          }
        ]
      },
    ]
  },
  {
    title: 'Widgets',
    icon: IdcardOutlined,
    to: '#',
    children: [
      {
        title: 'Statistics',
        icon: IdcardOutlined,
        to: '/widget/statistics'
      },
      {
        title: 'Data',
        icon: DatabaseOutlined,
        to: '/widget/data'
      },
      {
        title: 'Chart',
        icon: LineChartOutlined,
        to: '/widget/chart'
      }
    ]
  },
];

export default horizontalItems;
