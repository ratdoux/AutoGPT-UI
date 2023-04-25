const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.EVENT_DISPATCHER_PORT || 45000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports.startServer = (mainWindow) => {
  // Your Express server setup code ...

  app.post('/events', (req, res) => {
    console.log('Received event:', req.body);

    // Send an IPC message to the renderer process with the event data
    if (mainWindow) {
      mainWindow.webContents.send('eventReceived', req.body);
    }

    res.sendStatus(200);
  });

  // ...
};