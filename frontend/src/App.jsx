// =====================================================
// 1. IMPORTS
// =====================================================

// React hooks
import { useEffect, useRef, useState } from "react";

// Used to display Gemini Markdown properly
import ReactMarkdown from "react-markdown";

// CSS file
import "./App.css";


function App() {

  // =====================================================
  // 2. STATES
  // =====================================================

  // Stores the text currently typed by the user
  const [message, setMessage] = useState("");


  // Stores the complete chat conversation
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 How can I help you today?",
    },
  ]);


  // true  = AI is generating a response
  // false = AI is ready
  const [isLoading, setIsLoading] = useState(false);



  // =====================================================
  // 3. REFERENCE FOR AUTO SCROLL
  // =====================================================

  // Gives us access to the chat message container
  const chatRef = useRef(null);



  // =====================================================
  // 4. AUTO SCROLL
  // =====================================================

  // Runs whenever messages or loading state changes
  useEffect(() => {

    if (chatRef.current) {

      // Scroll to the bottom of the chat
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }

  }, [messages, isLoading]);



  // =====================================================
  // 5. SEND MESSAGE
  // =====================================================

  const handleSend = async () => {

    // Remove extra spaces from user input
    const currentMessage = message.trim();


    // Don't send:
    // 1. Empty messages
    // 2. Another message while AI is loading
    if (!currentMessage || isLoading) {
      return;
    }


    // Add user's message to chat
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);


    // Clear the input box
    setMessage("");


    // Start loading animation
    setIsLoading(true);


    try {

      // =================================================
      // 6. CALL SPRING BOOT BACKEND
      // =================================================

      const response = await fetch(
        "http://localhost:8080/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Send user message as JSON
          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );


      // If backend returns an error
      if (!response.ok) {
        throw new Error("Request failed");
      }


      // Convert backend JSON response
      // into JavaScript object
      const data = await response.json();



      // =================================================
      // 7. ADD AI RESPONSE
      // =================================================

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "ai",
          text: data.response,
        },
      ]);



    } catch (error) {

      // =================================================
      // 8. ERROR HANDLING
      // =================================================

      console.error("Chat Error:", error);


      // Show error message inside chat
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);


    } finally {

      // =================================================
      // 9. STOP LOADING
      // =================================================

      // Runs whether request succeeds or fails
      setIsLoading(false);
    }
  };



  // =====================================================
  // 10. ENTER KEY
  // =====================================================

  const handleKeyDown = (event) => {

    // Check if user pressed Enter
    if (event.key === "Enter") {

      // Prevent default Enter behavior
      event.preventDefault();

      // Send the message
      handleSend();
    }
  };



  // =====================================================
  // 11. USER INTERFACE
  // =====================================================

  return (

    <div className="app">

      <div className="chat-container">


        {/* ===============================================
            12. HEADER
        =============================================== */}

        <header className="chat-header">

          {/* Chatbot Logo */}
          <div className="brand-logo">
            <span className="brand-logo-text">
              AI
            </span>
          </div>


          {/* Chatbot Name */}
          <div className="header-content">

            <h1>AI Assistant</h1>

            <div className="status">

              {/* Green online dot */}
              <span className="status-dot"></span>

              <span>Powered by Gemini</span>

            </div>

          </div>

        </header>



        {/* ===============================================
            13. CHAT MESSAGE AREA
        =============================================== */}

        <main
          className="chat-messages"
          ref={chatRef}
        >


          {/* Loop through all messages */}
          {messages.map((msg, index) => (

            <div
              key={index}
              className={`message-row ${msg.sender}`}
            >


              {/* Show AI avatar only for AI messages */}
              {msg.sender === "ai" && (

                <div className="message-avatar ai-message-avatar">
                  AI
                </div>

              )}



              {/* =========================================
                  MESSAGE CONTENT
              ========================================= */}

              <div className={`message ${msg.sender}`}>


                {/* 
                  Gemini returns Markdown.

                  Example:
                  **Java** becomes bold.

                  ReactMarkdown displays it properly.
                */}

                {msg.sender === "ai" ? (

                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>

                ) : (

                  // User message doesn't need Markdown
                  msg.text

                )}

              </div>



              {/* Show User avatar only for user messages */}
              {msg.sender === "user" && (

                <div className="message-avatar user-message-avatar">
                  U
                </div>

              )}

            </div>

          ))}



          {/* =============================================
              14. AI LOADING ANIMATION
          ============================================= */}

          {/* Only show when isLoading is true */}

          {isLoading && (

            <div className="message-row ai">


              {/* AI Avatar */}

              <div className="message-avatar ai-message-avatar">
                AI
              </div>


              {/* Three animated dots */}

              <div className="message ai typing-indicator">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          )}

        </main>



        {/* ===============================================
            15. INPUT SECTION
        =============================================== */}

        <footer className="input-section">

          <div className="chat-input">


            {/* User Input */}

            <input
              type="text"

              // Display current input value
              value={message}

              // Change placeholder while AI is loading
              placeholder={
                isLoading
                  ? "AI is thinking..."
                  : "Ask me anything..."
              }

              // Update message state while typing
              onChange={(event) =>
                setMessage(event.target.value)
              }

              // Detect Enter key
              onKeyDown={handleKeyDown}

              // Prevent typing while AI is responding
              readOnly={isLoading}

              // Automatically focus input
              autoFocus
            />



            {/* =========================================
                16. SEND BUTTON
            ========================================= */}

            <button
              type="button"

              // Send message when clicked
              onClick={handleSend}

              // Disable when:
              // 1. Input is empty
              // 2. AI is loading
              disabled={
                !message.trim() || isLoading
              }
            >
              ➜
            </button>

          </div>



          {/* =============================================
              17. INPUT STATUS TEXT
          ============================================= */}

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