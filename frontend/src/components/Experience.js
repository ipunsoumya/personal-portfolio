import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch experience from API
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`${API}/experience`);
        if (response.data.success) {
          setExperience(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperience();
  }, []);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="container">
          <div className="grid-container text-center">
            <div className="title-big">LOADING EXPERIENCE...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20">
      <div className="container">
        <div className="grid-container">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="label mb-4">CAREER PATH</p>
            <h2 className="title-big">EXPERIENCE</h2>
            <p className="text-body max-w-2xl mx-auto mt-8 opacity-80">
              4+ years of professional experience in building scalable backend systems, 
              high-performance applications, and cloud-native solutions.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-px h-full"
              style={{ background: 'var(--border-color)' }}
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  
                  {/* Timeline Dot */}
                  <div 
                    className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-4 flex items-center justify-center ${
                      exp.current ? 'pulse' : ''
                    }`}
                    style={{ 
                      background: exp.current ? 'var(--accent-primary)' : 'var(--bg-white)',
                      borderColor: 'var(--border-color)'
                    }}
                  >
                    {exp.current && (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-foreground)' }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'
                  }`}>
                    <div className={`card ${index % 2 === 1 ? 'md:ml-8' : 'md:mr-8'}`}>
                      
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-regular mb-1">{exp.position}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                            <span className="label" style={{ color: 'var(--accent-primary)' }}>
                              {exp.company}
                            </span>
                            {exp.department && (
                              <>
                                <span className="hidden sm:inline opacity-60">•</span>
                                <span className="label-small opacity-60">{exp.department}</span>
                              </>
                            )}
                          </div>
                        </div>
                        {exp.current && (
                          <span 
                            className="label-small px-2 py-1"
                            style={{ 
                              background: 'var(--accent-primary)',
                              color: 'var(--accent-foreground)'
                            }}
                          >
                            CURRENT
                          </span>
                        )}
                      </div>

                      {/* Duration & Location */}
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-4 opacity-80">
                        <span className="label-small">{exp.startDate} - {exp.endDate}</span>
                        <div className="flex items-center space-x-4">
                          <span className="label-small">{exp.duration}</span>
                          <span className="label-small">{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-body mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements - Collapsed/Expanded */}
                      <div>
                        <button
                          onClick={() => toggleExpanded(exp.id)}
                          className="flex items-center justify-between w-full text-left mb-3"
                        >
                          <span className="label">KEY ACHIEVEMENTS</span>
                          <span className="text-xl transform transition-transform duration-200" style={{
                            transform: expandedId === exp.id ? 'rotate(45deg)' : 'rotate(0deg)'
                          }}>
                            +
                          </span>
                        </button>

                        {expandedId === exp.id && (
                          <div className="space-y-3 animate-fadeIn">
                            {exp.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-start">
                                <span 
                                  className="w-2 h-2 mt-2 mr-3 flex-shrink-0"
                                  style={{ background: 'var(--accent-primary)' }}
                                />
                                <span className="text-body">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="label-small px-2 py-1"
                              style={{ 
                                background: 'var(--color-background)',
                                border: '1px solid var(--border-light)'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Summary */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  4+
                </div>
                <div className="label-small mt-2">YEARS EXPERIENCE</div>
              </div>
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  3
                </div>
                <div className="label-small mt-2">COMPANIES</div>
              </div>
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  600K+
                </div>
                <div className="label-small mt-2">RECORDS PROCESSED</div>
              </div>
              <div className="card text-center">
                <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                  5K+
                </div>
                <div className="label-small mt-2">CONCURRENT USERS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 var(--accent-primary);
          }
          70% {
            box-shadow: 0 0 0 10px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Experience;