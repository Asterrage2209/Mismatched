import React from 'react'
import Navbar from '../components/Navbar'

const Terms: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-5">
                <h1 className="text-center fw-bold mb-4">Terms of Service</h1>
                <p className="text-muted text-center mb-5">Last updated: January 2025</p>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">1. Acceptance of Terms</h3>
                  <p>By accessing and using Mismatched, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">2. Description of Service</h3>
                  <p>Mismatched is a dating platform that connects individuals based on shared interests and hobbies. Our service includes profile creation, matching algorithms, messaging features, and other related services.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">3. User Eligibility</h3>
                  <p>To use our service, you must:</p>
                  <ul>
                    <li>Be at least 18 years old</li>
                    <li>Have the legal capacity to enter into agreements</li>
                    <li>Provide accurate and truthful information</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">4. User Conduct</h3>
                  <p>You agree not to:</p>
                  <ul>
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Post inappropriate, offensive, or explicit content</li>
                    <li>Impersonate another person or entity</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use automated tools to interact with the service</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">5. Privacy and Data</h3>
                  <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your information.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">6. Intellectual Property</h3>
                  <p>The service and its original content, features, and functionality are and will remain the exclusive property of Mismatched and its licensors. The service is protected by copyright, trademark, and other laws.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">7. Termination</h3>
                  <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">8. Limitation of Liability</h3>
                  <p>In no event shall Mismatched, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">9. Disclaimers</h3>
                  <p>The service is provided on an "AS IS" and "AS AVAILABLE" basis. Mismatched makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">10. Governing Law</h3>
                  <p>These Terms shall be interpreted and governed by the laws of the jurisdiction in which Mismatched operates, without regard to its conflict of law provisions.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">11. Changes to Terms</h3>
                  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">12. Contact Information</h3>
                  <p>If you have any questions about these Terms of Service, please contact us at:</p>
                  <p className="mb-1">Email: legal@mismatched.com</p>
                  <p className="mb-1">Address: 123 Dating Street, Love City, LC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Terms
