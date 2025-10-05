// src/pages/Chat.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, addLocalUserMessage } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, currentConversationId, loading } = useSelector(state => state.chat);
  const [inputMessage, setInputMessage] = useState('');
  const [userId] = useState('user123'); // TODO: wire to auth

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = inputMessage.trim();
    if (!text) return;

    // optimistic bubble
    dispatch(addLocalUserMessage(text));
    setInputMessage('');

    await dispatch(sendMessage({
      user_id: userId,
      message: text,
      conversation_id: currentConversationId
    }));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>💬 AI Library Assistant</h1>
        <button onClick={() => navigate('/')} className="btn-back">← Back</button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>Start a conversation with the AI assistant!</p>
            <p>Ask about books, authors, or recommendations.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
              <p>{msg.content}</p>
            </div>
          ))
        )}
        {loading && <div className="typing">AI is typing...</div>}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about books..."
          className="chat-input"
        />
        <button type="submit" className="btn-send" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
