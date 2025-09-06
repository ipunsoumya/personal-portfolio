import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);

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
      }
    };
    
    fetchPersonalInfo();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15, 15, 16, 0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="header-logo cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            PORTFOLIO
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link"
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                  fontSize: '12px',
                  fontWeight: '400',
                  textTransform: 'uppercase',
                  padding: '8px 12px',
                  transition: 'opacity 0.15s ease',
                  letterSpacing: '0.05em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href={personalInfo?.resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--text-primary)'
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left label-small"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 0'
                  }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-4"
              >
                Download Resume
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;