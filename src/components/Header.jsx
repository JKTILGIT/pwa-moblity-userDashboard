
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ onMenu }){
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const titleMap = {
    '/': t('header.homescreen'),
    '/jobs': t('header.jobs'),
    '/payments': t('header.payments'),
    '/profile': t('header.profile')
  }
  return (
    <div className='header card'>
      <button onClick={onMenu} className='btn' style={{padding:'8px 12px', width: 'auto', maxWidth: 'none', height: 'auto'}}>☰</button>
      <div className='brand'>
        {/* <img src='/logo.svg' alt='logo'/> */}
        <div className='brand-title'>JK Tyre PWA</div>
      </div>
      <div style={{marginLeft:'auto', display: 'flex', alignItems: 'center', gap: '12px'}}>
        <LanguageSwitcher />
        {/* <div style={{color:'#6b7280'}} className='text-field'>{titleMap[pathname] || ''}</div> */}
      </div>
    </div>
  )
}
