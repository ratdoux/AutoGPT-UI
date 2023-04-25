import React, { useState, useRef } from 'react';

const WebsocketConnection = () => {
    const [connectionState, setConnectionState] = useState(false);
    const [connectionMessage, setConnectionMessage] = useState('Not Connected');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    const toggleConnection = () => {
        if (connectionState) {
            socketRef.current.close();
            setConnectionState(false);
            setConnectionMessage('Not Connected');
        } else {
            console.log('Connecting to websocket...');
            socketRef.current = new WebSocket('ws://localhost:8080');

            socketRef.current.onopen = () => {
                setConnectionState(true);
                setConnectionMessage('Connected');
                // Add listeners here
                socketRef.current.addEventListener('message', (event) => {
                    console.log('Message from server ', event.data);
                    setMessages((messages) => [...messages, event.data]);
                });
            };
        }
    };

    return (
        <div>
            <button onClick={() => toggleConnection()}>
                {connectionMessage}
            </button>
            <p>Messages:</p>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    );
};

export default WebsocketConnection;
