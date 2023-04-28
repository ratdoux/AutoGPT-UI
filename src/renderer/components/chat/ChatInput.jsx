import React, { useState } from 'react';
import { Drawer, Page, Grid, Input, Button } from '@geist-ui/core';
import { ArrowLeft, Send } from '@geist-ui/icons';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        width="100%"
        placeholder="Type your message..."
      />
      <Button
        auto
        icon={<Send />}
        onClick={handleSubmit}
        style={{ marginLeft: '0.5rem' }}
      />
    </div>
  );
};

export default ChatInput;