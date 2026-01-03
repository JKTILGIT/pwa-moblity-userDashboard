
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  return (
    <div className='bottom-nav'>
      <Item to='/' label={t('bottomNav.home')} icon={HomeIcon} />
      <Item to='/jobs' label={t('bottomNav.jobs')} icon={WorkIcon} />
      <Item to='/payments' label={t('bottomNav.payments')} icon={PaymentIcon} />
      <Item to='/profile' label={t('bottomNav.profile')} icon={PersonIcon} />
    </div>
  )
}
