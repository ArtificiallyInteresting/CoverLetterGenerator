import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;



const Document: React.FC = () => {
  const [document, setDocument] = useState('');
  const [response, setResponse] = useState('');

  const handleUpload = async () => {
    try {
      const result = await axios.post(`${API_URL}/api/upload`, { "text": document });
      setResponse(result.data.result);
    } catch (error) {
      console.error('Error uploading document:', error);
      setResponse('Error uploading document. Please try again.');
    }
  };

  return (
    <div>
      <textarea
        value={document}
        onChange={(e) => setDocument(e.target.value)}
        placeholder="Enter your document here"
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <textarea
        value={response}
        readOnly
        placeholder="Response will appear here"
        rows={10}
        cols={50}
      />
    </div>
  );
};

export default Document;