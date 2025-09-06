import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API}/skills`);
        if (response.data.success) {
          setSkills(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  const SkillBar = ({ skill }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-body">{skill.name}</span>
          {skill.status && (
            <span className="label-small ml-2 px-2 py-1" style={{ 
              background: 'var(--accent-primary)', 
              color: 'var(--accent-foreground)' 
            }}>
              {skill.status}
            </span>
          )}
        </div>
        <span className="label-small">{skill.years}Y</span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div 
          className="h-1 w-full"
          style={{ background: 'var(--border-light)' }}
        />
        <div 
          className="h-1 absolute top-0 left-0 transition-all duration-1000"
          style={{ 
            background: 'var(--accent-primary)',
            width: `${skill.proficiency}%`
          }}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container">
          <div className="grid-container text-center">
            <div className="title-big">LOADING SKILLS...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20">
      <div className="container">
        <div className="grid-container">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="label mb-4">WHAT I DO</p>
            <h2 className="title-big">SKILLS & EXPERTISE</h2>
            <p className="text-body max-w-2xl mx-auto mt-8 opacity-80">
              Specialized in building high-performance streaming applications and scalable backend systems 
              with expertise across the full technology stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {skills.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`w-full text-left p-4 transition-all duration-200 ${
                      activeCategory === index 
                        ? 'card' 
                        : 'hover:bg-white hover:bg-opacity-50'
                    }`}
                    style={{
                      background: activeCategory === index ? 'var(--bg-white)' : 'transparent',
                      border: activeCategory === index ? '1px solid var(--border-light)' : 'none'
                    }}
                  >
                    <div className="label-small mb-1">{category.category}</div>
                    <div className="text-body opacity-60">{category.items.length} Skills</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Display */}
            <div className="lg:col-span-3">
              <div className="card">
                <h3 className="label mb-8">{skills[activeCategory]?.category || 'Skills'}</h3>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                  {skills[activeCategory]?.items?.map((skill, index) => (
                    <SkillBar key={index} skill={skill} />
                  )) || <div>No skills found</div>}
                </div>

                {/* Category Summary */}
                <div className="mt-8 pt-8 flex justify-between items-center" style={{ borderTop: '1px solid var(--border-light)' }}>
                  <div className="text-center">
                    <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                      {skills[activeCategory]?.items?.length || 0}
                    </div>
                    <div className="label-small mt-1">TECHNOLOGIES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-regular" style={{ color: 'var(--accent-primary)' }}>
                      {skills[activeCategory]?.items?.length ? 
                        Math.round(skills[activeCategory].items.reduce((acc, skill) => acc + skill.years, 0) / skills[activeCategory].items.length * 10) / 10 : 0}
                    </div>
                    <div className="label-small mt-1">AVG EXPERIENCE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Focus Areas */}
          <div className="mt-16">
            <h3 className="label text-center mb-8">TECHNOLOGY FOCUS AREAS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="card text-center">
                <div className="w-12 h-12 mx-auto mb-4" style={{ background: 'var(--accent-primary)' }}>
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                </div>
                <h4 className="label mb-3">HIGH-PERFORMANCE SYSTEMS</h4>
                <p className="text-body opacity-80">
                  Streaming applications processing 400K+ records with Kafka, Spark, and real-time data pipelines.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 mx-auto mb-4" style={{ background: 'var(--accent-primary)' }}>
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    ☁️
                  </div>
                </div>
                <h4 className="label mb-3">CLOUD ARCHITECTURE</h4>
                <p className="text-body opacity-80">
                  AWS certified with expertise in scalable microservices, serverless, and cloud-native solutions.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 mx-auto mb-4" style={{ background: 'var(--accent-primary)' }}>
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    🔒
                  </div>
                </div>
                <h4 className="label mb-3">COMPLIANCE SYSTEMS</h4>
                <p className="text-body opacity-80">
                  Financial compliance reporting, secure data handling, and regulatory requirement implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;