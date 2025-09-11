
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import PaymentIcon from '@mui/icons-material/Payment'
import PersonIcon from '@mui/icons-material/Person'

const Item = ({to, label, icon: Icon}) => {
  const { pathname } = useLocation()
  const active = pathname===to
  return (
    <NavLink to={to} className={'nav-item'+(active?' active':'')}>
      <Icon className='icon' />
      <span>{label}</span>
    </NavLink>
  )
}

export default function BottomNav(){
  return (
    <div className='bottom-nav'>
      <Item to='/' label='Home' icon={HomeIcon} />
      <Item to='/jobs' label='Jobs' icon={WorkIcon} />
      <Item to='/payments' label='Payments' icon={PaymentIcon} />
      <Item to='/profile' label='Profile' icon={PersonIcon} />
    </div>
  )
}
