import React from 'react'
import Navbar from '../components/Navbar'

const Privacy: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-5">
                <h1 className="text-center fw-bold mb-4">Privacy Policy</h1>
                <p className="text-muted text-center mb-5">Last updated: January 2025</p>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">1. Information We Collect</h3>
                  <p>We collect information you provide directly to us, such as when you create an account, complete your profile, or communicate with us. This may include:</p>
                  <ul>
                    <li>Name, email address, and other contact information</li>
                    <li>Profile information including photos, interests, and preferences</li>
                    <li>Messages and communications with other users</li>
                    <li>Usage data and analytics</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Provide and maintain our dating services</li>
                    <li>Match you with other users based on your preferences</li>
                    <li>Facilitate communication between users</li>
                    <li>Improve our services and user experience</li>
                    <li>Send you important updates and notifications</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">3. Information Sharing</h3>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                  <ul>
                    <li>With other users as part of our matching service</li>
                    <li>With service providers who assist us in operating our platform</li>
                    <li>When required by law or to protect our rights and safety</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">4. Data Security</h3>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">5. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of certain communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">6. Cookies and Tracking</h3>
                  <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">7. Children's Privacy</h3>
                  <p>Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">8. Changes to This Policy</h3>
                  <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">9. Contact Us</h3>
                  <p>If you have any questions about this privacy policy, please contact us at:</p>
                  <p className="mb-1">Email: privacy@mismatched.com</p>
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

export default Privacy
