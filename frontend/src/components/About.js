import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const About = () => {
  const [aboutMe, setAboutMe] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, personalResponse] = await Promise.all([
          axios.get(`${API}/about`),
          axios.get(`${API}/personal-info`)
        ]);
        
        if (aboutResponse.data.success) {
          setAboutMe(aboutResponse.data.data);
        }
        
        if (personalResponse.data.success) {
          setPersonalInfo(personalResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20">
        <div className="container">
          <div className="grid-container text-center">
            <div className="title-big">LOADING ABOUT...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="grid-container">
          
          {/* Section Label */}
          <div className="text-center mb-16">
            <p className="label mb-4">WHO I AM</p>
            <h2 className="title-big">ABOUT ME</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Professional Summary */}
            <div className="space-y-8">
              <div>
                <h3 className="text-regular mb-6">
                  Professional Journey
                </h3>
                <p className="text-body leading-relaxed mb-6">
                  {aboutMe?.summary || 'Loading...'}
                </p>
                <p className="text-body leading-relaxed">
                  Currently based in {personalInfo?.location || 'India'}, I'm passionate about building 
                  scalable solutions that handle real-world complexity. My experience spans 
                  from high-frequency trading systems to compliance platforms, always focusing 
                  on performance, reliability, and clean architecture.
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="label mb-4">KEY ACHIEVEMENTS</h4>
                <ul className="space-y-3">
                  {aboutMe?.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span 
                        className="w-2 h-2 mt-2 mr-3 flex-shrink-0"
                        style={{ background: 'var(--accent-primary)' }}
                      />
                      <span className="text-body">{highlight}</span>
                    </li>
                  )) || <li>Loading achievements...</li>}
                </ul>
              </div>
            </div>

            {/* Personal Interests & Skills Overview */}
            <div className="space-y-8">
              
              {/* Personal Interests */}
              <div className="card">
                <h4 className="label mb-4">PERSONAL INTERESTS</h4>
                <div className="space-y-3">
                  {aboutMe?.personalInterests?.map((interest, index) => (
                    <div key={index} className="flex items-center">
                      <span 
                        className="w-1 h-6 mr-3"
                        style={{ background: 'var(--accent-primary)' }}
                      />
                      <span className="text-body">{interest}</span>
                    </div>
                  )) || <div>Loading interests...</div>}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center">
                  <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                    4+
                  </div>
                  <div className="label-small mt-2">
                    YEARS EXPERIENCE
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                    2+
                  </div>
                  <div className="label-small mt-2">
                    MAJOR PROJECTS
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                    600K+
                  </div>
                  <div className="label-small mt-2">
                    RECORDS/15MIN
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                    2
                  </div>
                  <div className="label-small mt-2">
                    AWS CERTS
                  </div>
                </div>
              </div>

              {/* Language Proficiency */}
              <div className="card">
                <h4 className="label mb-4">LANGUAGES</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-body">English</span>
                    <span className="label-small">ADVANCED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">Hindi</span>
                    <span className="label-small">ADVANCED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">Odia</span>
                    <span className="label-small">ADVANCED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-body mb-8">
              Interested in working together or learning more about my experience?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={personalInfo?.resumeUrl || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Download Resume
              </a>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;