import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [output, setOutput] = useState('');
  const [fileTypes, setFileTypes] = useState([
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
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/scrape', {
        repoUrl,
        docUrl,
        selectedFileTypes: fileTypes,
      });
      setOutput(response.data.response);
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">GitToText</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="repoUrl">Repository URL</label>
          <input
            type="text"
            className="form-control"
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="docUrl">Documentation URL</label>
          <input
            type="text"
            className="form-control"
            id="docUrl"
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
      {output && <div className="outputArea mt-4">{output}</div>}
    </div>
  );
}

export default App;
