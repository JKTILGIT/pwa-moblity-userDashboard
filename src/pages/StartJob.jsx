import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function StartJob(){
  const { id } = useParams()
  const nav = useNavigate()
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showCaptureModal, setShowCaptureModal] = useState(false)
  const [selectedTyreType, setSelectedTyreType] = useState('tubeless')
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedPatchType, setSelectedPatchType] = useState('nylon')
  const [patchNumber, setPatchNumber] = useState('3')
  const [tyreFittingOption, setTyreFittingOption] = useState('mount')
  const [wheelAssemblyOption, setWheelAssemblyOption] = useState('jack')
  const [otherServicesText, setOtherServicesText] = useState('')

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const services = ['Tyre Fitting', 'Puncture', 'Wheel Assembly', 'Air Pressure Check', 'Other Services']

  return (
    <div className='container'>
      <div className='card' style={{padding:20}}>
        {/* Header */}
        <div className='row' style={{alignItems:'center', marginBottom:20}}>
          <button onClick={() => nav('/jobs')} className='btn' style={{background:'#f3f4f6', color:'#111', padding:'8px 12px'}}>←</button>
          <div style={{marginLeft:12}}>
            <h3 style={{margin:0, color:'var(--brand)'}}>DL3C132739</h3>
            <small style={{color:'#6b7280'}}>Tyre Location</small>
          </div>
        </div>

        {/* Step 1: Upload Pre-Repair Photo */}
        <div className='step-section'>
          <div className='row' style={{alignItems:'center', marginBottom:16}}>
            <span className='step-number'>Step 1:</span>
            <span className='step-title'>Upload Pre-Repair Photo</span>
            <div className='step-complete'>✓</div>
          </div>
          
          <div className='stack' style={{gap:16, marginBottom:24}}>
            <div className='upload-area' onClick={() => setShowModal(true)}>
              <div style={{textAlign:'center', padding:40}}>
                <img src='/Group.png' alt='camera' style={{width:48, height:48, marginBottom:12}} />
                <div style={{color:'#6b7280'}}>Tap to upload</div>
              </div>
            </div>
            <div className='upload-area' onClick={() => setShowModal(true)}>
              <div style={{textAlign:'center', padding:40}}>
                <img src='/Group.png' alt='camera' style={{width:48, height:48, marginBottom:12}} />
                <div style={{color:'#6b7280'}}>Tap to upload</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Work & Charges */}
        <div className='step-section'>
          <div className='row' style={{alignItems:'center', marginBottom:16}}>
            <span className='step-number'>Step 2:</span>
            <span className='step-title'>Work & Charges</span>
          </div>
          <p style={{color:'#6b7280', marginBottom:24}}>Kindly Select Services Being done</p>

          {/* Select Tyre Type */}
          <div className='section'>
            <h4>Select Tyre Type</h4>
            <div className='segmented-control'>
              <button 
                className={`segmented-btn ${selectedTyreType === 'tubeless' ? 'active' : ''}`}
                onClick={() => setSelectedTyreType('tubeless')}
              >
                Tubeless
              </button>
              <button 
                className={`segmented-btn ${selectedTyreType === 'tube' ? 'active' : ''}`}
                onClick={() => setSelectedTyreType('tube')}
              >
                Tube Type
              </button>
            </div>
          </div>

          {/* Select Services */}
          <div className='section'>
            <h4>Select Services</h4>
            <div className='checkbox-list'>
              {services.map(service => (
                <label key={service} className='checkbox-item'>
                  <input 
                    type='checkbox' 
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Sub-options */}
          {selectedServices.includes('Tyre Fitting') && (
            <div className='section'>
              <h4>Tyre Fitting</h4>
              <div className='radio-group'>
                <label className='radio-item'>
                  <input 
                    type='radio' 
                    name='tyreFitting' 
                    value='mount'
                    checked={tyreFittingOption === 'mount'}
                    onChange={(e) => setTyreFittingOption(e.target.value)}
                  />
                  <span>Mount</span>
                </label>
                <label className='radio-item'>
                  <input 
                    type='radio' 
                    name='tyreFitting' 
                    value='demount'
                    checked={tyreFittingOption === 'demount'}
                    onChange={(e) => setTyreFittingOption(e.target.value)}
                  />
                  <span>Demount</span>
                </label>
              </div>
            </div>
          )}

          {selectedServices.includes('Wheel Assembly') && (
            <div className='section'>
              <h4>Wheel Assembly</h4>
              <div className='radio-group'>
                <label className='radio-item'>
                  <input 
                    type='radio' 
                    name='wheelAssembly' 
                    value='jack'
                    checked={wheelAssemblyOption === 'jack'}
                    onChange={(e) => setWheelAssemblyOption(e.target.value)}
                  />
                  <span>Jack + Wheel Nuts</span>
                </label>
              </div>
            </div>
          )}

          {selectedServices.includes('Other Services') && (
            <div className='section'>
              <h4>Other Services</h4>
              <input 
                type='text' 
                className='input' 
                placeholder='Type Here' 
                value={otherServicesText}
                onChange={(e) => setOtherServicesText(e.target.value)}
              />
            </div>
          )}

          {/* Select Patch Type */}
          <div className='section'>
            <h4>Select Patch Type</h4>
            <div className='segmented-control'>
              <button 
                className={`segmented-btn ${selectedPatchType === 'nylon' ? 'active' : ''}`}
                onClick={() => setSelectedPatchType('nylon')}
              >
                Nylon Patch
              </button>
              <button 
                className={`segmented-btn ${selectedPatchType === 'radial' ? 'active' : ''}`}
                onClick={() => setSelectedPatchType('radial')}
              >
                Radial Patch
              </button>
            </div>
          </div>

          {/* Patch Number - Different options based on patch type */}
          <div className='section'>
            <h4>Patch no.:</h4>
            <div className='radio-group'>
              {selectedPatchType === 'nylon' ? (
                ['3', '4', '5', '6', '7', '8'].map(num => (
                  <label key={num} className='radio-item'>
                    <input 
                      type='radio' 
                      name='patchNumber' 
                      value={num}
                      checked={patchNumber === num}
                      onChange={(e) => setPatchNumber(e.target.value)}
                    />
                    <span>{num}</span>
                  </label>
                ))
              ) : (
                ['20', '24', '30', '33', '35', '37', '40', '42'].map(num => (
                  <label key={num} className='radio-item'>
                    <input 
                      type='radio' 
                      name='patchNumber' 
                      value={num}
                      checked={patchNumber === num}
                      onChange={(e) => setPatchNumber(e.target.value)}
                    />
                    <span>{num}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Continue Button */}
          <button className='btn' style={{width:'100%', marginTop:24}} onClick={() => setShowCaptureModal(true)}>
            Step 3: Capture Image
          </button>
        </div>
      </div>

      {/* Upload Photo Modal */}
      {showModal && (
        <div className='modal-backdrop' onClick={() => setShowModal(false)}>
          <div className='modal' onClick={e => e.stopPropagation()}>
            <div className='modal-header'>
              <h3>Upload Photo</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className='photo-preview'>
              <div>
                <div style={{color:'#6b7280'}}>Photo preview</div>
              </div>
            </div>
            <div className='modal-buttons'>
              <button className='modal-btn modal-btn-outline'>Retake</button>
              <button className='modal-btn-camera'>
                <img src='/Group.png' alt='camera' style={{width:24, height:24}} />
              </button>
              <button className='modal-btn modal-btn-solid'>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Capture Post Repair Photo Modal */}
      {showCaptureModal && (
        <div className='modal-backdrop' onClick={() => setShowCaptureModal(false)}>
          <div className='modal' onClick={e => e.stopPropagation()}>
            <div className='modal-header'>
              <h3>Capture Post Repair Photo</h3>
              <button onClick={() => setShowCaptureModal(false)}>✕</button>
            </div>
            <div className='photo-preview'>
              <div>
                <div style={{color:'#6b7280'}}>Post repair photo preview</div>
              </div>
            </div>
            <div className='modal-buttons'>
              <button className='modal-btn modal-btn-outline'>Retake</button>
              <button className='modal-btn-camera'>
                <img src='/Group.png' alt='camera' style={{width:24, height:24}} />
              </button>
              <button className='modal-btn modal-btn-solid'>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
