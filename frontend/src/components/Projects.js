import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API}/projects`);
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const categories = ['all', 'Cloud Architecture', 'Developer Tools'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(35, 35, 35, 0.8)' }}
        onClick={onClose}
      >
        <div 
          className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-regular mb-2">{project.title}</h3>
              <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                {project.category}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-2xl leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              ✕
            </button>
          </div>

          {/* Project Image */}
          <div className="mb-6">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="label mb-3">PROJECT OVERVIEW</h4>
            <p className="text-body leading-relaxed mb-4">
              {project.longDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h4 className="label mb-3">KEY FEATURES</h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span 
                    className="w-2 h-2 mt-2 mr-3 flex-shrink-0"
                    style={{ background: 'var(--accent-primary)' }}
                  />
                  <span className="text-body">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="label mb-3">TECHNOLOGIES USED</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="label-small px-3 py-1"
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

          {/* Links */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="grid-container">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="label mb-4">SELECTED WORK</p>
            <h2 className="title-big">PROJECTS</h2>
            <p className="text-body max-w-2xl mx-auto mt-8 opacity-80">
              A showcase of technical projects demonstrating expertise in cloud architecture, 
              system design, and full-stack development.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 transition-all duration-200 ${
                    filter === category 
                      ? 'btn-accent' 
                      : 'btn-primary'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card cursor-pointer group">
                
                {/* Project Image */}
                <div className="mb-6 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-regular">{project.title}</h3>
                      {project.featured && (
                        <span 
                          className="label-small px-2 py-1"
                          style={{ 
                            background: 'var(--accent-primary)',
                            color: 'var(--accent-foreground)'
                          }}
                        >
                          FEATURED
                        </span>
                      )}
                    </div>
                    <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                      {project.category}
                    </span>
                  </div>

                  <p className="text-body opacity-80 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index} 
                        className="label-small px-2 py-1"
                        style={{ 
                          background: 'var(--color-background)',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="label-small opacity-60">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-accent flex-1"
                    >
                      View Details
                    </button>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Projects Note */}
          <div className="text-center mt-16">
            <p className="text-body opacity-60 mb-6">
              More projects and contributions available on GitHub
            </p>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View All Projects
            </a>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;