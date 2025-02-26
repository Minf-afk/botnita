import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";

const Message = ({ sender, text }) => {
  return (
    <div
      className={`message ${
        sender === "user" ? "user-message" : "bot-response"
      }`}>
      {sender === "bot" && <FaRobot className="message-icon bot-icon" />}
      <p>{text}</p>
      {sender === "user" && <FaUser className="message-icon user-icon" />}
    </div>
  );
};

export default Message;
