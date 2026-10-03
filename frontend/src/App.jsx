import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  // Current input value
  const [message, setMessage] = useState("");

  // All chat messages
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! Sakhil Boss👋 I'm your AI assistant. How can I help you today?",
    },
  ]);

  // Used for automatic scrolling
  const chatMessagesRef = useRef(null);

  // Automatically scroll to newest message
  useEffect(() => {
    const chatBox = chatMessagesRef.current;

    if (chatBox) {
      chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSend = async () => {
    const currentMessage = message.trim();

    // Don't send empty messages
    if (!currentMessage) {
      return;
    }

    // Create user message
    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    // Show user message immediately
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    // Clear input
    setMessage("");

    try {
      // Send message to Spring Boot
      const response = await fetch(
        "http://localhost:8080/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      // Check backend response
      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      // Convert response to JSON
      const data = await response.json();

      // Create AI message
      const aiMessage = {
        sender: "ai",
        text: data.response,
      };

      // Add AI message
      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      // Show error inside chat
      const errorMessage = {
        sender: "ai",
        text: "Sorry, I couldn't get a response. Please try again.",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        errorMessage,
      ]);
    }
  };

  // =========================
  // ENTER KEY
  // =========================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">

        {/* ================= HEADER ================= */}

        <header className="chat-header">
          <div className="brand-logo">
            <span className="brand-logo-text">AI</span>
            <span className="brand-logo-dot"></span>
          </div>

          <div className="header-content">
            <h1>AI Assistant</h1>

            <div className="status">
              <span className="status-dot"></span>
              <span>Powered by Gemini</span>
            </div>
          </div>
        </header>

        {/* ================= MESSAGES ================= */}

        <main
          className="chat-messages"
          ref={chatMessagesRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${msg.sender}`}
            >
              {/* AI Avatar */}

              {msg.sender === "ai" && (
                <div className="message-avatar ai-message-avatar">
                  AI
                </div>
              )}

              {/* Message */}

             <div className={`message ${msg.sender}`}>
                  {msg.sender === "ai" ? (
                     <ReactMarkdown>
                       {msg.text}
                    </ReactMarkdown>
                ) : (
                     msg.text
                    )}
             </div>

              {/* User Avatar */}

              {msg.sender === "user" && (
                <div className="message-avatar user-message-avatar">
                  U
                </div>
              )}
            </div>
          ))}
        </main>

        {/* ================= INPUT ================= */}

        <footer className="input-section">
          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <button
              onClick={handleSend}
              disabled={!message.trim()}
              aria-label="Send message"
            >
              <span className="send-icon">➜</span>
            </button>

          </div>

          <p className="input-hint">
            Press Enter to send
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;