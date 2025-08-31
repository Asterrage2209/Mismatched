import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-5">
                <h1 className="text-center fw-bold mb-4">About Mismatched</h1>
                
                <p className="lead mb-4">
                  Mismatched is a modern dating platform that connects people based on shared interests and hobbies. 
                  We believe that meaningful relationships are built on common ground and mutual passions.
                </p>
                
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p className="mb-4">
                  To create a dating experience that goes beyond superficial connections. We help you find people 
                  who share your interests, values, and lifestyle, making it easier to build lasting relationships.
                </p>
                
                <h3 className="fw-bold mb-3">How It Works</h3>
                <div className="row mb-4">
                  <div className="col-md-4 text-center mb-3">
                    <div className="feature-icon-container d-flex align-items-center justify-content-center mx-auto mb-3">
                      <span className="feature-number">1</span>
                    </div>
                    <h5>Create Profile</h5>
                    <p className="small">Tell us about yourself and your interests</p>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="feature-icon-container d-flex align-items-center justify-content-center mx-auto mb-3">
                      <span className="feature-number">2</span>
                    </div>
                    <h5>Find Matches</h5>
                    <p className="small">Discover people with similar hobbies</p>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="feature-icon-container d-flex align-items-center justify-content-center mx-auto mb-3">
                      <span className="feature-number">3</span>
                    </div>
                    <h5>Connect</h5>
                    <p className="small">Start conversations and build relationships</p>
                  </div>
                </div>
                
                <h3 className="fw-bold mb-3">Why Choose Mismatched?</h3>
                <ul className="mb-4">
                  <li><strong>Interest-Based Matching:</strong> Connect with people who share your passions</li>
                  <li><strong>Safe & Secure:</strong> Your privacy and security are our top priorities</li>
                  <li><strong>Quality Over Quantity:</strong> Focus on meaningful connections</li>
                  <li><strong>User-Friendly:</strong> Simple and intuitive interface</li>
                </ul>
                
                <div className="text-center">
                  <Link to="/signup" className="btn btn-primary btn-lg me-3">Get Started</Link>
                  <Link to="/contact" className="btn btn-outline-primary btn-lg">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
