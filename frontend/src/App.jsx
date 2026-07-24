import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dynamically points to live Render backend or defaults to localhost for dev
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt or context for the email.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedEmail('');

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
    alert('Email copied to clipboard!');
  };

  return (
    <div className="app-container">
      <h1 className="title">AI Email Writer</h1>

      <div className="form-group">
        <label htmlFor="prompt">Email Context / Prompt</label>
        <textarea
          id="prompt"
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter details about what you want to write (e.g., Decline meeting invitation politely due to scheduling conflict)..."
        />
      </div>

      <div className="controls-row">
        <div className="control-item">
          <label htmlFor="tone">Tone</label>
          <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Urgent">Urgent</option>
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
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Email'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {generatedEmail && (
        <div className="output-section">
          <h3>Generated Email:</h3>
          <div className="output-box">{generatedEmail}</div>
          <button className="copy-btn" onClick={handleCopy}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;