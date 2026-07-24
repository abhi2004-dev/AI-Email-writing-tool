import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const API_BASE_URL = 'https://ai-email-writer-backend-2oor.onrender.com';

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please provide context or requirements for the email.');
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
        body: JSON.stringify({ prompt, tone, length }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate email from enterprise server.');
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
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-dot"></span>
          <span>Enterprise Email Assistant</span>
        </div>
        <div className="nav-meta">v1.0.4 Prod</div>
      </nav>

      <main className="main-container">
        <div className="content-header">
          <h1>Corporate Correspondence Generator</h1>
          <p>Draft precision-engineered stakeholder emails, status updates, and client communications instantly.</p>
        </div>

        <div className="workspace-grid">
          {/* Input Panel */}
          <section className="panel input-panel">
            <div className="field-group">
              <label htmlFor="prompt">Communication Directive / Context</label>
              <textarea
                id="prompt"
                rows="6"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Draft an update for the engineering team regarding sprint completion delays due to dependency staging issues..."
              />
            </div>

            <div className="parameters-row">
              <div className="field-group">
                <label htmlFor="tone">Tone Profile</label>
                <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="Professional">Professional</option>
                  <option value="Executive">Executive</option>
                  <option value="Direct / Concise">Direct & Concise</option>
                  <option value="Diplomatic">Diplomatic</option>
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="length">Output Scope</label>
                <select id="length" value={length} onChange={(e) => setLength(e.target.value)}>
                  <option value="Short">Short (Brief)</option>
                  <option value="Medium">Standard</option>
                  <option value="Long">Detailed</option>
                </select>
              </div>
            </div>

            <button
              className={`primary-btn ${loading ? 'is-loading' : ''}`}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Processing Request...
                </>
              ) : (
                'Generate Output'
              )}
            </button>

            {error && <div className="alert error">{error}</div>}
          </section>

          {/* Output Panel */}
          <section className="panel output-panel">
            <div className="output-topbar">
              <span className="panel-title">Generated Output</span>
              {generatedEmail && (
                <button className={`secondary-btn ${copied ? 'success' : ''}`} onClick={handleCopy}>
                  {copied ? 'Copied to Clipboard' : 'Copy Text'}
                </button>
              )}
            </div>

            <div className={`output-content ${!generatedEmail ? 'empty-state' : ''}`}>
              {generatedEmail ? (
                <div className="rendered-text">{generatedEmail}</div>
              ) : (
                <div className="placeholder-message">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <p>Configure directive parameters and click execute to render communication artifacts.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;