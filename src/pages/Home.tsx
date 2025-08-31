import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Find Your Perfect Match Based on Shared Interests</h1>
              <p className="lead mb-4">Connect with people who share your passions and hobbies. Mismatched makes it easy to find meaningful connections.</p>
              <div className="d-flex gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
                <a href="#how-it-works" className="btn btn-primary btn-lg">How It Works</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-container">
                <div className="hero-image-bg"></div>
                <div className="hero-image">
                  <img src="https://placehold.co/600x800" alt="Dating app interface preview" className="img-fluid rounded-4 shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">How Mismatched Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon-container mb-3 d-flex align-items-center justify-content-center mx-auto">
                    <span className="feature-number">1</span>
                  </div>
                  <h3 className="card-title h5 fw-bold">Create Your Profile</h3>
                  <p className="card-text">Sign up and tell us about your interests and hobbies.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon-container mb-3 d-flex align-items-center justify-content-center mx-auto">
                    <span className="feature-number">2</span>
                  </div>
                  <h3 className="card-title h5 fw-bold">Find Matches</h3>
                  <p className="card-text">We'll suggest people with similar interests and hobbies.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon-container mb-3 d-flex align-items-center justify-content-center mx-auto">
                    <span className="feature-number">3</span>
                  </div>
                  <h3 className="card-title h5 fw-bold">Connect & Chat</h3>
                  <p className="card-text">Swipe right on profiles you like and start chatting when you match.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Success Stories</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img src="https://placehold.co/100" alt="User" className="rounded-circle me-3" width="60" />
                    <div>
                      <h5 className="mb-0">Sarah & Mike</h5>
                      <small className="text-muted">Matched 8 months ago</small>
                    </div>
                  </div>
                  <p className="card-text">"We both loved hiking and photography. After matching on Mismatched, we went on a hiking date and have been inseparable since!"</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img src="https://placehold.co/100" alt="User" className="rounded-circle me-3" width="60" />
                    <div>
                      <h5 className="mb-0">David & Lisa</h5>
                      <small className="text-muted">Matched 1 year ago</small>
                    </div>
                  </div>
                  <p className="card-text">"Our shared love for cooking brought us together. Now we host dinner parties for our friends and couldn't be happier!"</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img src="https://placehold.co/100" alt="User" className="rounded-circle me-3" width="60" />
                    <div>
                      <h5 className="mb-0">Jamie & Alex</h5>
                      <small className="text-muted">Matched 6 months ago</small>
                    </div>
                  </div>
                  <p className="card-text">"We both swiped right because of our mutual interest in music. Our first date was at a concert, and we've been in harmony ever since!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <span className="brand-name">Mismatched</span>
              <p className="text-muted mt-2">Find your perfect match today.</p>
            </div>
            <div className="col-md-6">
              <ul className="list-inline text-md-end mb-0">
                <li className="list-inline-item"><Link to="/about" className="text-decoration-none text-muted">About</Link></li>
                <li className="list-inline-item ms-3"><Link to="/privacy" className="text-decoration-none text-muted">Privacy</Link></li>
                <li className="list-inline-item ms-3"><Link to="/terms" className="text-decoration-none text-muted">Terms</Link></li>
                <li className="list-inline-item ms-3"><Link to="/contact" className="text-decoration-none text-muted">Contact</Link></li>
              </ul>
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-center text-muted mb-0">&copy; 2025 Mismatched. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Home
