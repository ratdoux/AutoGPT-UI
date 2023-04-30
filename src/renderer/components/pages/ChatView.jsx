import React, { useState, useEffect } from 'react';
import Chat from '../chat/Chat';
import { useWebSocket } from '../communication/WebsocketHandler';
import { useWebSocketContext } from 'renderer/context/WebSocketProvider';
import {
  checkStringAgainstInfoStringArray,
  hasAnsi,
  removeAnsiAndGetColor,
  addReturn,
  splitAtomicActionString,
  removeFirstColon
} from '../utils/ParsingFunctions';
const ChatView = () => {
    const [essentialMessages, setEssentialMessages] = useState([]);
    const [infoMessages, setInfoMessages] = useState([]);
    const [connect, setConnect] = useState(false);
    const { messageData } = useWebSocketContext();
  
    const { sendMessage } = useWebSocket('ws://localhost:8080/', connect);
  
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
        const message = { isUser: false, ...removeAnsiAndGetColor(ansiMessage) };
        setEssentialMessages((prevMessages) => [...prevMessages, message]);
      } else if (checkStringAgainstInfoStringArray(ansiMessage)) {
        setInfoMessages((prevMessages) => [...prevMessages, ansiMessage]);
      }
  
    }, [messageData]);
    return (
        <div>
            <Chat 
                essentialMessages={essentialMessages}
                handleSendMessage={handleSendMessage}
                toggleConnection={toggleConnection}
                connect={connect}
            />
        </div>
    );
};

export default ChatView;