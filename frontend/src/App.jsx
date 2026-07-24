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
      setError('Please enter a prompt or context for your email.');
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
        throw new Error('Failed to generate email response from server.');
      }

      const data = await response.text();
      setGeneratedEmail(data);
    } catch (err) {
      setError(err.message || 'An error occurred while connecting to backend.');
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
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <div className="badge">✨ Powered by AI & Spring Boot</div>
          <h1>AI Email Writer</h1>
          <p>Draft professional, polished, and context-aware emails in seconds.</p>
        </header>

        <div className="card">
          <div className="form-group">
            <label htmlFor="prompt">What should this email be about?</label>
            <textarea
              id="prompt"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Decline meeting invitation politely due to scheduling conflict next Tuesday..."
            />
          </div>

          <div className="controls-grid">
            <div className="control-item">
              <label htmlFor="tone">Tone</label>
              <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
                <option value="Urgent">Urgent</option>
                <option value="Friendly">Friendly</option>
              </select>
            </div>

            <div className="control-item">
              <label htmlFor="length">Length</label>
              <select id="length" value={length} onChange={(e) => setLength(e.target.value)}>
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </select>
            </div>
          </div>

          <button
            className={`generate-btn ${loading ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Crafting your email...
              </>
            ) : (
              '⚡ Generate Email'
            )}
          </button>

          {error && <div className="error-banner">{error}</div>}
        </div>

        {generatedEmail && (
          <div className="output-card">
            <div className="output-header">
              <h3>Generated Draft</h3>
              <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? '✓ Copied!' : '📋 Copy Text'}
              </button>
            </div>
            <div className="output-box">
              {generatedEmail}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;