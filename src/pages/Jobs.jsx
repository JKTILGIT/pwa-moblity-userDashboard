
import React, { useState } from 'react'
import JobCard from '../components/JobCard'

const openJobs = [
  {id:'123456789', vehicle:'DL3C132739', customer:'Ankit Yadav', mobile:'+91 1234567890', issue:'Tyre Burst', time:'10:30 AM'},
  {id:'123456788', vehicle:'DL3C132740', customer:'Priya Sharma', mobile:'+91 987654321', issue:'Tyre Replacement', time:'11:00 AM'},
  {id:'123456787', vehicle:'DL3C132741', customer:'Rahul Verma', mobile:'+91 456789123', issue:'Puncture', time:'11:30 AM'},
]

const closedJobs = [
  {id:'123456780', vehicle:'DL3C132739', customer:'Ankit Yadav', mobile:'+91 1234567890', issue:'Tyre Burst', time:'₹ 20,400 · Paid'},
  {id:'123456781', vehicle:'DL3C132740', customer:'Priya Sharma', mobile:'+91 987654321', issue:'Replacement', time:'₹ 15,200 · Pending'},
  {id:'123456782', vehicle:'DL3C132741', customer:'Rahul Verma', mobile:'+91 456789123', issue:'Puncture', time:'₹ 8,500 · Paid'},
]

export default function Jobs(){
  const [tab, setTab] = useState('open')
  const src = tab==='open'?openJobs:closedJobs

  return (
    <div className='container'>
      <div className='row' style={{justifyContent:'space-between'}}>
        <div className='row' style={{gap:8}}>
          <button className='btn' style={{background: tab==='open'?'var(--brand)':'#e5e7eb', color: tab==='open'?'#fff':'#111'}} onClick={()=>setTab('open')}>Open Jobs</button>
          <button className='btn' style={{background: tab==='closed'?'var(--brand)':'#e5e7eb', color: tab==='closed'?'#fff':'#111'}} onClick={()=>setTab('closed')}>Closed Jobs</button>
        </div>
        <div className='search'><input className='input' placeholder='Search by Vehicle no, Customer name' /></div>
      </div>

      <div className='list'>
        {src.map(j => <JobCard key={j.id} job={j} />)}
      </div>
    </div>
  )
}
