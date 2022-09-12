require("dotenv").config();
const express = require('express')
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../client/dist'))

app.get('/api', (req, res) => {
  res.send(`Hello from Express`)
});

const http = require("http");
const hostname = '127.0.0.1';


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})