import React, { useEffect, useRef } from 'react';
import { useWebSocketContext } from "renderer/context/WebSocketProvider";

const useWebSocket = (url, connect) => {
    const { messageData, setMessageData } = useWebSocketContext();
    const wsRef = useRef(null);

    const sendMessage = (message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            console.log('SEND: ' + message);
            wsRef.current.send(message);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    useEffect(() => {
        if (connect) {
            wsRef.current = new WebSocket(url);

            wsRef.current.onopen = function () {
                console.log('CONNECT');
            };

            wsRef.current.onclose = function () {
                console.log('DISCONNECT');
            };

            wsRef.current.onmessage = function (event) {
                if (event.data instanceof Blob) {
                    const reader = new FileReader();

                    reader.onload = function () {
                        stringBuffer += reader.result;
                        const data = processBuffer();
                        if (data) {
                            setMessageData((prevMessageData) => [...prevMessageData, data]); // Use functional update
                        }
                    };

                    reader.readAsText(event.data);
                } else {
                    stringBuffer += event.data;
                    const data = processBuffer();
                    if (data) {
                        setMessageData((prevMessageData) => [...prevMessageData, data]); // Use functional update
                    }
                }
            };
        } else {
            if (wsRef.current) {
                wsRef.current.close();
            }
        }

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [url, setMessageData, connect]);

    return { sendMessage };
};



let stringBuffer = '';

function processBuffer() {
    const continuePattern = ['Continue (y/n):', 'Input:', 'Thinking...', 'AI Name:', 'Terminate batch job (Y/N)?', 'is:', 'Goal', 'goal', 'Goal 1', 'Goal 2:', 'Goal 3:', 'Goal 4:', 'Goal 5:'];
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
        const toReturn = stringBuffer.trim();
        stringBuffer = '';
        return toReturn;
    } else {
        const newlineIndex = stringBuffer.indexOf('\n');
        let toReturn;
        if (newlineIndex !== -1) {
            toReturn = stringBuffer.slice(0, newlineIndex).trim();
            stringBuffer = stringBuffer.slice(newlineIndex + 1);
        }
        return toReturn;
    }
}


export { useWebSocket };