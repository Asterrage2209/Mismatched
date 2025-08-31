import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Login failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-6 col-lg-5">
          <div className="card">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <span className="brand-name">Mismatched</span>
                </Link>
                <h2 className="mt-3 mb-1 fw-bold">Welcome back</h2>
                <p className="text-muted">Enter your credentials to access your account</p>
              </div>
              
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              
              <form onSubmit={handleSubmit}>
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
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password" className="form-label">Password</label>
                    <a href="#" className="text-decoration-none small">Forgot password?</a>
                  </div>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <span className="text-muted">Don't have an account?</span>
                <Link to="/signup" className="text-decoration-none"> Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
