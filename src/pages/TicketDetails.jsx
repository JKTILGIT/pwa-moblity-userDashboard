import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function TicketDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const ticket = location.state?.ticket

  if (!ticket) {
    return (
      <div className='container'>
        <div className='card' style={{ padding: '20px', textAlign: 'center' }}>
          <h3>{t('ticketDetails.ticketNotFound')}</h3>
          <button className='btn-primary' onClick={() => navigate('/')}>
            {t('ticketDetails.backToHome')}
          </button>
        </div>
      </div>
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#dc2626'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return '#10b981'
      case 'closed': return '#6b7280'
      case 'completed': return '#10b981'
      case 'paid': return '#059669'
      case 'in progress': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  return (
    <div className='container ticket-details-container'>
      {/* Header */}
      <div className='card ticket-header-card'>
        <div className='ticket-header-content'>
          <h2 className='ticket-title'>{t('ticketDetails.ticketDetails')}</h2>
          <button className='btn-secondary back-btn' onClick={() => navigate('/')}>
            {t('ticketDetails.back')}
          </button>
        </div>
        
        <div className='ticket-badges'>
          <div className='priority-badge' style={{
            background: getPriorityColor(ticket.priority),
            color: 'white'
          }}>
            {ticket.priority} {t('ticketDetails.priority')}
          </div>
          <div className='status-badge' style={{
            background: getStatusColor(ticket.status),
            color: 'white'
          }}>
            {ticket.status}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className='card ticket-info-card'>
        <h3 className='ticket-section-title'>{t('ticketDetails.basicInformation')}</h3>
        <div className='ticket-info-grid'>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.ticketId')}</span>
            <div className='text-field'>#{ticket.zohoTicketId}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.subject')}</span>
            <div className='text-field'>{ticket.subject}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.category')}</span>
            <div className='text-field'>{ticket.category} - {ticket.subCategory}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.channel')}</span>
            <div className='text-field'>{ticket.channel}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.language')}</span>
            <div className='text-field'>{ticket.language}</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className='card ticket-info-card'>
        <h3 className='ticket-section-title'>{t('ticketDetails.contactInformation')}</h3>
        <div className='ticket-info-grid'>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.email')}</span>
            <div className='text-field'>{ticket.email}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.phone')}</span>
            <div className='text-field'>{ticket.phone}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.contactId')}</span>
            <div className='text-field'>{ticket.contactId}</div>
          </div>
        </div>
      </div>

      {/* Work Details */}
      {ticket.workDetails && (
        <div className='card ticket-info-card'>
          <h3 className='ticket-section-title'>{t('ticketDetails.workDetails')}</h3>
          <div className='ticket-info-grid'>
            <div className='ticket-info-item'>
              <span className='caption-text'>{t('ticketDetails.tyreType')}</span>
              <div className='text-field'>{ticket.workDetails.tyreType}</div>
            </div>
            <div className='ticket-info-item'>
              <span className='caption-text'>{t('ticketDetails.services')}</span>
              <div className='services-container'>
                {ticket.workDetails.services?.map((service, index) => (
                  <span key={index} className='service-tag'>
                    {service}
                  </span>
                ))}
              </div>
            </div>
            {ticket.workDetails.patchType && (
              <div className='ticket-info-item'>
                <span className='caption-text'>{t('ticketDetails.patchType')}</span>
                <div className='text-field'>{ticket.workDetails.patchType}</div>
              </div>
            )}
            {ticket.workDetails.patchNumber && (
              <div className='ticket-info-item'>
                <span className='caption-text'>{t('ticketDetails.patchNumber')}</span>
                <div className='text-field'>{ticket.workDetails.patchNumber}</div>
              </div>
            )}
            {ticket.workDetails.otherServices && (
              <div className='ticket-info-item'>
                <span className='caption-text'>{t('ticketDetails.otherServices')}</span>
                <div className='text-field'>{ticket.workDetails.otherServices}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dates */}
      <div className='card ticket-info-card'>
        <h3 className='ticket-section-title'>{t('ticketDetails.timeline')}</h3>
        <div className='ticket-info-grid'>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.created')}</span>
            <div className='text-field'>{new Date(ticket.createdAt).toLocaleString()}</div>
          </div>
          <div className='ticket-info-item'>
            <span className='caption-text'>{t('ticketDetails.updated')}</span>
            <div className='text-field'>{new Date(ticket.updatedAt).toLocaleString()}</div>
          </div>
          {ticket.dueDate && (
            <div className='ticket-info-item'>
              <span className='caption-text'>{t('ticketDetails.dueDate')}</span>
              <div className='text-field'>{new Date(ticket.dueDate).toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>

      {/* Photos */}
      {(ticket.preRepairPhotos?.length > 0 || ticket.postRepairPhotos?.length > 0) && (
        <div className='card ticket-info-card'>
          <h3 className='ticket-section-title'>{t('ticketDetails.photos')}</h3>
          {ticket.preRepairPhotos?.length > 0 && (
            <div className='photo-section'>
              <span className='caption-text'>{t('ticketDetails.preRepairPhotos')}</span>
              <div className='photos-container'>
                {ticket.preRepairPhotos.map((photo, index) => (
                  <div key={index} className='photo-placeholder'>
                    {photo}
                  </div>
                ))}
              </div>
            </div>
          )}
          {ticket.postRepairPhotos?.length > 0 && (
            <div className='photo-section'>
              <span className='caption-text'>{t('ticketDetails.postRepairPhotos')}</span>
              <div className='photos-container'>
                {ticket.postRepairPhotos.map((photo, index) => (
                  <div key={index} className='photo-placeholder'>
                    {photo}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className='card ticket-actions-card'>
        <div className='ticket-actions'>
          {ticket.status !== 'Completed' && (
            <button 
              className='btn-primary action-btn' 
              onClick={() => navigate(`/jobs/${ticket._id}/start`)}
            >
              {t('ticketDetails.startJob')}
            </button>
          )}
          <button 
            className='btn-secondary action-btn' 
            onClick={() => navigate('/')}
          >
            {t('ticketDetails.backToHome')}
          </button>
        </div>
      </div>
    </div>
  )
}
