const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.EVENT_DISPATCHER_PORT || 45000;

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  console.log('Received event:', req.body);
  // Handle the event data in your React Electron app
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
