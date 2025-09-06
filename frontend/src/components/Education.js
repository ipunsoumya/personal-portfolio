import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Education = () => {
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch education and certifications from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [educationResponse, certificationsResponse] = await Promise.all([
          axios.get(`${API}/education`),
          axios.get(`${API}/certifications`)
        ]);
        
        if (educationResponse.data.success) {
          setEducation(educationResponse.data.data);
        }
        
        if (certificationsResponse.data.success) {
          setCertifications(certificationsResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching education data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="education" className="py-20">
        <div className="container">
          <div className="grid-container text-center">
            <div className="title-big">LOADING EDUCATION...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20">
      <div className="container">
        <div className="grid-container">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="label mb-4">BACKGROUND</p>
            <h2 className="title-big">EDUCATION & CERTIFICATIONS</h2>
            <p className="text-body max-w-2xl mx-auto mt-8 opacity-80">
              Strong academic foundation in engineering with continuous learning 
              and professional certifications in cloud technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Education */}
            <div>
              <h3 className="label mb-8">EDUCATION</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="card">
                    <div className="mb-4">
                      <h4 className="text-regular mb-2">{edu.degree}</h4>
                      <div className="flex flex-col space-y-1">
                        <span className="label" style={{ color: 'var(--accent-primary)' }}>
                          {edu.institution}
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="label-small opacity-60">{edu.location}</span>
                          <span className="label-small opacity-60">{edu.startDate} - {edu.endDate}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-body mb-4 opacity-80">
                      {edu.description}
                    </p>

                    {edu.relevantCourses && (
                      <div>
                        <span className="label-small mb-2 block">RELEVANT COURSEWORK</span>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantCourses.map((course, index) => (
                            <span 
                              key={index} 
                              className="label-small px-2 py-1"
                              style={{ 
                                background: 'var(--color-background)',
                                border: '1px solid var(--border-light)'
                              }}
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="label mb-8">CERTIFICATIONS</h3>
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="card">
                    
                    {/* Certificate Badge & Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div 
                        className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden"
                        style={{ border: '2px solid var(--accent-primary)' }}
                      >
                        <img 
                          src={cert.badgeUrl} 
                          alt={cert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-regular mb-1">{cert.name}</h4>
                        <span className="label" style={{ color: 'var(--accent-primary)' }}>
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <p className="text-body mb-4 opacity-80">
                      {cert.description}
                    </p>

                    {/* Certificate Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="label-small">ISSUED</span>
                        <span className="label-small opacity-60">{cert.issueDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="label-small">EXPIRES</span>
                        <span className="label-small opacity-60">{cert.expiryDate}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="flex justify-between items-center">
                          <span className="label-small">CREDENTIAL ID</span>
                          <span className="label-small opacity-60 font-mono">{cert.credentialId}</span>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                      <span 
                        className="label-small px-3 py-1"
                        style={{ 
                          background: 'var(--accent-primary)',
                          color: 'var(--accent-foreground)'
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learning Path */}
              <div className="card mt-6">
                <h4 className="label mb-4">CONTINUOUS LEARNING</h4>
                <p className="text-body mb-4 opacity-80">
                  Currently expanding knowledge in frontend technologies and advanced AWS services.
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-body">Angular</span>
                    <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                      IN PROGRESS
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">React</span>
                    <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                      IN PROGRESS
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">Python 3</span>
                    <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                      LEARNING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Achievement Summary */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  2020
                </div>
                <div className="label-small mt-2">GRADUATION YEAR</div>
                <div className="text-body mt-2 opacity-60">
                  Mechanical Engineering
                </div>
              </div>
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  2
                </div>
                <div className="label-small mt-2">AWS CERTIFICATIONS</div>
                <div className="text-body mt-2 opacity-60">
                  Cloud & AI Practitioner
                </div>
              </div>
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  2024
                </div>
                <div className="label-small mt-2">LATEST CERTIFICATION</div>
                <div className="text-body mt-2 opacity-60">
                  AWS AI Practitioner
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;