import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  // Don't show navbar on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-name">Mismatched</span>
        </Link>
        
        {user ? (
          <div className="d-flex">
            <Link to="/dashboard" className="btn btn-link text-decoration-none position-relative me-2">
              <i className="fas fa-heart fs-5 text-white"></i>
            </Link>
            <Link to="/messages" className="btn btn-link text-decoration-none position-relative me-2">
              <i className="fas fa-comment fs-5 text-white"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-primary">
                0
              </span>
            </Link>
            <Link to="/profile" className="btn btn-link text-decoration-none me-3">
              <i className="fas fa-user fs-5 text-white"></i>
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <Link className="nav-link btn btn-primary text-black px-4 me-2" to="/login">
              Login
            </Link>
            <Link className="nav-link btn btn-primary text-black px-4" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
