/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const GuestLayout:FC = () => {
  return (
    <div>
        <h1>WhatsApp Clone</h1>
        <Outlet/>
    </div>
  )
}

export default GuestLayout