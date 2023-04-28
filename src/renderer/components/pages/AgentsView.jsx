import React, { useState, useEffect } from 'react';
import { Button, Drawer, Page, Grid, Text } from '@geist-ui/core';
import { ArrowLeft, ArrowRight, Menu } from '@geist-ui/icons';
import BubbleForceDirectedTree from '../d3/BubbleForceDirectedTree';
import {  useWebSocket } from '../communication/WebsocketHandler';
import { useWebSocketContext } from 'renderer/context/WebSocketProvider';
import { checkStringAgainstInfoStringArray, hasAnsi, removeAnsi } from '../utils/ParsingFunctions';
import ChatInput from '../chat/ChatInput';
const AgentsView = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [nodeState, setNodeState] = useState([]);
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
  };

  const ansiMessage = messageData[messageData.length - 1];

  useEffect(() => {
    if (hasAnsi(ansiMessage)) {
      const message = removeAnsi(ansiMessage);
      setEssentialMessages((prevMessages) => [...prevMessages, message]);
    } else if (checkStringAgainstInfoStringArray(ansiMessage)) {
      setInfoMessages((prevMessages) => [...prevMessages, ansiMessage]);
    }

  }, [messageData]);

  console.log(essentialMessages)

  const data = {
    name: "root",
    children: [
      { name: "child #1" },
      {
        name: "child #2",
        children: [
          { name: "grandchild #1" },
          { name: "grandchild #2" },
          { name: "grandchild #3" }
        ]
      }
    ]
  };
  return (
    <Page>
      <div>
        <BubbleForceDirectedTree data={data} width={800} height={800} />
      </div>
      <AgentsUI essentialMessages={essentialMessages} handleSendMessage={handleSendMessage}/>
      <button onClick={toggleConnection}>
        {connect ? 'Disconnect' : 'Connect'}
      </button>
      <button onClick={() => handleSendMessage("y")}>Send y</button>
      <button onClick={() => handleSendMessage("n")}>Send n</button>
      <button onClick={() => handleSendMessage("y -N")}>BRRRR</button>
      <input type="text" id="input" />
      <button onClick={() => handleSendMessage(document.getElementById("input").value)}>Send input</button>
      <div style={{ width:"50%", overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        <p>{infoMessages[infoMessages.length - 1]}</p>
      </div>
    </Page>
  );
};

export default AgentsView;

const AgentsUI = ({essentialMessages, handleSendMessage}) => {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };


  const ChatBubble = ({ message }) => (
    <div style={{ padding: '8px', borderRadius: '12px', background: '#f3f3f3', marginBottom: '8px', maxWidth: '100%', wordWrap: 'break-word' }}>
      <Text>{message}</Text>
    </div>
  );

  return (
    <Page
      style={{ maxHeight: '0', minHeight: '0', overflow: 'hidden' }}

    >
      <Grid.Container
        alignItems="center"
        justify="flex-end"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Grid >
          <Button auto icon={<ArrowLeft />} scale={1 / 2} onClick={toggleDrawer} />
        </Grid>
      </Grid.Container>
      <Drawer visible={drawerState} onClose={toggleDrawer} placement="right">
        <Drawer.Title>Chat</Drawer.Title>
        <Grid >
          <Button auto icon={<ArrowRight />} scale={1 / 2} onClick={toggleDrawer} />
        </Grid>
        <Drawer.Content>
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            {essentialMessages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
          </div>
          <ChatInput onSubmit={(message) => handleSendMessage(message)} />
        </Drawer.Content>
        
      </Drawer>
    </Page>
  );
};