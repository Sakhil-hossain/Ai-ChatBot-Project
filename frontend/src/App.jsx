import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  // Current text inside input
  const [message, setMessage] = useState("");

  // Complete conversation
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your AI assistant. How can I help you today?",
    },
  ]);

  // Reference to the bottom of the chat
  const messagesEndRef = useRef(null);

  // Automatically scroll whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send message
  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    const currentMessage = message.trim();

    // User message
    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    // Temporary AI response
    // Step 11 will replace this with the real backend response.
    const aiMessage = {
      sender: "ai",
      text: "You asked: " + currentMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      aiMessage,
    ]);

    // Clear input after sending
    setMessage("");
  };

  // Press Enter to send
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

        <main className="chat-messages">

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
                {msg.text}
              </div>

              {/* User Avatar */}

              {msg.sender === "user" && (
                <div className="message-avatar user-message-avatar">
                  U
                </div>
              )}

            </div>
          ))}

          {/* Invisible element used for automatic scrolling */}

          <div ref={messagesEndRef} />

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