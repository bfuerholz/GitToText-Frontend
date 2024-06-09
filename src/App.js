import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const FILE_TYPES = [
  ".txt", ".py", ".js", ".sql", ".env", ".json", ".html", ".css", ".md",
  ".java", ".cpp", ".c", ".cs", ".php", ".rb", ".xml", ".yml", ".sh",
  ".swift", ".h", ".pyw", ".asm", ".bat", ".cmd", ".cls", ".coffee", ".erb",
  ".go", ".groovy", ".htaccess", ".jsp", ".lua", ".make", ".matlab", ".pas",
  ".perl", ".pl", ".ps1", ".r", ".scala", ".scm", ".sln", ".svg", ".vb", ".vbs",
  ".xhtml", ".xsl"
];

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [fileTypes, setFileTypes] = useState(FILE_TYPES);
  const [response, setResponse] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileTypesToSend = fileTypes.length ? fileTypes : ["all"];

    try {
      console.log("Submitting form with data:", {
        repoUrl,
        docUrl,
        selectedFileTypes: fileTypesToSend,
      });

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
    const outputArea = document.querySelector(".outputArea");
    outputArea.select();
    document.execCommand("copy");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <h1>GitToText</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Repository URL:
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Documentation URL (optional):
          <input
            type="text"
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
          />
        </label>
        <br />
        <label>
          Select File Types:
          <select
            multiple
            value={fileTypes}
            onChange={(e) =>
              setFileTypes(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {FILE_TYPES.map((fileType) => (
              <option key={fileType} value={fileType}>
                {fileType}
              </option>
            ))}
          </select>
        </label>
        <div className="button">
          <button type="submit">Transform</button>
          <button type="button" onClick={handleCopyText}>
            Copy Output
          </button>
        </div>
      </form>
      <textarea
        className="outputArea"
        value={response}
        readOnly
      />
      <div className="button">
        <button onClick={toggleTheme}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;
