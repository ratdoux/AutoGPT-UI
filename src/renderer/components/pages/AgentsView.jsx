import React, { useState, useEffect } from 'react';
import { Button, Drawer, Page, Grid } from '@geist-ui/core';
import { ArrowLeft, Menu } from '@geist-ui/icons';
import BubbleForceDirectedTree from '../d3/BubbleForceDirectedTree';
import {  useWebSocket } from '../communication/WebsocketHandler';
import { useWebSocketContext } from 'renderer/context/WebSocketProvider';
const AgentsView = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [nodeState, setNodeState] = useState([]);
  const [connect, setConnect] = useState(false);

  const { messageData } = useWebSocketContext();

  const { sendMessage } = useWebSocket('ws://localhost:8080/', connect);

  const toggleConnection = () => {
    setConnect((prevConnect) => !prevConnect);
  };

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

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
      <AgentsUI />
      <button onClick={toggleConnection}>
        {connect ? 'Disconnect' : 'Connect'}
      </button>
      <button onClick={() => handleSendMessage("y")}>Send y</button>
      <button onClick={() => handleSendMessage("n")}>Send n</button>
      <button onClick={() => handleSendMessage("y -N")}>BRRRR</button>
      <input type="text" id="input" />
      <button onClick={() => handleSendMessage(document.getElementById("input").value)}>Send input</button>
      <p>Received data: {messageData}</p>
    </Page>
  );
};

export default AgentsView;

const AgentsUI = () => {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };


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
        <Grid>
          <Button auto icon={<ArrowLeft />} scale={1 / 2} onClick={toggleDrawer} />
        </Grid>
      </Grid.Container>
      <Drawer visible={drawerState} onClose={toggleDrawer} placement="right">
        <Drawer.Title>Drawer</Drawer.Title>
        <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
        <Drawer.Content>
        </Drawer.Content>
      </Drawer>
    </Page>
  );
};