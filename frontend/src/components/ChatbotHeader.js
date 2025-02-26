import React from "react";
import logo from "../img/nitalogo.jpeg";

const ChatbotHeader = ({ toggleChat }) => {
  return (
    <div className="chatbot-header" onClick={toggleChat}>
      <img src={logo} alt="Nita Alimentos" className="chatbot-logo" />
      <h2>Nita Lovers</h2>
    </div>
  );
};

export default ChatbotHeader;
