const path = require('path');
const { fork } = require('child_process');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

const ADDRESS = "192.168.68.115";
const PORT = 6455;

const artnetChild = fork(path.join(__dirname, '/child-artnet.js'), [ADDRESS, PORT]);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/random-colours', (req, res) => {
  console.log(`Artnet Bridge Server request`)
  res.statusCode = 200
  res.end()

  artnetChild.send({
    0: 255,
    1: Math.round(Math.random() * 255),
    2: Math.round(Math.random() * 255),
    3: Math.round(Math.random() * 255)
  });
})

app.post('/artnet-object', (req, res) => {
  console.log(`Artnet Bridge Server request`)
  res.header("Access-Control-Allow-Origin", "*");
  res.statusCode = 200
  res.end()
  artnetChild.send(req.body);
})

app.listen(PORT, () => {
  console.log(`Artnet Bridge Server listening on port ${PORT}`)
})

process.on( 'SIGTERM', function () {
  console.log("Ending Process");
  artnetChild.kill();
  server.close(function () {
    console.log("Finished all requests");
  });
});