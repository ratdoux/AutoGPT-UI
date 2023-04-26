import { createContext, useContext, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [messageData, setMessageData] = useState([]);

  return (
    <WebSocketContext.Provider value={{ messageData, setMessageData }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
