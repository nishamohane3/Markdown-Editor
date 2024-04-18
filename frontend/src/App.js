import React, { useState, useEffect } from 'react'; // Import necessary modules from React library
import socketIOClient from 'socket.io-client'; // Import Socket.IO client
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML
import './App.css'; // Import CSS file for styling

// Define the endpoint for the Socket.IO server
const ENDPOINT = 'http://localhost:3001';
const socket = socketIOClient(ENDPOINT); // Connect to the Socket.IO server

// Define the main component of the application
const App = () => {
  // State variables for storing Markdown text and converted HTML text
  const [markdownText, setMarkdownText] = useState('');
  const [htmlText, setHtmlText] = useState('');

  // Function to sanitize HTML content using DOMPurify
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(htmlText)
  })

  // Effect hook to handle incoming HTML text from the server
  useEffect(() => {
    socket.on('html', (html) => {
      setHtmlText(html); // Update the state with the received HTML text
    });

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      socket.off('html');
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Event handler for handling changes in the Markdown textarea
  const handleChange = (event) => {
    const text = event.target.value;
    setMarkdownText(text); // Update the state with the new Markdown text
    socket.emit('markdown', text); // Emit the Markdown text to the server for conversion
  };

  // JSX markup for rendering the application UI
  return (
    <>
      <div className='header'>
        Markdown Editor
      </div>
      <div className="topcontainer">
        <div className='headingcss'>
          Markdown Text:
        </div>
        <div className='headingcss'>
          HTML Preview:
        </div>
      </div>
      <div className="container">
        <div className="editor-pane">
          <textarea
            className='textarea'
            rows="80"
            cols="81"
            value={markdownText}
            onChange={handleChange}
            placeholder="Enter Markdown text here..."
          />
        </div>
        <div className="preview-pane">
          <div
            dangerouslySetInnerHTML={sanitizedData()} // Render HTML content safely
          />
        </div>
      </div>
    </>
  );
};

export default App; // Export the App component as default
