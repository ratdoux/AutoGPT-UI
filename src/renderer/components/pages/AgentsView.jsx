import React, { useState } from 'react';
import { Button, Drawer, Page, Grid } from '@geist-ui/core';
import { ArrowLeft, Menu } from '@geist-ui/icons';
import BubbleForceDirectedTree from '../d3/BubbleForceDirectedTree';
import EventHandler from '../communication/EventHandler';

const AgentsView = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [nodeState, setNodeState] = useState([]);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  var ws = new WebSocket('ws://localhost:8080/');
  ws.onopen = function () {
    console.log('CONNECT');
  };
  ws.onclose = function () {
    console.log('DISCONNECT');
  };

  let stringBuffer = '';

  function processBuffer() {
    const continuePattern = ['Continue (y/n):', 'Input:', 'Thinking...', 'AI Name:', 'Terminate batch job (Y/N)?', 'is:', 'Goal', 'goal', 'Goal 1', 'Goal 2:','Goal 3:', 'Goal 4:','Goal 5:'];
    //function that checks if the buffer contains a continue pattern from the list above
    function checkContinuePattern() {
      for (let i = 0; i < continuePattern.length; i++) {
        if (stringBuffer.includes(continuePattern[i])) {
          return true;
        }
      }
      return false;
    }
    if (checkContinuePattern()) {
      console.log('MESSAGE: ' + stringBuffer.trim());
      stringBuffer = '';
    } else {
      const newlineIndex = stringBuffer.indexOf('\n');

      if (newlineIndex !== -1) {
        console.log('MESSAGE: ' + stringBuffer.slice(0, newlineIndex).trim());
        stringBuffer = stringBuffer.slice(newlineIndex + 1);
      }
    }
  }

  ws.onmessage = function (event) {
    if (event.data instanceof Blob) {
      const reader = new FileReader();

      reader.onload = function () {
        stringBuffer += reader.result;
        processBuffer();
      };

      reader.readAsText(event.data);
    } else {
      stringBuffer += event.data;
      processBuffer();
    }
  };




  function sendWsMessage(message) {
    console.log('SEND: ' + message);
    ws.send(message);
  }

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
  console.log(nodeState)
  return (
    <Page>
      <div>
        <BubbleForceDirectedTree data={data} width={800} height={800} />
      </div>
      <EventHandler nodeState={nodeState} setNodeState={setNodeState} />
      <AgentsUI />
      <button onClick={() => sendWsMessage("y")}>Send y</button>
      <button onClick={() => sendWsMessage("n")}>Send n</button>
      <button onClick={() => sendWsMessage("y -N")}>BRRRR</button>
      <input type="text" id="input" />
      <button onClick={() => sendWsMessage(document.getElementById("input").value)}>Send input</button>
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