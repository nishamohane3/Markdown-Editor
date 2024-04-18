// Import required modules
const express = require('express'); // Express framework for creating web applications
const http = require('http'); // HTTP module for creating HTTP server
const socketIo = require('socket.io'); // Socket.IO for real-time bidirectional event-based communication
const showdown = require('showdown'); // Showdown for converting Markdown to HTML
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) for enabling cross-origin requests

// Create an Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Create a Socket.IO instance attached to the HTTP server
const io = socketIo(server, {
    // Configure CORS for Socket.IO
    cors: {
        origin: '*', // Allow requests from any origin
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create a new Showdown converter instance for converting Markdown to HTML
const converter = new showdown.Converter();

// Set options for the Showdown converter
converter.setOption('simplifiedAutoLink', 'true'); // Enable auto-linking of URLs
converter.setOption('smoothLivePreview', 'true'); // Enable smooth live preview
converter.setOption('simpleLineBreaks', 'true'); // Enable simple line breaks

// Event listener for when a client connects to the Socket.IO server
io.on('connection', (socket) => {
    console.log('A user connected'); // Log that a user has connected

    // Event listener for when a client sends Markdown text
    socket.on('markdown', (markdownText) => {
        // Convert the received Markdown text to HTML
        const htmlText = converter.makeHtml(markdownText);
        // Emit the HTML text to all connected clients
        io.emit('html', htmlText);
    });

    // Event listener for when a client disconnects from the server
    socket.on('disconnect', () => {
        console.log('User disconnected'); // Log that a user has disconnected
    });
});

// Start the HTTP server and listen on port 3001
server.listen(3001, () => {
    console.log('Server is running on port 3001'); // Log that the server is running
});
