import { useState } from 'react';

function ApiButton() {
  const [responseData, setResponseData] = useState(null);

  // Event handler for button click
  const handleButtonClick = () => {
    // Example server request using fetch
    fetch('http://localhost:3000', { // Replace with your server's URL
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers you need here
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // or response.text(), depending on the server response format
    })
    .then(data => {
      console.log(data);
      setResponseData(data); // Update state with the response data
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Fetch Data</button>
      {responseData && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ApiButton;
