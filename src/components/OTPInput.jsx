
import React from 'react'

export default function OTPInput({ value, onChange, length=6 }){
  const refs = Array.from({length}, ()=>React.createRef())
  const values = value || Array.from({length}, ()=>'')

  const handle = (i, v) => {
    const copy = [...values]
    copy[i] = v.replace(/\D/g,'').slice(-1)
    onChange(copy)
    if (copy[i] && refs[i+1]) refs[i+1].current?.focus()
  }
  return (
    <div className='row' style={{justifyContent:'center'}}>
      {values.map((d,i)=>(
        <input key={i} ref={refs[i]} className='input' style={{width:44,textAlign:'center'}} value={d} onChange={e=>handle(i,e.target.value)} />
      ))}
    </div>
  )
}
