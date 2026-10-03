// =====================================================
// 1. IMPORTS
// =====================================================

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {

  // =====================================================
  // 2. STATES
  // =====================================================

  // Stores current input
  const [message, setMessage] = useState("");

  // Stores all chat messages
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 How can I help you today?",
    },
  ]);

  // Checks if AI is generating response
  const [isLoading, setIsLoading] = useState(false);


  // =====================================================
  // 3. AUTO SCROLL
  // =====================================================

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  // =====================================================
  // 4. SEND MESSAGE
  // =====================================================

  const handleSend = async () => {

    const currentMessage = message.trim();

    // Stop empty or duplicate messages
    if (!currentMessage || isLoading) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    // Clear input and start loading
    setMessage("");
    setIsLoading(true);

    try {

      // =================================================
      // 5. CALL SPRING BOOT BACKEND
      // =================================================

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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();


      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.response,
        },
      ]);

    } catch (error) {

      // =================================================
      // 6. ERROR HANDLING
      // =================================================

      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);

    } finally {

      // Stop loading
      setIsLoading(false);
    }
  };


  // =====================================================
  // 7. ENTER KEY
  // =====================================================

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };


  // =====================================================
  // 8. NEW CHAT
  // =====================================================

  const handleNewChat = () => {

    // Remove previous messages
    setMessages([
      {
        sender: "ai",
        text: "Hi! 👋 How can I help you today?",
      },
    ]);

    // Clear input
    setMessage("");
  };


  // =====================================================
  // 9. USER INTERFACE
  // =====================================================

  return (

    <div className="app">

      <div className="chat-container">


        {/* ===============================================
            10. HEADER
        =============================================== */}

        <header className="chat-header d-flex align-items-center">

          {/* AI Logo */}
          <div className="brand-logo flex-shrink-0">
            <span className="brand-logo-text">
              AI
            </span>
          </div>


          {/* Chatbot Name */}
          <div className="header-content ms-3">

            <h1>AI Assistant</h1>

            <div className="status">

              <span className="status-dot"></span>

              <span>Powered by Gemini</span>

            </div>

          </div>


          {/* 
              Bootstrap ms-auto pushes
              this button to the far right
          */}

          <button
            type="button"
            className="btn btn-primary ms-auto px-3 py-2"
            onClick={handleNewChat}
            disabled={isLoading}
          >
            + New Chat
          </button>

        </header>


        {/* ===============================================
            11. CHAT MESSAGES
        =============================================== */}

        <main
          className="chat-messages"
          ref={chatRef}
        >

          {/* Display all messages */}

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

                {/* AI messages support Markdown */}

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


          {/* =============================================
              12. AI LOADING
          ============================================= */}

          {isLoading && (

            <div className="message-row ai">

              {/* AI Avatar */}

              <div className="message-avatar ai-message-avatar">
                AI
              </div>


              {/* Three loading dots */}

              <div className="message ai typing-indicator">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          )}

        </main>


        {/* ===============================================
            13. INPUT SECTION
        =============================================== */}

        <footer className="input-section">

          {/* Bootstrap flex is used here */}

          <div className="chat-input d-flex align-items-center">

            {/* User Input */}

            <input
              type="text"
              className="flex-grow-1"
              value={message}

              placeholder={
                isLoading
                  ? "AI is thinking..."
                  : "Ask me anything..."
              }

              // Update input
              onChange={(event) =>
                setMessage(event.target.value)
              }

              // Press Enter to send
              onKeyDown={handleKeyDown}

              // Prevent typing while AI responds
              readOnly={isLoading}

              autoFocus
            />


            {/* Send Button */}

            <button
              type="button"
              onClick={handleSend}

              disabled={
                !message.trim() || isLoading
              }
            >
              ➜
            </button>

          </div>


          {/* Input Status */}

          <p className="input-hint">

            {isLoading
              ? "Generating response..."
              : "Press Enter to send"}

          </p>

        </footer>

      </div>

    </div>
  );
}

export default App;