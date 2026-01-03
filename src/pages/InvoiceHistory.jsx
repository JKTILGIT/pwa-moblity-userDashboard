
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function InvoiceHistory(){
  const { t } = useTranslation()
  return (
    <div className='container'>
      <div className='card' style={{padding:16}}>
        <h3>{t('invoiceHistory.invoiceHistory')}</h3>
        <p>{t('invoiceHistory.listOfInvoices')}</p>
      </div>
    </div>
  )
}
