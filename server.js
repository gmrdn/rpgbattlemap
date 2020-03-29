const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/grid', (req, res) => {
  res.send({ grid: 'grid response from API' });
});

app.get('/chat/:roomid', (req, res) => {
  res.send({
    logs: [
      { nickname: 'Ringo', message: `Hello room ${req.params.roomid}` },
      { nickname: 'Georges', message: "Hi Ringo, what's up ?" },
    ],
  });
});
