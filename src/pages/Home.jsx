
import React from 'react'
import JobCard from '../components/JobCard'

const data = [
  {id:'123456789', vehicle:'DL3C132740', customer:'Priya Sharma', mobile:'+91 987654321', issue:'Tyre Replacement', time:'11:00 AM'},
  {id:'123456790', vehicle:'DL3C132741', customer:'Rahul Verma', mobile:'+91 456789123', issue:'Puncture', time:'11:30 AM'},
  {id:'123456791', vehicle:'DL3C132742', customer:'Neha Singh', mobile:'+91 321654987', issue:'Battery Replacement', time:'12:00 PM'}
]

export default function Home(){
  return (
    <div className='container'>
      <div className='row' style={{gap:8}}>
        <div className='card' style={{flex:1, padding:12}}>
          <div>Open Jobs</div>
          <strong>20</strong>
        </div>
        <div className='card' style={{flex:1, padding:12}}>
          <div>Pending Payments</div>
          <strong>10</strong>
        </div>
      </div>

      <h3 style={{marginTop:16}}>Upcoming Jobs Today</h3>
      <div className='list'>
        {data.map(j => <JobCard key={j.id} job={j} />)}
      </div>
    </div>
  )
}
