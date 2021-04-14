const http = require('http');
const WebSocket = require('ws');
const url = require('url');

let map = {};

const server = http.createServer();
const wss1 = new WebSocket.Server({ noServer: true, clientTracking: true });
const wss2 = new WebSocket.Server({ noServer: true, clientTracking: true });
const wss3 = new WebSocket.Server({ noServer: true, clientTracking: true });
const wss4 = new WebSocket.Server({ noServer: true, clientTracking: true });

wss1.on('connection', function connection(ws) {
  ws.send('Welcome to stream 1');
});

wss2.on('connection', function connection(ws) {
  ws.send('Welcome to stream 2');
});

wss3.on('connection', function connection(ws) {
  ws.send(`Welcome to stream 3`);
});

wss4.on('connection', function connection(ws) {
  ws.send('Welcome to stream 4');
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
  const ip = request.socket.remoteAddress;

  map[ip] = map[ip] || [];

  if (pathname === '/stream1') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
      ws.send(`user: ${ip}`);
      map[ip].push('/stream1') || ['/stream1'];
      ws.send(`user is connected to: ${map[ip]}`);
    });
  } else if (pathname === '/stream2') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
      map[ip].push('/stream2');
      ws.send(`user is connected to: ${map[ip]}`);
    });
  } else if (pathname === '/stream3') {
    wss3.handleUpgrade(request, socket, head, function done(ws) {
      wss3.emit('connection', ws, request);
      map[ip].push('/stream3');
      ws.send(`user is connected to: ${map[ip]}`);
    });
  } else if (pathname === '/stream4') {
    wss4.handleUpgrade(request, socket, head, function done(ws) {
      wss4.emit('connection', ws, request);
      map[ip].push('/stream4');
      ws.send(`user is connected to: ${map[ip]}`);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);
