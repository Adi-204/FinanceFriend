import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from './AppNavbar'

const Layout = () => {
  return (
    <div>
        <AppNavbar />
        <Outlet />
    </div>
  )
}

export default Layout