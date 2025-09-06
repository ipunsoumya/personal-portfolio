import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// TWEN Design System Styles
const twinStyles = `
  /* TWEN Color System - Dark Theme */
  :root {
    --color-background: #0F0F10;
    --bg-white: #1A1A1B;
    --text-primary: #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --border-color: #FFFFFF;
    --border-light: rgba(255, 255, 255, 0.1);
    --accent-primary: #38FF62;
    --accent-hover: #2AE052;
    --accent-active: #1DC943;
    --accent-foreground: #0F0F10;
    --grid-unit: 47.6px;
  }

  /* Grid Background - Dark Theme */
  .grid-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background);
    background-image: 
      linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
      linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px);
    background-size: 47.6px 47.6px;
    opacity: 0.05;
    pointer-events: none;
    z-index: -1;
  }

  /* Typography - TWEN System */
  .hero-title {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: clamp(60px, 15vw, 280px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0;
  }

  .header-logo {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .title-big {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: clamp(40px, 8vw, 150px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1;
    text-transform: uppercase;
  }

  .text-big {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: clamp(32px, 6vw, 84px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.07;
  }

  .text-regular {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: clamp(16px, 2.5vw, 30px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.2;
  }

  .text-body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: clamp(14px, 1.8vw, 18px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.33;
  }

  .label {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: clamp(10px, 1.5vw, 18px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .label-small {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: clamp(8px, 1.2vw, 12px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.25;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* TWEN Buttons */
  .btn-primary {
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 0;
    padding: 12px 24px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--text-primary);
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    letter-spacing: 0.05em;
  }

  .btn-primary:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .btn-accent {
    background: var(--accent-primary);
    border: none;
    border-radius: 0;
    padding: 12px 24px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--accent-foreground);
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    letter-spacing: 0.05em;
  }

  .btn-accent:hover {
    background: var(--accent-hover);
    transform: scale(1.02);
  }

  /* TWEN Cards */
  .card {
    background: var(--bg-white);
    border: 1px solid var(--border-light);
    border-radius: 0;
    padding: 24px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  /* Layout */
  .grid-container {
    display: grid;
    gap: var(--grid-unit);
    padding: calc(var(--grid-unit) * 2);
    max-width: 1400px;
    margin: 0 auto;
  }

  .container {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 24px;
  }

  body {
    background: var(--color-background);
    color: var(--text-primary);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* Hide Emergent badge that gets injected */
  #emergent-badge {
    display: none !important;
  }

  /* Mobile responsive */
  @media (max-width: 767px) {
    .grid-container {
      padding: calc(var(--grid-unit) * 1);
    }
    
    .container {
      padding: 0 16px;
    }
    
    .btn-primary,
    .btn-accent {
      width: 100%;
      min-height: 52px;
    }
  }
`;

function App() {
  // Inject TWEN styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = twinStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="App">
      <div className="grid-background"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;