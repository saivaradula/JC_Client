import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/me/Login'))
const Wip = React.lazy(() => import('./views'))

const AddStaff = React.lazy(() => import('./views/staff/add'))
const ListStaff = React.lazy(() => import('./views/staff/list'))
const AddCustomer = React.lazy(() => import('./views/customer/add'))
const ListCustomer = React.lazy(() => import('./views/customer/list'))
const AddProduct = React.lazy(() => import('./views/products/add'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login },

  { path: '/home', name: 'Welcome', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // staff
  { path: '/staff', name: 'Staff', element: ListStaff, exact: true },
  { path: '/staff/add', name: 'Add Staff Member', element: AddStaff },
  { path: '/staff/list', name: 'List', element: ListStaff },

  // user pages
  { path: '/me/lockscreen', name: 'Add', element: AddStaff },

  // customer pages
  { path: '/customer', name: 'Customers', element: ListCustomer },
  { path: '/customer/add', name: 'Add', element: AddCustomer },
  { path: '/customer/list', name: 'List', element: ListCustomer },

  // products pages
  { path: '/products', name: 'Products', element: ListCustomer },
  { path: '/products/add', name: 'Add Product', element: AddProduct },

  // order pages

  { path: '/help', name: 'FAQ & Help', element: Wip },
  { path: '/dashboard', name: 'My Dashboard', element: Wip },
  { path: '/completed', name: 'Completed', element: Wip },
  { path: '/outsource', name: 'Out Source', element: Wip },
  { path: '/plating', name: 'Plating', element: Wip },
  { path: '/workshop', name: 'Workshop', element: Wip },
  { path: '/casting', name: 'Casting', element: Wip },
  { path: '/mould', name: 'Mould', element: Wip },
  { path: '/wax', name: 'Wax', element: Wip },
  { path: '/studio', name: 'Studio', element: Wip },
  { path: '/preprod', name: 'Pre Production', element: Wip },
]

export default routes
