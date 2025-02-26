import React, { useEffect, useRef } from "react";
import Message from "./Message";
import InputContainer from "./InputContainer";

const ChatContainer = ({
  chatHistory,
  isTyping,
  message,
  setMessage,
  sendMessage,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  return (
    <div className="chat-container">
      <div className="messages">
        {chatHistory.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        {isTyping && <p className="typing-indicator">Digitando...</p>}
        <div ref={messagesEndRef} />
      </div>
      <InputContainer
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatContainer;
