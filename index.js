const socketIOClient = require('socket.io-client');
const { rhEndpoint, options } = require('./config');

const getData = require('./get-data');


const express = require('express');
const app = express();

const cors = require("cors");

const port = 3011;
const server = app.listen(port, () => {
  console.log('connected to port: '+ port)
});

app.options('*', cors()); 

app.get('*', async (req, res) => {
  const ip = req.header('cf-connecting-ip') || (req.header('x-forwarded-for') || req.connection.remoteAddress).split(', ').pop();
  const userAgent = req.headers['user-agent'];
  if (userAgent.toLowerCase().includes('bot')) return {};
  console.log({ ip });
  const data = await getData(ip);
  res.json(data);
});