import React, { useState } from 'react';
import axios from 'axios';
import './Document.css'; 

const API_URL = process.env.REACT_APP_API_URL;

const Document: React.FC = () => {
  const [document, setDocument] = useState('');
  const [response, setResponse] = useState('');

  const handleUpload = async () => {
    try {
      const result = await axios.post(`${API_URL}/getCoverLetter`, { "text": document });
      setResponse(result.data.result);
    } catch (error) {
      console.error('Error uploading document:', error);
      setResponse('Error uploading document. Please try again.');
    }
  };

  return (
    <div className="document-container">
      <h2>Cover Letter Generator</h2>
      <div className="input-section">
        <label htmlFor="document-textarea">Paste the responsibilities and qualifications from the job description below:</label>
        <textarea
          id="document-textarea"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Enter your job description here"
          rows={10}
        />
      </div>
      <button onClick={handleUpload} className="upload-button">Generate</button>
      <div className="response-section">
        <h3>Cover Letter:</h3>
        <textarea
          value={response}
          readOnly
          placeholder="Cover letter will appear here"
          rows={10}
        />
      </div>
    </div>
  );
};

export default Document;