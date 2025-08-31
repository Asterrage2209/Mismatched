import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useProfile } from '../contexts/ProfileContext'
import { useAuth } from '../contexts/AuthContext'

interface Profile {
  userId: string
  name: string
  age: number
  gender: string
  location: string
  bio: string
  lookingFor: string
  hobbies: string[]
  profilePicture: string
  createdAt: string
}

const Dashboard: React.FC = () => {
  const { profiles, matches, createMatch, isLoading } = useProfile()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [showMatchNotification, setShowMatchNotification] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)

  const currentProfile = profiles[currentProfileIndex]

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentProfile) return

    if (direction === 'right') {
      // 30% chance of a match (for demo purposes)
      if (Math.random() < 0.3) {
        const result = await createMatch(user!.id, currentProfile.userId)
        if (result.success) {
          setMatchedProfile(currentProfile)
          setShowMatchNotification(true)
        }
      }
    }

    // Move to next profile
    setCurrentProfileIndex(prev => prev + 1)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handleSwipe('left')
    if (e.key === 'ArrowRight') handleSwipe('right')
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentProfile])

  const resetProfiles = () => {
    setCurrentProfileIndex(0)
  }

  const closeMatchNotification = () => {
    setShowMatchNotification(false)
    setMatchedProfile(null)
  }

  const openMessages = () => {
    setShowMatchNotification(false)
    navigate('/messages')
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container py-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <h2 className="mb-4 fw-bold">Find Your Match</h2>
            
            <div className="position-relative">
              <div className="card profile-card shadow">
                {!currentProfile ? (
                  <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4 text-center" style={{ minHeight: '400px' }}>
                    <div className="mb-4">
                      <i className="fas fa-heart text-primary heart-pulse" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h3 className="fw-bold mb-2">No more profiles</h3>
                    <p className="text-muted mb-4">We're finding more people for you. Check back soon!</p>
                    <button className="btn btn-primary" onClick={resetProfiles}>Start Over</button>
                  </div>
                ) : (
                  <>
                    <img src={currentProfile.profilePicture} className="card-img-top profile-image" alt={currentProfile.name} />
                    <div className="card-img-overlay profile-info d-flex align-items-end">
                      <div className="profile-details text-white">
                        <h3 className="card-title fw-bold mb-1">{currentProfile.name}, {currentProfile.age}</h3>
                        <p className="card-text mb-2">{currentProfile.location}</p>
                        <p className="card-text mb-3">{currentProfile.bio}</p>
                        <div className="d-flex flex-wrap gap-2">
                          {currentProfile.hobbies.map((hobby, index) => (
                            <span key={index} className="badge bg-primary">{hobby}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="swipe-buttons d-flex justify-content-center gap-3 mt-4">
                <button 
                  className="btn btn-light btn-swipe btn-swipe-left" 
                  onClick={() => handleSwipe('left')}
                  disabled={!currentProfile}
                >
                  <i className="fas fa-times"></i>
                </button>
                <button 
                  className="btn btn-primary btn-swipe btn-swipe-right" 
                  onClick={() => handleSwipe('right')}
                  disabled={!currentProfile}
                >
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <h2 className="mb-4 fw-bold">Your Matches</h2>
            
            <div className="matches-container">
              {matches.length === 0 ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4 text-center">
                    <p className="text-muted mb-0">No matches yet. Keep swiping!</p>
                  </div>
                </div>
              ) : (
                matches.map((match) => {
                  const otherUserId = match.users.find(id => id !== user?.id)
                  const otherProfile = profiles.find(p => p.userId === otherUserId)
                  
                  if (!otherProfile) return null
                  
                  return (
                    <div key={match.id} className="card border-0 shadow-sm mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center">
                          <img src={otherProfile.profilePicture} alt={otherProfile.name} className="rounded-circle me-3" width="60" height="60" />
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fw-bold">{otherProfile.name}, {otherProfile.age}</h5>
                            <p className="text-muted small mb-0">{otherProfile.location}</p>
                          </div>
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate('/messages')}
                          >
                            <i className="fas fa-comment me-1"></i> Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Notification Modal */}
      {showMatchNotification && matchedProfile && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="match-notification-content p-4 text-center">
            <h4>It's a Match!</h4>
            <p>You and {matchedProfile.name} liked each other</p>
            <img src={matchedProfile.profilePicture} alt={matchedProfile.name} className="rounded-circle mb-3" width="80" height="80" />
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-primary btn-sm" onClick={openMessages}>
                Send Message
              </button>
              <button className="btn btn-outline-secondary btn-sm" onClick={closeMatchNotification}>
                Continue Swiping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
