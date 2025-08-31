import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    setIsLoading(true)
    const result = await signup(email, password, fullName)
    
    if (result.success) {
      navigate('/create-profile')
    } else {
      setError(result.message || 'Signup failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <span className="brand-name">Mismatched</span>
                </Link>
                <h2 className="mt-3 mb-1 fw-bold">Create an account</h2>
                <p className="text-muted">Join Mismatched and find your perfect match</p>
              </div>
              
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <div className="form-text">Password must be at least 8 characters long</div>
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="confirmPassword" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="termsCheck" required />
                    <label className="form-check-label" htmlFor="termsCheck">
                      I agree to the <Link to="/terms" className="text-decoration-none">Terms of Service</Link> and <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <span className="text-muted">Already have an account?</span>
                <Link to="/login" className="text-decoration-none"> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
