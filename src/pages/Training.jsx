
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Training(){
  const { t } = useTranslation()
  return (
    <div className='container'>
      <div className='card' style={{padding:16}}>
        <h3>{t('training.trainingSOPs')}</h3>
        <p>{t('training.browseContent')}</p>
      </div>
    </div>
  )
}
