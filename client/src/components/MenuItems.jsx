import React from 'react'
import { menuItemsData } from '../assets/user'
import { NavLink } from 'react-router-dom'

const MenuItems = ({setSidebarOpen}) => {
  return (
    <div className='p-3 flex flex-col gap-2'>
        {
             menuItemsData.map(({to,label,icon})=>(
                <NavLink key={to} to={to} end={to==='/'} onClick={()=>(setSidebarOpen(false))} className={({isActive})=>`
                flex gap-2 items-center p-2 rounded-xl text-lg ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`}>
                    {icon}
                    {label}
                </NavLink>
            ))
        }

    </div>
  )
}

export default MenuItems