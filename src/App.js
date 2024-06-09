import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [fileTypes, setFileTypes] = useState([]);
  const [output, setOutput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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
    try {
      const fileTypesToSend =
        fileTypes.length > 0 ? fileTypes : availableFileTypes;
      const response = await axios.post('https://git-to-text-backend.vercel.app/api/scrape', {
        repoUrl,
        docUrl,
        selectedFileTypes: fileTypesToSend,
      });
      setOutput(response.data.filename);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Error fetching data. Please check the console for more details.');
    }
  };

  const handleReset = () => {
    setRepoUrl('');
    setDocUrl('');
    setFileTypes([]);
    setOutput('');
  };

  const handleFileTypeChange = (e) => {
    const value = e.target.value;
    setFileTypes((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>GitToText</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Repository URL:
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
          <fieldset>
            <legend>Select File Types:</legend>
            {availableFileTypes.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={fileTypes.includes(type)}
                  onChange={handleFileTypeChange}
                />
                {type}
              </label>
            ))}
          </fieldset>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
        {output && (
          <div className="outputArea">
            <h2>Output</h2>
            <textarea value={output} readOnly />
            <button onClick={() => navigator.clipboard.writeText(output)}>
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
