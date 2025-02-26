import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles/App.css";
import ChatbotHeader from "./components/ChatbotHeader";
import ChatContainer from "./components/ChatContainer";
import backgroundImage from "./img/background.jpg"; 

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inactiveMessageShown, setInactiveMessageShown] = useState(false);

  const inactivityTimeoutRef = useRef(null);
  const INACTIVITY_TIME = 300000;

  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(() => {
      if (!inactiveMessageShown) {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: "Parece que você ficou inativo. Caso precise de ajuda, estou à disposição!" },
        ]);
        setInactiveMessageShown(true);
      }
    }, INACTIVITY_TIME);
  }, [inactiveMessageShown]);

  const sendMessage = async () => {
    if (message.trim() === "") return;
    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setIsTyping(true);
    setInactiveMessageShown(false);
    resetInactivityTimer();

    try {
      const res = await fetch("http://localhost:5000/api/getBotResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setIsTyping(false);
      setChatHistory((prev) => [...prev, { sender: "bot", text: data.response }]);
      resetInactivityTimer();
    } catch (error) {
      console.error("Erro ao obter resposta do bot:", error);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => clearTimeout(inactivityTimeoutRef.current);
  }, [resetInactivityTimer]);

  const toggleChat = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setChatHistory((prevHistory) =>
          prevHistory.filter(
            (msg) => msg.text !== "Parece que você ficou inativo. Caso precise de ajuda, estou à disposição!"
          )
        );
        setInactiveMessageShown(false);
      }
      return !prev;
    });
  };

  return (
    <div className="App">
      <div className="background">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>

      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <ChatbotHeader isOpen={isOpen} toggleChat={toggleChat} />
        {isOpen && (
          <ChatContainer
            chatHistory={chatHistory}
            isTyping={isTyping}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
