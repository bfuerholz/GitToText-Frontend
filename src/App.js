import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [fileTypes, setFileTypes] = useState([]);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const availableFileTypes = [
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fileTypesToSend =
        fileTypes.length > 0 ? fileTypes : availableFileTypes;
      const response = await axios.post(
        'https://git-to-text-backend.vercel.app/api/scrape',
        { repoUrl, docUrl, selectedFileTypes: fileTypesToSend }
      );
      setOutput(response.data.data);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Error fetching data. Please check the console for more details.');
    }
    setIsLoading(false);
  };

  const handleFileTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFileTypes([...fileTypes, value]);
    } else {
      setFileTypes(fileTypes.filter((type) => type !== value));
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Output copied to clipboard!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Repo to Text</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Repository URL:</label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Documentation URL (optional):</label>
            <input
              type="text"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
            />
          </div>
          <div>
            <label>Select File Types:</label>
            <div className="file-types">
              {availableFileTypes.map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleFileTypeChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Fetching...' : 'Submit'}
          </button>
        </form>
        {output && (
          <div className="output-container">
            <h2>Output</h2>
            <textarea
              className="outputArea"
              value={output}
              readOnly
              rows={20}
              cols={80}
            />
            <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
