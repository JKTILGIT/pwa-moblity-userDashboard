
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Sidebar({ open, onClose }){
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const handleViewProfile = () => {
    onClose() // Close the sidebar first
    navigate('/profile') // Navigate to profile page
  }
  
  if (!open) return null
  return (
    <div className='drawer-backdrop' onClick={onClose}>
      <aside className='drawer card' onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:44,height:44,borderRadius:999,background:'#fde68a',display:'grid',placeItems:'center',fontWeight:700}}>AY</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{t('sidebar.goodMorning')}</div>
            <small>{t('sidebar.user')}</small>
          </div>
          <button onClick={onClose} className='btn' style={{padding:'8px 12px', background:'#f3f4f6', color:'#111'}}>✕</button>
        </div>

        <button className='btn' style={{width:'100%', marginTop:12}} onClick={handleViewProfile}>{t('sidebar.viewProfile')} →</button>

        <div className='menu-section'>
          <div className='menu-section-title'>{t('sidebar.quickMenu')}</div>
          <div className='stack'>
            <Link to='/rate-card' className='menu-item'>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src='/performance.png' alt='rate card' className='menu-item-icon' />
                {t('sidebar.rateCard')}
              </div>
              <small>›</small>
            </Link>
            <Link to='/invoice-history' className='menu-item'>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src='/Invoice.png' alt='invoice history' className='menu-item-icon' />
                {t('sidebar.invoiceHistory')}
              </div>
              <small>›</small>
            </Link>
            <Link to='/payments' className='menu-item'>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src='/Invoice.png' alt='payment method' className='menu-item-icon' />
                {t('sidebar.paymentMethod')}
              </div>
              <small>›</small>
            </Link>
            <Link to='/kyc' className='menu-item'>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src='/Invoice.png' alt='kyc documents' className='menu-item-icon' />
                {t('sidebar.kycDocuments')}
              </div>
              <small>›</small>
            </Link>
          </div>
        </div>

        <div className='menu-section'>
          <div className='menu-section-title'>{t('sidebar.training')}</div>
          <div className='stack'>
            <Link to='/training' className='menu-item'>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src='/performance.png' alt='training' className='menu-item-icon' />
                {t('sidebar.trainingSOPs')}
              </div>
              <small>›</small>
            </Link>
          </div>
        </div>

        <div className='menu-section'>
          <div className='menu-section-title'>{t('sidebar.supportHelp')}</div>
          <div className='stack'>
            <Link to='/support' className='menu-item'>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src='/performance.png' alt='support' className='menu-item-icon' />
                {t('sidebar.supportTickets')}
              </div>
              <small>›</small>
            </Link>
          </div>
        </div>

        <hr className='sep'/>
        <button className='logout-btn' onClick={()=>{ localStorage.removeItem('access_token'); window.location.replace('/login') }}>{t('sidebar.logOut')}</button>
      </aside>
    </div>
  )
}
