import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useProfile } from '../contexts/ProfileContext'

const CreateProfile: React.FC = () => {
  const navigate = useNavigate()
  const { createProfile } = useProfile()
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    bio: '',
    lookingFor: '',
    hobbies: [] as string[],
    profilePicture: 'https://placehold.co/600x800'
  })

  const hobbies = [
    "Reading", "Cooking", "Hiking", "Photography", "Gaming", 
    "Traveling", "Music", "Movies", "Sports", "Art", 
    "Dancing", "Writing", "Yoga", "Cycling", "Swimming",
    "Gardening", "Fishing", "Camping", "Painting", "Singing"
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleHobbyToggle = (hobby: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('profilePicture', e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.age || !formData.gender || !formData.location || !formData.bio || !formData.lookingFor) {
        setError('Please fill in all required fields')
        return
      }
      setCurrentStep(2)
      setError('')
    } else if (currentStep === 2) {
      if (formData.hobbies.length < 3) {
        setError('Please select at least 3 hobbies')
        return
      }
      setCurrentStep(3)
      setError('')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await createProfile({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      location: formData.location,
      bio: formData.bio,
      lookingFor: formData.lookingFor,
      hobbies: formData.hobbies,
      profilePicture: formData.profilePicture
    })

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Failed to create profile')
    }

    setIsLoading(false)
  }

  return (
    <>
      <Navbar />
      
      <div className="profile-creation-container">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card profile-card shadow-sm">
                <div className="card-body p-4">
                  <h2 className="text-center fw-bold mb-4">Create Your Profile</h2>
                  
                  <div className="progress mb-4" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                      aria-valuenow={(currentStep / 3) * 100} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger mb-4">{error}</div>
                  )}

                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="profile-step">
                      <h4 className="mb-4">Step 1: Basic Information</h4>
                      <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              id="age" 
                              min="18" 
                              max="120" 
                              value={formData.age}
                              onChange={(e) => handleInputChange('age', e.target.value)}
                              required 
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select 
                              className="form-select" 
                              id="gender" 
                              value={formData.gender}
                              onChange={(e) => handleInputChange('gender', e.target.value)}
                              required
                            >
                              <option value="" disabled>Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="non-binary">Non-binary</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">Location</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="location" 
                            placeholder="City, Country" 
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="bio" className="form-label">About Me</label>
                          <textarea 
                            className="form-control" 
                            id="bio" 
                            rows={4} 
                            placeholder="Tell us a bit about yourself..." 
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Looking For</label>
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="lookingFor" 
                              id="lookingForRelationship" 
                              value="relationship" 
                              checked={formData.lookingFor === 'relationship'}
                              onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                              required
                            />
                            <label className="form-check-label" htmlFor="lookingForRelationship">
                              Relationship
                            </label>
                          </div>
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="lookingFor" 
                              id="lookingForFriendship" 
                              value="friendship"
                              checked={formData.lookingFor === 'friendship'}
                              onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="lookingForFriendship">
                              Friendship
                            </label>
                          </div>
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="lookingFor" 
                              id="lookingForCasual" 
                              value="casual"
                              checked={formData.lookingFor === 'casual'}
                              onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="lookingForCasual">
                              Casual
                            </label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                          <button type="submit" className="btn btn-primary">Next</button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Step 2: Interests */}
                  {currentStep === 2 && (
                    <div className="profile-step">
                      <h4 className="mb-4">Step 2: Your Interests</h4>
                      <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                        <div className="mb-3">
                          <label className="form-label">Select Your Hobbies & Interests</label>
                          <p className="text-muted small">Choose at least 3 hobbies that you enjoy</p>
                          <div className="row g-3 mt-2">
                            {hobbies.map((hobby, index) => (
                              <div key={index} className="col-6 col-md-4">
                                <div className="form-check">
                                  <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={hobby} 
                                    id={`hobby${index}`}
                                    checked={formData.hobbies.includes(hobby)}
                                    onChange={() => handleHobbyToggle(hobby)}
                                  />
                                  <label className="form-check-label" htmlFor={`hobby${index}`}>
                                    {hobby}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>Back</button>
                          <button type="submit" className="btn btn-primary">Next</button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Step 3: Profile Picture */}
                  {currentStep === 3 && (
                    <div className="profile-step">
                      <h4 className="mb-4">Step 3: Profile Picture</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="profilePicture" className="form-label">Upload Profile Picture</label>
                          <div className="text-center p-4 border rounded bg-white mb-3" id="profilePictureContainer">
                            <div className="mb-3">
                              <img 
                                src={formData.profilePicture} 
                                alt="Profile preview" 
                                className="rounded-circle" 
                                width="150" 
                                height="150" 
                              />
                            </div>
                            <input 
                              type="file" 
                              className="form-control d-none" 
                              id="profilePicture" 
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            <button 
                              type="button" 
                              className="btn btn-outline-primary" 
                              id="selectImageBtn"
                              onClick={() => document.getElementById('profilePicture')?.click()}
                            >
                              <i className="fas fa-upload me-2"></i>Select Image
                            </button>
                          </div>
                          <div className="form-text text-center">Upload a clear photo of yourself. This will be visible to other users.</div>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>Back</button>
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Creating Profile...' : 'Complete Profile'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateProfile
