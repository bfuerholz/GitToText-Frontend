import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [response, setResponse] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fileTypes, setFileTypes] = useState([
    ".txt",
    ".py",
    ".js",
    ".sql",
    ".env",
    ".json",
    ".html",
    ".css",
    ".md",
    ".java",
    ".cpp",
    ".c",
    ".cs",
    ".php",
    ".rb",
    ".xml",
    ".yml",
    ".sh",
    ".swift",
    ".h",
    ".pyw",
    ".asm",
    ".bat",
    ".cmd",
    ".cls",
    ".coffee",
    ".erb",
    ".go",
    ".groovy",
    ".htaccess",
    ".jsp",
    ".lua",
    ".make",
    ".matlab",
    ".pas",
    ".perl",
    ".pl",
    ".ps1",
    ".r",
    ".scala",
    ".scm",
    ".sln",
    ".svg",
    ".vb",
    ".vbs",
    ".xhtml",
    ".xsl"
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileTypesToSend = fileTypes.filter((fileType) => fileType.trim() !== "");
      console.log("Submitting form with data:", { repoUrl, docUrl, selectedFileTypes: fileTypesToSend });
      const res = await axios.post("http://localhost:5000/scrape", {
        repoUrl,
        docUrl,
        selectedFileTypes: fileTypesToSend,
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error("Error during submission:", err);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(response);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "container dark-mode" : "container"}>
      <h1>GitToText</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>GitHub Repository URL:</label>
          <input type="text" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} />
        </div>
        <div>
          <label>Documentation URL (optional):</label>
          <input type="text" value={docUrl} onChange={(e) => setDocUrl(e.target.value)} />
        </div>
        <div>
          <label>File Types:</label>
          <select multiple value={fileTypes} onChange={(e) => setFileTypes(Array.from(e.target.selectedOptions, option => option.value))}>
            {fileTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <textarea value={response} readOnly className="outputArea"></textarea>
          <button onClick={handleCopyText} className="copyButton">Copy to Clipboard</button>
        </div>
      )}
      <button onClick={toggleTheme} className="toggleThemeButton">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default App;
