import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: personalInfo.socialLinks.linkedin },
    { name: 'GitHub', url: personalInfo.socialLinks.github },
    { name: 'Twitter', url: personalInfo.socialLinks.twitter }
  ];

  return (
    <footer className="py-20" style={{ background: 'var(--text-primary)' }}>
      <div className="container">
        <div className="grid-container">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand & Description */}
            <div className="md:col-span-2">
              <div 
                className="header-logo mb-4 cursor-pointer"
                style={{ color: 'var(--bg-white)' }}
                onClick={scrollToTop}
              >
                PORTFOLIO
              </div>
              <p className="text-body mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Associate Solutions Engineer specializing in high-throughput streaming applications, 
                cloud architecture, and scalable backend systems.
              </p>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'var(--accent-primary)' }}
                />
                <span className="text-body" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {contactInfo.availability}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="label mb-4" style={{ color: 'var(--bg-white)' }}>
                NAVIGATION
              </h4>
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-left text-body hover:opacity-70 transition-opacity"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="label mb-4" style={{ color: 'var(--bg-white)' }}>
                CONTACT
              </h4>
              <div className="space-y-3">
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="block text-body hover:opacity-70 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {contactInfo.email}
                </a>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="block text-body hover:opacity-70 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {contactInfo.phone}
                </a>
                <span className="block text-body" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {contactInfo.location}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Resume */}
          <div className="flex flex-col sm:flex-row justify-between items-center py-8" style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)' 
          }}>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-small hover:opacity-70 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Resume Download */}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              Download Resume
            </a>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8" style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)' 
          }}>
            
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
              <span className="label-small" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                © {currentYear} PORTFOLIO. ALL RIGHTS RESERVED.
              </span>
              <span className="label-small" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                BUILT WITH REACT & FASTAPI
              </span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
              style={{ 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <span className="label-small">BACK TO TOP</span>
              <span className="text-xl">↑</span>
            </button>
          </div>

          {/* Achievement Footer Badge */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 px-6 py-3" style={{
              background: 'rgba(56, 255, 98, 0.1)',
              border: '1px solid var(--accent-primary)'
            }}>
              <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                ⚡ PROCESSING 600K+ RECORDS IN 15 MINUTES
              </span>
              <span className="w-1 h-4" style={{ background: 'var(--accent-primary)' }} />
              <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                ☁️ AWS CERTIFIED CLOUD PRACTITIONER
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;