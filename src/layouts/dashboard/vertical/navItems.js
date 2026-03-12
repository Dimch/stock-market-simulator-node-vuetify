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
    to: '/main/dashboards/security',
  },
  {
    id: 'market',
    title: 'Market',
    icon: StockOutlined,
    to: '/main/dashboards/market',
  },
  // {
  //   title: 'Components',
  //   icon: GoldOutlined,
  //   to: 'components/buttons',
  //   getURL: true,
  //   type: 'external',
  //   chip: 'new',
  //   chipColor: 'primary',
  //   chipVariant: 'tonal'
  // },
  {header: 'Widget'},
  {
    id: 'statistics',
    title: 'Statistics',
    icon: IdcardOutlined,
    to: '/widget/statistics'
  },
  // {
  //   title: 'Customer',
  //   icon: CustomerServiceOutlined,
  //   to: '/customer/',
  //   children: [
  //     {
  //       id: 'customerlist',
  //       title: 'Customer List',
  //       to: '/customer/customerlist'
  //     },
  //     {
  //       id: 'createcustomer',
  //       title: 'Create Invoice',
  //       to: '/app/customer/create-invoice'
  //     },
  //     {
  //       id: 'orderdetails',
  //       title: 'Order Details',
  //       to: '/app/customer/order-details'
  //     },
  //     {
  //       id: 'orderlist',
  //       title: 'Order List',
  //       to: '/customer/orderlist'
  //     },
  //     {
  //       id: 'productlist',
  //       title: 'Product List',
  //       to: '/customer/productlist'
  //     },
  //     {
  //       id: 'productreview',
  //       title: 'Product Review',
  //       to: '/customer/productreview'
  //     }
  //   ]
  // },
  // {
  //   title: 'Users',
  //   icon: UserOutlined,
  //   to: '/app/user',
  //   children: [
  //     {
  //       id: 'socialprofile',
  //       title: 'Social Profile',
  //       to: '/app/user/social/posts'
  //     },
  //     {
  //       title: 'Account Profile',
  //       to: '/app/user/account-profile',
  //       children: [
  //         {
  //           id: 'profile01',
  //           title: 'Profile 01',
  //           to: '/app/user/account-profile/profile1'
  //         },
  //         {
  //           id: 'profile02',
  //           title: 'Profile 02',
  //           to: '/app/user/account-profile/profile2'
  //         },
  //         {
  //           id: 'profile03',
  //           title: 'Profile 03',
  //           to: '/app/user/account-profile/profile3'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'userprofile',
  //       title: 'User Profile',
  //       to: '/app/user/userprofile'
  //     },
  //     {
  //       title: 'Cards',
  //       to: '/app/user/card',
  //       children: [
  //         {
  //           id: 'style01',
  //           title: 'Style 01',
  //           to: '/app/user/card/card1'
  //         },
  //         {
  //           id: 'style02',
  //           title: 'Style 02',
  //           to: '/app/user/card/card2'
  //         },
  //         {
  //           id: 'style03',
  //           title: 'Style 03',
  //           to: '/app/user/card/card3'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'List',
  //       to: '/app/user/list',
  //       children: [
  //         {
  //           id: 'liststyle01',
  //           title: 'Style 01',
  //           to: '/app/user/list1'
  //         },
  //         {
  //           id: 'liststyle02',
  //           title: 'Style 02',
  //           to: '/app/user/list2'
  //         }
  //       ]
  //     }
  //   ]
  // },
];
