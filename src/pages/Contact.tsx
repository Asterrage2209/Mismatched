import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log('Contact form submitted:', formData)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Navbar />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-5">
                <h1 className="text-center fw-bold mb-4">Contact Us</h1>
                
                <p className="lead text-center mb-5">
                  Have questions or need help? We're here to assist you. 
                  Send us a message and we'll get back to you as soon as possible.
                </p>
                
                {isSubmitted ? (
                  <div className="alert alert-success text-center">
                    <h4>Thank you for your message!</h4>
                    <p>We'll get back to you as soon as possible.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="safety">Safety Concern</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
                
                <hr className="my-5" />
                
                <div className="row text-center">
                  <div className="col-md-4 mb-4">
                    <div className="feature-icon-container d-flex align-items-center justify-content-center mx-auto mb-3">
                      <i className="fas fa-envelope text-primary" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <h5>Email Us</h5>
                    <p className="text-muted">support@mismatched.com</p>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="feature-icon-container d-flex align-items-center justify-content-center mx-auto mb-3">
                      <i className="fas fa-clock text-primary" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <h5>Response Time</h5>
                    <p className="text-muted">Within 24 hours</p>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="feature-icon-container d-flex align-items-center justify-content-center mx-auto mb-3">
                      <i className="fas fa-headset text-primary" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <h5>Live Support</h5>
                    <p className="text-muted">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
