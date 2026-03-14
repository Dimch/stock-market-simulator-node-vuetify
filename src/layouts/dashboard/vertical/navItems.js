// icons
import {
  DashboardOutlined,
  StockOutlined,
  IdcardOutlined
} from '@ant-design/icons-vue';

export default [
  {header: 'Dashboard'},
  {
    id: 'security',
    title: 'Security',
     icon: DashboardOutlined,
    to: '/console/admin/dashboards/security',
  },
  {
    id: 'market',
    title: 'Market',
    icon: StockOutlined,
    to: '/console/admin/dashboards/market',
  },
  {header: 'More'},
  {
    id: 'statistics',
    title: 'Statistics',
    icon: IdcardOutlined,
    to: '/admin/statistics'
  },
];
