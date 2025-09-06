import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mock contact info for now (can be moved to API later)
  const contactInfo = {
    email: "contact@example.com",
    phone: "+91-XXXXX-XXXXX",
    location: "Pune, India",
    availability: "Open to new opportunities",
    responseTime: "Usually responds within 24 hours"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch personal info from API
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await axios.get(`${API}/personal-info`);
        if (response.data.success) {
          setPersonalInfo(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonalInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactMethods = [
    {
      type: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: '✉️'
    },
    {
      type: 'Phone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      icon: '📞'
    },
    {
      type: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: personalInfo.socialLinks.linkedin,
      icon: '💼'
    },
    {
      type: 'GitHub',
      value: 'View Code',
      href: personalInfo.socialLinks.github,
      icon: '💻'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="grid-container">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="label mb-4">GET IN TOUCH</p>
            <h2 className="title-big">CONTACT</h2>
            <p className="text-body max-w-2xl mx-auto mt-8 opacity-80">
              Interested in discussing opportunities, collaborations, or just want to connect? 
              I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Contact Methods */}
              <div>
                <h3 className="label mb-6">CONTACT INFORMATION</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      target={method.type === 'LinkedIn' || method.type === 'GitHub' ? '_blank' : undefined}
                      rel={method.type === 'LinkedIn' || method.type === 'GitHub' ? 'noopener noreferrer' : undefined}
                      className="card flex items-center space-x-4 hover:transform hover:scale-[1.02] transition-all duration-200"
                    >
                      <div 
                        className="w-12 h-12 flex items-center justify-center text-xl"
                        style={{ background: 'var(--accent-primary)' }}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <div className="label-small opacity-60">{method.type}</div>
                        <div className="text-body">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="card">
                <h4 className="label mb-4">AVAILABILITY</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ background: 'var(--accent-primary)' }}
                    />
                    <span className="text-body">{contactInfo.availability}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: 'var(--border-color)' }} />
                    <span className="text-body opacity-60">{contactInfo.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: 'var(--border-color)' }} />
                    <span className="text-body opacity-60">Based in {contactInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card">
                <h4 className="label mb-4">QUICK LINKS</h4>
                <div className="space-y-3">
                  <a
                    href={personalInfo?.resumeUrl || '/resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-body hover:opacity-70 transition-opacity"
                  >
                    → Download Resume
                  </a>
                  <button
                    onClick={() => {
                      const element = document.getElementById('projects');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-body hover:opacity-70 transition-opacity text-left"
                  >
                    → View Projects
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('skills');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-body hover:opacity-70 transition-opacity text-left"
                  >
                    → Technical Skills
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="label mb-6">SEND A MESSAGE</h3>
              <form onSubmit={handleSubmit} className="card space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-small block mb-2">NAME *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-0 bg-transparent text-body"
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        outline: 'none'
                      }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="label-small block mb-2">EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-0 bg-transparent text-body"
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        outline: 'none'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Company & Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-small block mb-2">COMPANY</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-3 border-0 bg-transparent text-body"
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        outline: 'none'
                      }}
                      placeholder="Your company (optional)"
                    />
                  </div>
                  <div>
                    <label className="label-small block mb-2">SUBJECT *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-0 bg-transparent text-body"
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        outline: 'none'
                      }}
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="label-small block mb-2">MESSAGE *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full p-3 border-0 bg-transparent text-body resize-none"
                    style={{ 
                      borderBottom: '1px solid var(--border-color)',
                      outline: 'none'
                    }}
                    placeholder="Tell me about your project, opportunity, or how I can help..."
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div className={`p-3 text-center ${
                    submitStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
                  }`} style={{
                    background: submitStatus === 'success' 
                      ? 'rgba(56, 255, 98, 0.1)' 
                      : 'rgba(255, 56, 56, 0.1)',
                    border: `1px solid ${submitStatus === 'success' ? 'var(--accent-primary)' : '#FF3838'}`
                  }}>
                    <span className="text-body">
                      {submitStatus === 'success' 
                        ? '✓ Message sent successfully! I\'ll get back to you soon.' 
                        : '✗ Failed to send message. Please try again or email directly.'}
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'btn-primary' : 'btn-accent'} transition-all duration-200`}
                  style={{ opacity: isSubmitting ? 0.6 : 1 }}
                >
                  {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;