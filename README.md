# AI Chatbot Application

A simple full-stack AI chatbot application built using React, Spring Boot, and the Google Gemini API.

The application allows users to send messages through a modern chat interface and receive AI-generated responses from Gemini.

---

## Features

- Chat with Google Gemini AI
- Modern and responsive chatbot interface
- Send messages using the button or Enter key
- AI typing/loading indicator
- Markdown support for AI responses
- Automatic chat scrolling
- Copy AI responses
- Start a new chat
- Basic error handling
- Responsive design for different screen sizes

---

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring RestClient
- Lombok
- Maven
- Google Gemini API

### Frontend

- React
- Vite
- JavaScript
- Bootstrap
- Custom CSS
- React Markdown
- Fetch API

---

## Project Structure

```text
Ai-ChatBot-Project/
│
├── backend/
│   └── src/main/java/com/aichatbot/
│       ├── config/
│       │   └── GeminiConfig.java
│       │
│       ├── controller/
│       │   └── ChatController.java
│       │
│       ├── dto/
│       │   ├── ChatRequest.java
│       │   └── ChatResponse.java
│       │
│       ├── service/
│       │   └── ChatService.java
│       │
│       └── BackendApplication.java
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## How It Works

The application follows a simple request-response flow:

```text
User
  ↓
React Frontend
  ↓
POST /api/chat
  ↓
Spring Boot Controller
  ↓
Chat Service
  ↓
Google Gemini API
  ↓
Spring Boot Backend
  ↓
React Frontend
  ↓
AI Response displayed to User
```

The React frontend sends the user's message to the Spring Boot backend.

The backend sends the message to the Gemini API and returns the generated response to the frontend.

---

## API Endpoint

### Send Chat Message

```http
POST /api/chat
```

### Request

```json
{
  "message": "Explain Java in simple words"
}
```

### Response

```json
{
  "response": "Java is a programming language used to build different types of applications..."
}
```

---

## Gemini API Configuration

The application requires a Google Gemini API key.

The API key should **not** be hard-coded or committed to GitHub.

The backend reads the key using an environment variable:

```properties
gemini.api.key=${GEMINI_API_KEY}
```

Create an environment variable named:

```text
GEMINI_API_KEY
```

and provide your Gemini API key as its value.

---

## Run the Backend


You can run `BackendApplication.java` directly from IntelliJ IDEA.

---

## Run the Frontend

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Then open the local URL displayed by Vite in your browser.

---

## Security

The Gemini API key is stored outside the source code using an environment variable.

Files containing sensitive information such as `.env` should not be committed to GitHub.

---

## What I Learned

Through this project, I practiced:

- Building REST APIs using Spring Boot
- Connecting React with a Spring Boot backend
- Integrating an external AI API
- Sending HTTP requests using Fetch API
- Working with JSON request and response data
- Managing React state
- Handling asynchronous operations
- Displaying Markdown responses
- Handling loading and error states
- Using Bootstrap with custom CSS
- Organizing a full-stack project
- Using Git and GitHub for version control

---

## Future Improvements

Possible future improvements include:

- Chat history
- User authentication
- Database integration
- Multiple AI models
- Conversation persistence
- Streaming AI responses

---

## Author

**Sakhil Hossain**

Java Full Stack Developer

---

## Project Status

The core chatbot functionality is complete and working locally.