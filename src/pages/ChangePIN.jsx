import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { changePin } from '../api/auth'
import { toast } from 'react-hot-toast'

export default function ChangePIN() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [loading, setLoading] = useState(false)

  const API_BASE = (import.meta.env.VITE_API_BASE) || ''

  const validatePin = (pin) => {
    // PIN should be 4-6 digits
    const pinRegex = /^\d{4,6}$/
    return pinRegex.test(pin)
  }

  const handleChangePin = async () => {
    // Validation
    if (!currentPin) return toast.error(t('changePin.pleaseEnterCurrentPin'))
    if (!newPin) return toast.error(t('changePin.pleaseEnterNewPin'))
    if (!confirmPin) return toast.error(t('changePin.pleaseConfirmPin'))
    
    if (!validatePin(currentPin)) return toast.error(t('changePin.currentPinMustBeDigits'))
    if (!validatePin(newPin)) return toast.error(t('changePin.newPinMustBeDigits'))
    if (!validatePin(confirmPin)) return toast.error(t('changePin.confirmPinMustBeDigits'))
    
    if (newPin !== confirmPin) return toast.error(t('changePin.pinsDoNotMatch'))
    if (currentPin === newPin) return toast.error(t('changePin.newPinMustBeDifferent'))

    try {
      setLoading(true)
      
      // Get the auth token from localStorage
      const token = localStorage.getItem('access_token')
      console.log('Access token:', token ? 'Present' : 'Missing')
      
      if (!token) {
        throw new Error('No access token found. Please login again.')
      }
      
      // Option 1: Using fetch with manual token handling
      const response = await fetch(`${API_BASE || ''}/api/auth/user/change-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPin, newPin })
      })
      
      // Option 2: Using axios (uncomment to use instead of fetch)
      // const response = await changePin(currentPin, newPin)
      
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      // Parse the JSON response
      const data = await response.json()
      console.log('Response data:', data)
      
      // Check if the API call was successful
      if (response.ok && data.success) {
        toast.success(data.message || t('changePin.pinChangedSuccessfully'))
        navigate('/profile')
      } else if (response.status === 401) {
        // Unauthorized - token might be invalid
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        toast.error(t('changePin.sessionExpired'))
        navigate('/login')
      } else if (response.status === 403) {
        // Forbidden - insufficient permissions
        throw new Error(t('changePin.noPermission'))
      } else {
        throw new Error(data.message || t('changePin.failedToChangePin'))
      }

    } catch (error) {
      console.error('Change PIN Error:', error)
      const errorMessage = error?.message || t('changePin.failedToChangePin')
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <div className='card' style={{padding: 20, marginBottom: 16}}>
        <h2 className='bold-text' style={{fontSize: '24px', marginBottom: 20}}>{t('changePin.changePin')}</h2>
        <p className='caption-text' style={{marginBottom: 24}}>
          {t('changePin.enterCurrentAndNew')}
        </p>

        <div className='stack' style={{gap: 16}}>
          {/* Current PIN */}
          <div className='stack'>
            <label className='text-field' style={{marginBottom: 8}}>{t('changePin.currentPin')}</label>
            <input 
              type='password' 
              className='input' 
              placeholder={t('changePin.enterCurrentPin')} 
              value={currentPin} 
              onChange={e => setCurrentPin(e.target.value)}
              disabled={loading}
              maxLength={6}
            />
          </div>

          {/* New PIN */}
          <div className='stack'>
            <label className='text-field' style={{marginBottom: 8}}>{t('changePin.newPin')}</label>
            <input 
              type='password' 
              className='input' 
              placeholder={t('changePin.enterNewPin')} 
              value={newPin} 
              onChange={e => setNewPin(e.target.value)}
              disabled={loading}
              maxLength={6}
            />
          </div>

          {/* Confirm PIN */}
          <div className='stack'>
            <label className='text-field' style={{marginBottom: 8}}>{t('changePin.confirmNewPin')}</label>
            <input 
              type='password' 
              className='input' 
              placeholder={t('changePin.confirmNewPinPlaceholder')} 
              value={confirmPin} 
              onChange={e => setConfirmPin(e.target.value)}
              disabled={loading}
              maxLength={6}
            />
          </div>

          {/* PIN Requirements */}
          <div style={{
            background: '#f8fafc',
            padding: 12,
            borderRadius: 8,
            border: '1px solid #e5e7eb'
          }}>
            <p className='caption-text' style={{margin: 0, fontWeight: 600, marginBottom: 4}}>
              {t('changePin.pinRequirements')}
            </p>
            <ul style={{margin: 0, paddingLeft: 16, fontSize: '12px', color: '#6b7280'}}>
              <li>{t('changePin.mustBeDigits')}</li>
              <li>{t('changePin.cannotBeSame')}</li>
              <li>{t('changePin.useNumbersOnly')}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className='row' style={{gap: 12, marginTop: 8}}>
            <button 
              className='btn-secondary'
              onClick={() => navigate('/profile')}
              disabled={loading}
              style={{flex: 1}}
            >
              {t('common.cancel')}
            </button>
            <button 
              className={`btn ${loading ? 'btn-loading' : ''}`}
              onClick={handleChangePin}
              disabled={loading || !currentPin || !newPin || !confirmPin}
              style={{flex: 1}}
            >
              {loading ? t('changePin.changingPin') : t('changePin.changePin')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
