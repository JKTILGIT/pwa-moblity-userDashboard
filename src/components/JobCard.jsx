
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function JobCard({ job }){
  const nav = useNavigate()
  return (
    <div className='card job-card list-card'>
      <div className='job-card-content'>
        <div className='job-card-header'>
          <div className='job-badge'>New Job</div>
          <div className='ticket-id'>Ticket ID: #{job.id}</div>
          <div className='job-time'>Time: {job.time}</div>
        </div>
        
        <div className='vehicle-number'>{job.vehicle}</div>
        <div className='customer-info'>{job.customer} | {job.mobile}</div>
        
        <div className='ticket-issue-section'>
          <div className='ticket-issue-label'>Ticket Issue</div>
          <div className='ticket-issue-content'>
            <div className='issue-text'>{job.issue}</div>
            <button className='start-job-btn' onClick={() => nav(`/jobs/${job.id}/start`)}>Start Job</button>
          </div>
        </div>
      </div>
    </div>
  )
}
