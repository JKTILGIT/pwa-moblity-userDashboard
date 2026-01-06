
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function RateCard(){
  const { t } = useTranslation()
  return (
    <div className='container'>
      <div className='card' style={{padding:16}}>
        <h3>{t('rateCard.rateCard')}</h3>
        <ul>
          <li>{t('rateCard.tyreReplacement')} - ₹1200</li>
          <li>{t('rateCard.puncture')} - ₹300</li>
          <li>{t('rateCard.batteryReplacement')} - ₹800</li>
        </ul>
      </div>
    </div>
  )
}
