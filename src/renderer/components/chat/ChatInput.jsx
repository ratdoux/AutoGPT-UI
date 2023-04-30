import React, { useState } from 'react';
import { Drawer, Page, Grid, Textarea, Button, Input } from '@geist-ui/core';
import { ArrowLeft, Send } from '@geist-ui/icons';
import styled from 'styled-components';

const CustomTextarea = styled(Textarea)`
&& textarea {
  border-radius: 0 !important;
  background-color: #fff !important;
  color: #000 !important;
}
`;
const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message.trim());
      setMessage('');
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
        paddingRight: '10px',
      }}>
      <CustomTextarea
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
        }}
    />
    </div>
  );
};

export default ChatInput;