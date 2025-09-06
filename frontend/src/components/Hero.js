import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [aboutMe, setAboutMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const titles = [
    'Associate Solutions Engineer',
    'Java Developer',
    'AWS Cloud Practitioner', 
    'Streaming Applications Expert',
    'Backend Systems Architect'
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentFullTitle = titles[titleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullTitle.length) {
        setCurrentTitle(currentFullTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentTitle(currentFullTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentFullTitle.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex, titles]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="container">
        <div className="grid-container text-center">
          {/* Main Hero Content */}
          <div className="space-y-8">
            {/* Name/Title */}
            <div>
              <h1 className="hero-title mb-4">
                PORTFOLIO
              </h1>
              <div className="text-big" style={{ minHeight: '120px' }}>
                {currentTitle}
                <span className="inline-block w-1 h-12 ml-2" style={{ 
                  background: 'var(--accent-primary)', 
                  animation: 'blink 1s infinite' 
                }}>
                </span>
              </div>
            </div>

            {/* Brief Description */}
            <div className="max-w-4xl mx-auto">
              <p className="text-body opacity-80">
                {aboutMe.summary}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-accent"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center items-center space-x-6 mt-8">
              <a 
                href={personalInfo.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="label-small hover:opacity-70 transition-opacity"
              >
                LinkedIn
              </a>
              <a 
                href={personalInfo.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="label-small hover:opacity-70 transition-opacity"
              >
                GitHub
              </a>
              <a 
                href={personalInfo.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="label-small hover:opacity-70 transition-opacity"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div 
              className="w-px h-20 relative cursor-pointer"
              onClick={() => scrollToSection('about')}
              style={{ background: 'var(--border-color)' }}
            >
              <div 
                className="absolute w-2 h-2 left-1/2 transform -translate-x-1/2"
                style={{ 
                  background: 'var(--accent-primary)',
                  animation: 'bounce 2s infinite',
                  bottom: '0'
                }}
              />
            </div>
            <p className="label-small mt-4">SCROLL DOWN</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;