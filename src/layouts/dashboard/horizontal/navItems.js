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
            title: 'Default',
            icon: DashboardOutlined,
            to: '/main/dashboard/default'
          },
          {
            title: 'Analytics',
            icon: DesktopOutlined,
            to: '/main/dashboard/analytics'
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
