import { useEffect } from 'react';

// ...

const EventHandler = ({nodeState, setNodeState}) =>  {

  useEffect(() => {
    const handleEventReceived = (_event, data) => {
      setNodeState([...nodeState, _event])
      // Handle the event data in your React frontend
    };

    // Listen for the 'eventReceived' IPC message
    window.electron.ipcRenderer.on('eventReceived', handleEventReceived);

    // Clean up the listener when the component is unmounted
    return () => {
      window.electron.ipcRenderer.off('eventReceived', handleEventReceived);
    };
  }, []);

  return null;
}

export default EventHandler;