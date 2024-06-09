import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [fileTypes, setFileTypes] = useState([]);
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileTypesToSend = [
      '.txt',
      '.py',
      '.js',
      '.sql',
      '.env',
      '.json',
      '.html',
      '.css',
      '.md',
      '.java',
      '.cpp',
      '.c',
      '.cs',
      '.php',
      '.rb',
      '.xml',
      '.yml',
      '.sh',
      '.swift',
      '.h',
      '.pyw',
      '.asm',
      '.bat',
      '.cmd',
      '.cls',
      '.coffee',
      '.erb',
      '.go',
      '.groovy',
      '.htaccess',
      '.jsp',
      '.lua',
      '.make',
      '.matlab',
      '.pas',
      '.perl',
      '.pl',
      '.ps1',
      '.r',
      '.scala',
      '.scm',
      '.sln',
      '.svg',
      '.vb',
      '.vbs',
      '.xhtml',
      '.xsl',
    ];

    try {
      const response = await axios.post('http://localhost:5000/scrape', {
        repoUrl,
        docUrl,
        selectedFileTypes: fileTypesToSend,
      });
      setOutput(response.data.response);
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <header>
        <h1>GitToText</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            GitHub Repository URL:
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Documentation URL:
            <input
              type="url"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {output && (
          <div className="outputArea">
            <h2>Output</h2>
            <textarea readOnly value={output}></textarea>
            <button onClick={() => navigator.clipboard.writeText(output)}>
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
