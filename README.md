# Markdown Editor with Live Preview

This Markdown Editor is a simple web application that allows users to input Markdown text and instantly preview the converted HTML in real-time. It consists of a backend server built with Node.js and Express, and a frontend client built with React.

## Backend Setup

1. Install Node.js if you haven't already: [Node.js Installation Guide](https://nodejs.org/).
2. Navigate to the `backend` directory in your terminal.
3. Install dependencies by running: npm install
4. Start the server by running: node index.js
5. The server will start running on port 3001 by default.

## Frontend Setup

1. Navigate to the `frontend` directory in another terminal.
2. Install dependencies by running: npm install
3. Start the React development server by running: npm start
## Usage

1. In the Markdown Editor interface, enter Markdown text in the left pane.
2. The converted HTML will be displayed in real-time in the right pane.
3. You can see the live preview as you type or edit the Markdown text.
4. The HTML output is sanitized to prevent XSS attacks using DOMPurify.

## Technologies Used

- **Backend:** Node.js, Express.js, Socket.IO, Showdown
- **Frontend:** React, Socket.IO client, DOMPurify

## Acknowledgments

- The backend server utilizes Socket.IO for real-time bidirectional communication between the server and client.
- The frontend application is built with React, providing a responsive and dynamic user interface.
- The Markdown to HTML conversion is performed on the server-side using Showdown library.
- Sanitization of HTML output is achieved using DOMPurify to prevent XSS attacks.
   
