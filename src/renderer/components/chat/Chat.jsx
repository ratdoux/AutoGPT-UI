import React, { useState, useEffect } from 'react';
import { Button, Drawer, Page, Grid, Text, Card, Spacer } from '@geist-ui/core';
import { ArrowLeft, ArrowRight, User, LifeBuoy } from '@geist-ui/icons';
import {
  addReturn,
  splitAtomicActionString,
  removeFirstColon
} from '../utils/ParsingFunctions';

import ChatInput from './ChatInput';

const Chat = ({ essentialMessages, handleSendMessage, toggleConnection, connect }) => {
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
    <div
      style={{
        paddingLeft: '10px',
      }}
    >
      <Grid.Container
        alignItems="center"
        justify="flex-end"
        style={{
          paddingTop: '5px !important',
        }}
      >
        <Grid.Container
          direction='column'
          alignItems="center"
          justify="center"
          gap={2}
        >
          <Grid marginBottom='5px'>
            <Button auto onClick={toggleConnection}>
              {connect ? 'Disconnect' : 'Connect'}
            </Button>
          </Grid>
        </Grid.Container>
      </Grid.Container>
      <div
        style={{
          overflowY: 'scroll',
          height: 'calc(100vh - 110px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {essentialMessages.map((message, index) => (
          message.isUser ?
            <USERBubble key={index} message={message.message} />
            :
            <GPTBubble key={index} color={message.color} message={message.message} />
        ))}
      </div>
      <ChatInput onSubmit={(message) => handleSendMessage(message)} />
    </div>
  );
};

export default Chat;