import React, { useState } from 'react';
import './App.css';

const QUICK_PROMPTS = [
  { label: 'Client Proposal Follow-up', text: 'Follow up with the client regarding our Q3 marketing automation proposal and offer to schedule a brief walk-through.' },
  { label: 'Sprint Milestone Update', text: 'Draft an engineering update announcing the completion of milestone 2 with key release highlights.' },
  { label: 'Executive Meeting Request', text: 'Request a 30-minute sync with executive stakeholders to align on strategic roadmaps for next quarter.' },
  { label: 'Customer Feedback Outreach', text: 'Ask high-value customers for brief feedback on our new reporting features and offer a customer spotlight.' },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Client Directive Input',
    tag: 'React 18 + Vite',
    description: 'The user inputs the prompt directive, desired tone profile (e.g. Executive, Friendly), and length scope. The frontend validates the input before initiating a REST call.'
  },
  {
    step: '02',
    title: 'API Gateway & Validation',
    tag: 'Spring Boot 3 REST',
    description: 'Spring Boot receives the POST request on /api/email/generate, verifies constraints, and crafts a structured instruction prompt engineered for zero hallucination.'
  },
  {
    step: '03',
    title: 'Non-Blocking LLM Call',
    tag: 'Gemini 3.5 Flash + WebClient',
    description: 'Spring WebClient fires an asynchronous, non-blocking HTTP request to Google Gemini 3.5 Flash (v1beta), leveraging sub-second inference speed and high contextual coherence.'
  },
  {
    step: '04',
    title: 'Defensive Extraction & Render',
    tag: 'Jackson JSON + React',
    description: 'The JSON candidates envelope is defensively parsed. The sanitized, high-readability email is returned and instantly rendered with one-click clipboard copying.'
  }
];

const TECH_STACK = [
  {
    name: 'Google Gemini 3.5 Flash',
    role: 'AI Model Engine',
    rationale: 'Provides ultra-low latency, multimodal capability, and high instruction adherence for professional emails without conversational bloat.',
    highlight: 'Configured in application.properties'
  },
  {
    name: 'Java 17 & Spring Boot 3',
    role: 'Backend Framework',
    rationale: 'Industry-standard enterprise backend offering rock-solid dependency injection, clean modular separation of concerns, and native health monitoring.',
    highlight: 'Controller, Service & DTO architecture'
  },
  {
    name: 'Spring WebFlux (WebClient)',
    role: 'Reactive HTTP Client',
    rationale: 'Modern non-blocking alternative to deprecated RestTemplate. Efficiently manages thread pools during asynchronous upstream AI calls.',
    highlight: 'Non-blocking I/O execution'
  },
  {
    name: 'React 18 & Vite',
    role: 'Frontend Client',
    rationale: 'Delivers instantaneous Hot Module Replacement (HMR), optimized production bundle size (48kB gzip), and responsive declarative state management.',
    highlight: 'Built in 700ms with Vite'
  },
  {
    name: 'Mailmodo Bright SaaS UI',
    role: 'Design System',
    rationale: 'Airy editorial spacing, accessible contrast, vivid #5A45FE indigo accent, and crisp Inter typography tailored for SaaS conversion and trust.',
    highlight: 'Based on design.md system tokens'
  },
  {
    name: 'Playwright E2E',
    role: 'Automated Testing',
    rationale: 'Simulates real browser workflows and UI assertions in CI/CD pipelines to guarantee zero visual or functional regressions on every commit.',
    highlight: 'Tested via GitHub Actions'
  },
  {
    name: 'Prometheus & Grafana',
    role: 'Monitoring & Metrics',
    rationale: 'Spring Boot Actuator exposes JVM metrics, HTTP latency, and system health at /actuator/prometheus for real-time observability.',
    highlight: 'Live scraping configuration'
  },
  {
    name: 'Docker & Kubernetes',
    role: 'Container & Orchestration',
    rationale: 'Multi-stage container builds minimize image size; Kubernetes manifests configure replica sets, ClusterIP, NodePort, and secure secret injection.',
    highlight: 'Ready for local & cloud clusters'
  },
  {
    name: 'Terraform (IaC)',
    role: 'Infrastructure as Code',
    rationale: 'Declarative HCL scripts define cloud infrastructure, networks, and containers, making staging and production environments 100% reproducible.',
    highlight: 'Modular IaC manifests'
  }
];

const DEVOPS_PHASES = [
  {
    phase: 'Phase 1: CI/CD Pipeline',
    title: 'Automated Build & Validation',
    description: 'GitHub Actions workflow triggers on push/PR: builds Java backend with Maven, bundles React frontend with Vite, and spins up test containers.'
  },
  {
    phase: 'Phase 2: Automated Testing',
    title: 'End-to-End Browser Workflows',
    description: 'Playwright test suite boots the application and validates title elements, prompt textarea visibility, and button triggers to guarantee reliability.'
  },
  {
    phase: 'Phase 3: Observability Stack',
    title: 'Prometheus & Grafana Dashboards',
    description: 'Actuator exposes /actuator/prometheus metrics scraped every 15s by Prometheus, visualizing request rates, response times, and memory health.'
  },
  {
    phase: 'Phase 4: Cloud Infrastructure (IaC)',
    title: 'Terraform Resource Management',
    description: 'Provisions Docker networks, application containers, and cloud resources with reproducible configurations avoiding manual drift.'
  },
  {
    phase: 'Phase 5: High-Availability Orchestration',
    title: 'Kubernetes Multi-Replica Deployments',
    description: 'Dual-replica backend and frontend deployments with ClusterIP and NodePort routing, ensuring zero-downtime rolling updates.'
  }
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('workflow'); // 'workflow' | 'tech' | 'devops'

  // Dynamic API Base URL: Defaults to localhost during local dev, and Render backend in production.
  // Strips any trailing slash to prevent double-slash concatenation errors like '//api/email/generate'.
  const rawBaseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:8080'
      : 'https://ai-email-writer-backend-2oor.onrender.com');
  const API_BASE_URL = String(rawBaseUrl).replace(/\/+$/, '');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please provide directives or context for the email.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedEmail('');
    setCopied(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/email/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim(), tone, length }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || `Server error (${response.status})`);
      }

      const data = await response.text();
      setGeneratedEmail(data);
    } catch (err) {
      setError(err.message || 'Connection error. Please verify backend service status.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedEmail) return;
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectQuickPrompt = (quickText) => {
    setPrompt(quickText);
    setError('');
  };

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <header className="navbar">
        <a href="#writer" className="nav-brand">
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <span>Mailmodo AI</span>
        </a>

        <nav className="nav-links">
          <a href="#writer" className="nav-link">Email Generator</a>
          <a href="#about" className="nav-link">About Project</a>
          <a href="#about" onClick={() => setActiveTab('workflow')} className="nav-link">How It Works</a>
          <a href="#about" onClick={() => setActiveTab('tech')} className="nav-link">Why We Used What</a>
          <a href="#about" onClick={() => setActiveTab('devops')} className="nav-link">DevOps Pipeline</a>
        </nav>

        <div className="nav-actions">
          <div className="chip chip-highlight">
            <span className="chip-dot"></span>
            <span>Gemini 3.5 Flash</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-container">
        {/* Hero Section */}
        <section id="writer" className="hero-section">
          <div className="chip">
            <span>✨ Full-Stack Capstone Project • Production Ready</span>
          </div>
          <h1 className="hero-title">AI Email Writer</h1>
          <p className="hero-subtitle">
            Generate high-converting, polished marketing & executive emails in seconds. Built with React, Spring Boot, and Google Gemini 3.5 Flash.
          </p>

          {/* Quick Prompts */}
          <div className="quick-prompts-container">
            <span className="quick-prompts-label">Try a prompt template:</span>
            <div className="quick-prompts-list">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="chip interactive"
                  onClick={() => handleSelectQuickPrompt(qp.text)}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Workspace Layout */}
        <div className="workspace-grid">
          {/* Directive Input Panel */}
          <section className="card input-card">
            <div className="card-header">
              <span className="card-title">Compose Directive</span>
              {prompt && (
                <button
                  type="button"
                  className="tertiary-btn"
                  onClick={() => setPrompt('')}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="prompt" className="field-label">
                Communication Context & Requirements
              </label>
              <textarea
                id="prompt"
                rows="6"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Reach out to marketing partners proposing a co-webinar on high-conversion email workflows next month. Mention 15k attendee base..."
              />
            </div>

            <div className="parameters-row">
              <div className="field-group">
                <label htmlFor="tone" className="field-label">Tone Profile</label>
                <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="Professional">Professional</option>
                  <option value="Executive">Executive</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Direct & Concise">Direct & Concise</option>
                  <option value="Diplomatic">Diplomatic</option>
                  <option value="Persuasive">Persuasive</option>
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="length" className="field-label">Length</label>
                <select id="length" value={length} onChange={(e) => setLength(e.target.value)}>
                  <option value="Short">Short (Brief)</option>
                  <option value="Medium">Standard (Medium)</option>
                  <option value="Long">Detailed (Long)</option>
                </select>
              </div>
            </div>

            <button
              className={`primary-btn generate-btn ${loading ? 'is-loading' : ''}`}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Generating with Gemini 3.5 Flash...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>Generate Email</span>
                </>
              )}
            </button>

            {error && (
              <div className="alert alert-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}
          </section>

          {/* Output Panel */}
          <section className="card output-card">
            <div className="card-header">
              <span className="card-title">Generated Email</span>
              {generatedEmail && (
                <button
                  type="button"
                  className={`secondary-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className={`output-container ${!generatedEmail ? 'empty' : ''}`}>
              {generatedEmail ? (
                <div className="rendered-output">{generatedEmail}</div>
              ) : (
                <div className="empty-state-content">
                  <div className="empty-state-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <h3>Ready to draft your email</h3>
                  <p>Configure your prompt directive and tone profile on the left, then click Generate.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* =======================================================
            About the Project: Architecture, Rationales & DevOps
            ======================================================= */}
        <section id="about" className="about-section">
          <div className="about-header">
            <div className="chip chip-highlight">
              <span>🎓 College Capstone & Engineering Portfolio</span>
            </div>
            <h2 className="about-title">How It Works & Technical Architecture</h2>
            <p className="about-subtitle">
              An enterprise full-stack demonstration combining reactive Java backend services, state-of-the-art LLM inference, clean SaaS design system, and cloud-native automation.
            </p>

            {/* Sub-tabs */}
            <div className="about-nav-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
                onClick={() => setActiveTab('workflow')}
              >
                1. End-to-End Workflow
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveTab('tech')}
              >
                2. Tech Stack & Why We Used It
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'devops' ? 'active' : ''}`}
                onClick={() => setActiveTab('devops')}
              >
                3. 5-Phase DevOps Pipeline
              </button>
            </div>
          </div>

          {/* TAB 1: WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="flow-steps-grid">
              {WORKFLOW_STEPS.map((s, idx) => (
                <div key={idx} className="flow-step-card">
                  <div className="flow-step-number">{s.step}</div>
                  <span className="flow-step-tag">{s.tag}</span>
                  <h3 className="flow-step-title">{s.title}</h3>
                  <p className="flow-step-desc">{s.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TECH STACK RATIONALE */}
          {activeTab === 'tech' && (
            <div className="tech-grid">
              {TECH_STACK.map((t, idx) => (
                <div key={idx} className="tech-card">
                  <div className="tech-card-header">
                    <h3 className="tech-card-name">{t.name}</h3>
                    <span className="tech-role-badge">{t.role}</span>
                  </div>
                  <p className="tech-rationale">{t.rationale}</p>
                  <div className="tech-highlight">{t.highlight}</div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: DEVOPS PIPELINE */}
          {activeTab === 'devops' && (
            <div className="devops-grid">
              {DEVOPS_PHASES.map((d, idx) => (
                <div key={idx} className="devops-card">
                  <span className="devops-phase">{d.phase}</span>
                  <h3 className="devops-title">{d.title}</h3>
                  <p className="devops-desc">{d.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Mailmodo Bright SaaS • Enterprise AI Email Writer • Powered by Google Gemini 3.5 Flash</p>
        <p>Built as a Full-Stack Cloud & AI Engineering Capstone Project by Abhi R Sooryavamshi</p>
      </footer>
    </div>
  );
}

export default App;
