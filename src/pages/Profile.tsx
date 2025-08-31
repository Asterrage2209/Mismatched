import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../contexts/AuthContext'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    age: 28,
    gender: 'Male',
    location: 'New York, NY',
    bio: 'Adventure seeker looking for someone to explore with. Love hiking, photography, and trying new restaurants.',
    lookingFor: 'Relationship',
    hobbies: ['Hiking', 'Photography', 'Cooking', 'Traveling', 'Music'],
    profilePicture: 'https://placehold.co/400x400'
  })

  const handleSave = () => {
    // In a real app, you would save this to the backend
    console.log('Profile updated:', profileData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <>
      <Navbar />
      
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="fw-bold mb-0">My Profile</h2>
                  {!isEditing ? (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="fas fa-edit me-2"></i>Edit Profile
                    </button>
                  ) : (
                    <div>
                      <button 
                        className="btn btn-success me-2"
                        onClick={handleSave}
                      >
                        <i className="fas fa-save me-2"></i>Save
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        <i className="fas fa-times me-2"></i>Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-4 text-center mb-4">
                    <img 
                      src={profileData.profilePicture} 
                      alt="Profile" 
                      className="rounded-circle mb-3" 
                      width="200" 
                      height="200"
                      style={{ objectFit: 'cover' }}
                    />
                    {isEditing && (
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-camera me-2"></i>Change Photo
                      </button>
                    )}
                  </div>
                  
                  <div className="col-md-8">
                    {isEditing ? (
                      <form>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={profileData.name}
                              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Age</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              value={profileData.age}
                              onChange={(e) => setProfileData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                            />
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Gender</label>
                            <select 
                              className="form-select" 
                              value={profileData.gender}
                              onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Non-binary">Non-binary</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Location</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={profileData.location}
                              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Looking For</label>
                          <select 
                            className="form-select" 
                            value={profileData.lookingFor}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lookingFor: e.target.value }))}
                          >
                            <option value="Relationship">Relationship</option>
                            <option value="Friendship">Friendship</option>
                            <option value="Casual">Casual</option>
                          </select>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">About Me</label>
                          <textarea 
                            className="form-control" 
                            rows={4}
                            value={profileData.bio}
                            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          ></textarea>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <h3 className="fw-bold mb-2">{profileData.name}, {profileData.age}</h3>
                        <p className="text-muted mb-2">{profileData.location}</p>
                        <p className="mb-3">{profileData.bio}</p>
                        
                        <div className="mb-3">
                          <strong>Looking for:</strong> {profileData.lookingFor}
                        </div>
                        
                        <div className="mb-3">
                          <strong>Hobbies & Interests:</strong>
                          <div className="mt-2">
                            {profileData.hobbies.map((hobby, index) => (
                              <span key={index} className="badge bg-primary me-2 mb-2">{hobby}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-md-6">
                    <h4 className="fw-bold mb-3">Account Settings</h4>
                    <div className="list-group list-group-flush">
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Email</span>
                        <span className="text-muted">{user?.email}</span>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Change Password</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Privacy Settings</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h4 className="fw-bold mb-3">Preferences</h4>
                    <div className="list-group list-group-flush">
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Notification Settings</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Matching Preferences</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Blocked Users</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <button className="btn btn-outline-danger">
                    <i className="fas fa-trash me-2"></i>Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
