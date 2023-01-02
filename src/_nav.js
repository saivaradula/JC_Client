import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilUserPlus,
  cilPlus,
  cilWallet,
  cilPuzzle,
  cilCoffee,
  cilRoom,
  cilTouchApp,
  cilSwapHorizontal,
  cilVerticalAlignCenter,
  cilVerticalAlignBottom,
  cilViewQuilt,
  cilWrapText,
  cilApple,
  cilUserFemale,
  cilDollar,
  cilEqualizer,
  cilHome,
  cilListNumbered
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Customer Management',
  // },
  {
    component: CNavGroup,
    name: 'Manage Customer',
    to: '/customer',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'New Customer',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/customer/add',
      },
      {
        component: CNavItem,
        name: 'View List',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
        to: '/customer/list',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Manage Products',
    to: '/products',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/products/add',
      },
      {
        component: CNavItem,
        name: 'My Products',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '#',
      }
    ]
  },

  {
    component: CNavGroup,
    name: 'Manage Order',
    to: '/orders',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    items: [{
      component: CNavItem,
      name: 'My Orders',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      to: '/customer/add',
    },
    {
      component: CNavItem,
      name: 'In Progress',
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      to: '/customer/list',
    },]
  },


  {
    component: CNavTitle,
    name: 'Departments',
  },

  {
    component: CNavItem,
    name: 'Pre Production',
    to: '/preprod',
    icon: <CIcon icon={cilCoffee} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '3D Studio',
    to: '/studio',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'New'
    },
  },
  {
    component: CNavItem,
    name: 'Wax',
    to: '/wax',
    icon: <CIcon icon={cilTouchApp} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Mould',
    to: '/mould',
    icon: <CIcon icon={cilVerticalAlignCenter} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Casting',
    to: '/casting',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />
  },

  {
    component: CNavGroup,
    name: 'And More',
    to: '/#',
    icon: <CIcon icon={cilVerticalAlignBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Workshop',
        to: '/workshop',
        icon: <CIcon icon={cilViewQuilt} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Plating',
        to: '/plating',
        icon: <CIcon icon={cilWrapText} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Outsource',
        to: '/outsource',
        icon: <CIcon icon={cilApple} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Customer',
        to: '/customer',
        icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Completed',
        to: '/completed',
        icon: <CIcon icon={cilEqualizer} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Admin',
    to: '/staff',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/staff/add',
      },
      {
        component: CNavItem,
        name: 'List',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
        to: '/staff/list',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'FAQ & Help',
    to: '/help',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Live Orders (36) ',
    to: '/help',
    icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />
  },
]

export default _nav
