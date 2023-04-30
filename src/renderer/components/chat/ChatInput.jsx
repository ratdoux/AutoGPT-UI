import React, { useState, useEffect } from 'react';
import { Drawer, Page, Grid, Textarea, Button, Input } from '@geist-ui/core';
import { ArrowLeft, Send } from '@geist-ui/icons';
import styled from 'styled-components';
import "./ChatInput.scss"

const CustomTextarea = styled(Textarea)`
&& textarea {
  border-radius: 0 !important;
  background-color: #e6e6e6 !important;
  border-top: 2px double white !important;
  border-left: 2px double white !important;
  border-right: 2px double black !important;
  border-bottom: 2px double black !important;
  color: #000 !important;
}
&& textarea:focus {
  border-radius: 0 !important;
  background-color: #f0f0f0 !important;
  border-top: 2px double white !important;
  border-left: 2px double white !important;
  border-right: 2px double black !important;
  border-bottom: 2px double black !important;
  color: #000 !important;
}
`;
const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());

  useEffect(() => {
    setMessage('');
  }, [inputKey]);

  const handleSubmit = () => {
    //if message is empty, send '' 
    if(message.trim() === '') {
      onSubmit('');
      setInputKey(Date.now());
    }
    if (message.trim()) {
      const msg = message.trim();
      onSubmit(msg);
      setInputKey(Date.now());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div style={{ 
        position: 'sticky',
        bottom: '-15px',
        width: '100%',
        zIndex: '100',
        backgroundColor: '#fff',
        display: 'flex',
        
      }}>
      <CustomTextarea
        key={inputKey}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        width="100%"
        placeholder="Type your message..."
        className='chat-input'
        
        style={{
          borderRadius: '0',
          backgroundColor: '#fff', // White background color
          borderColor: 'transparent', // Make the border transparent
          margin: 0,
          color: 'transparent',
        }}
    />
      <div
        className='send-button'
        onClick={handleSubmit}
      >
        SEND
      </div>
    </div>
  );
};

export default ChatInput;
