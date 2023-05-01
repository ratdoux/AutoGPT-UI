import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../chat/Chat';
import { useWebSocket } from '../communication/WebsocketHandler';
import { useWebSocketContext } from 'renderer/context/WebSocketProvider';
import {
  checkStringAgainstInfoStringArray,
  hasAnsi,
  removeAnsiAndGetColor,
} from '../utils/ParsingFunctions';

import {
  infoStringList, colorTable
} from '../utils/ParsingSettings'
import { Button, Spinner } from '@geist-ui/core';

const ChatView = () => {
  const [essentialMessages, setEssentialMessages] = useState([]);
  const [infoMessages, setInfoMessages] = useState([]);
  const [connect, setConnect] = useState(false);
  const { messageData } = useWebSocketContext();
  const { sendMessage } = useWebSocket('ws://localhost:8080/', connect);
  const [settings, setSettings] = useState([]);
  const navigate = useNavigate();

  function parseJSON(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }

  function parseSettings(settings) {
    return settings.reduce((accumulator, setting) => {
        const [key, value] = setting.split('=');
        accumulator[key] = parseJSON(value);
        return accumulator;
    }, {});
}

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('load-settings', [])
      .then((loadedSettings) => {
        setSettings(parseSettings(loadedSettings));
      });
  }, []);


  const removeAnsiGetColor = (ansiMessage) => {
    return removeAnsiAndGetColor(ansiMessage, settings.colorTable ?? colorTable);
  }

  const checkInfoStrings = (msg) => {
    return checkStringAgainstInfoStringArray(msg, settings.infoStringList ?? infoStringList);
  }

  const toggleConnection = () => {
    setConnect((prevConnect) => !prevConnect);
  };

  const handleSendMessage = (message) => {
    sendMessage(message);
    setEssentialMessages((prevMessages) => [...prevMessages,
    { isUser: true, message: message }
    ]);
  };

  const ansiMessage = messageData[messageData.length - 1];
  useEffect(() => {
    if (hasAnsi(ansiMessage)) {
      const message = { isUser: false, ...removeAnsiGetColor(ansiMessage) };
      setEssentialMessages((prevMessages) => [...prevMessages, message]);
    } else if (checkInfoStrings(ansiMessage)) {
      setInfoMessages((prevMessages) => [...prevMessages, ansiMessage]);
    }

  }, [messageData]);
  return (
    <div>
      <Button
        style={{
          marginBottom: '0.4rem',
          backgroundColor: '#ff713c',
          color: '#fff',
          borderRadius: '0',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
        className='home-button'
        onClick={() => navigate('/')}>
        Home
      </Button>
      <Chat
        essentialMessages={essentialMessages}
        handleSendMessage={handleSendMessage}
        toggleConnection={toggleConnection}
        settings={settings}
        connect={connect}
      />
      <Spinner
        style={{
          position: 'absolute',
          top: '92%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          display: (!ansiMessage.includes('Thinking')) ? 'none' : 'block',
        }}
      size='large' />
      <Spinner
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          display: (!connect || essentialMessages.length !== 0)  ? 'none' : 'block',
        }}
      size='large' />
      
    </div>
  );
};

export default ChatView;