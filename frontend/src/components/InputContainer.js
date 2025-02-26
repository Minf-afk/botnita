import React from "react";

const InputContainer = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default InputContainer;
