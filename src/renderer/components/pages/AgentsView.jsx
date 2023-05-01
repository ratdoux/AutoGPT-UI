import React, { useState, useEffect } from 'react';
import { Button, Drawer, Page, Grid, Text, Card, Spacer } from '@geist-ui/core';
import { ArrowLeft, ArrowRight, User, LifeBuoy } from '@geist-ui/icons';
import BubbleForceDirectedTree from '../d3/BubbleForceDirectedTree';
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
import Chat from '../chat/Chat';
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
        <BubbleForceDirectedTree data={data} width={600} height={600} />
      </div>
      <AgentsUI
        essentialMessages={essentialMessages}
        handleSendMessage={handleSendMessage}
        toggleConnection={toggleConnection}
        connect={connect}
      />
      <div style={{ width: "100%", overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        {infoMessages[infoMessages.length - 1] &&
          <Card type={'cyan'} width="100%">
            {infoMessages[infoMessages.length - 1]}
          </Card>
        }
      </div>
    </Page>
  );
};

export default AgentsView;

const AgentsUI = ({ essentialMessages, handleSendMessage, toggleConnection, connect }) => {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  //remove nulls from array functon
  const removeNulls = (array) => {
    return array.filter((value) => value != null);
  };

  const GPTBubble = ({ message, color }) => {

    const BubbleHighlights = ({ data }) => {
      const line = splitAtomicActionString(data);
      if (!line.atomic) {
        return (
          <Text
            style={{
              marginTop: '3px',
              marginBottom: '3px',
            }}
          >
            {line.rest}
          </Text>
        )
      } else {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginTop: '3px',
                marginBottom: '3px',
                marginRight: '2px',
                minWidth: '120px',
                backdropFilter: 'invert(10%)',
                maxWidth: '120px',
                border: '1px solid black',
                display: 'flex',
                fontSize: '100%',
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {line.atomic}
            </Text>
            <Text
              style={{
                marginTop: '3px',
                marginBottom: '3px',
              }}
            >
              {removeFirstColon(line.rest)}
            </Text>
          </div>
        )
      }
    };

    return (
      <div>
        <div style={{
          padding: '8px',
          paddingRight: '15px',
          paddingLeft: '15px',
          background: color,
          maxWidth: '100%',
          wordWrap: 'break-word',
          borderTop: '2px solid #e6e6e6',
          borderLeft: '2px solid #e6e6e6',
          borderRight: '2px solid black',
          borderBottom: '2px solid black',
        }}>
          {addReturn(message).map((data, index) => (
            // line[0] is the atomic action, line[1] is the rest, if no atomic action, line[0] is empty
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <BubbleHighlights key={index} data={data} />
            </div>
          ))}
        </div>
        <Spacer h={0.2} />
      </div>
    )
  };

  const USERBubble = ({ message }) => (
    <div>
      <div style={{
        padding: '8px',
        paddingRight: '15px',
        paddingLeft: '15px',
        background: '#e6e6e6',
        color: 'black',
        maxWidth: '100%',
        wordWrap: 'break-word',
        borderTop: '4px double white',
        borderLeft: '4px double white',
        borderRight: '4px double black',
        borderBottom: '4px double black',
      }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>{message}</Text>
          <User />
        </div>
      </div>
      <Spacer h={0.2} />
    </div>
  );

  return (
    <Page
      style={{
        maxHeight: '0',
        minHeight: '0',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}

    >
      <Grid.Container
        alignItems="center"
        justify="flex-end"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          marginBottom: '1rem',
          paddingTop: '5px !important'
        }}
      >
        <Grid.Container
          direction='column'
          alignItems="flex-end"
          justify="flex-end"
          gap={2}
        >
          <Grid style={{ marginRight: '10px' }}>
            <Button auto icon={<ArrowLeft />} scale={1 / 2} onClick={toggleDrawer} />
          </Grid>
          <Grid marginBottom='5px'>
            <Button auto onClick={toggleConnection}>
              {connect ? 'Disconnect' : 'Connect'}
            </Button>
          </Grid>
        </Grid.Container>
      </Grid.Container>
      <Drawer style={{
        backgroundColor: "#33415c",
        paddingTop: '5px',
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '0',
      }} visible={drawerState} onClose={toggleDrawer} placement="right">
        <Grid >
          <Button auto icon={<ArrowRight />} scale={1 / 2} onClick={toggleDrawer} />
        </Grid>
        <Drawer.Content style={{
          paddingRight: 0,
          paddingLeft: 0,
          paddingTop: '10px',
        }}>
          <Chat 
                essentialMessages={essentialMessages}
                handleSendMessage={handleSendMessage}
                toggleConnection={toggleConnection}
                connect={connect}
            />
        </Drawer.Content>
      </Drawer>
    </Page>
  );
};