const http = require('http');
const WebSocket = require('ws');
const url = require('url');

let map = {};

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const server = http.createServer();
const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });
const wss3 = new WebSocket.Server({ noServer: true });
const wss4 = new WebSocket.Server({ noServer: true });

const interval1 = setInterval(function ping() {
  wss1.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      console.log('connection with stream 1 was lost');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 3000);

const interval2 = setInterval(function ping() {
  wss1.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      console.log('connection with stream 2 was lost');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(noop);
    console.log('111');
  });
}, 3000);

const interval3 = setInterval(function ping() {
  wss1.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      console.log('connection with stream 3 was lost');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 3000);

const interval4 = setInterval(function ping() {
  wss1.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      console.log('connection with stream 4 was lost');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 3000);

wss1.on('connection', function connection(ws, request) {
  ws.send('Welcome to stream 1');
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  let ip = request.socket.remoteAddress;

  ws.on('close', function close() {
    console.log('000');
    console.log(map);
    map[ip] = map[ip].filter((item) => item !== '/stream1');
    console.log(map);
    clearInterval(interval1);
  });
});

wss2.on('connection', function connection(ws, request) {
  ws.send('Welcome to stream 2');
  let ip = request.socket.remoteAddress;
  ws.on('close', function close() {
    console.log('000');
    console.log(map);
    map[ip] = map[ip].filter((item) => item !== '/stream2');
    console.log(map);
    clearInterval(interval2);
  });
});

wss3.on('connection', function connection(ws, request) {
  ws.send(`Welcome to stream 3`);
  let ip = request.socket.remoteAddress;
  ws.on('close', function close() {
    console.log('000');
    console.log(map);
    map[ip] = map[ip].filter((item) => item !== '/stream3');
    console.log(map);
    clearInterval(interval3);
  });
});

wss4.on('connection', function connection(ws, request) {
  ws.send('Welcome to stream 4');
  let ip = request.socket.remoteAddress;
  ws.on('close', function close() {
    console.log('000');
    console.log(map);
    map[ip] = map[ip].filter((item) => item !== '/stream4');
    console.log(map);
    clearInterval(interval4);
  });
});

wss1.on('message', function error(ws, request) {
  ws.send('You reached the limit of 3 streams. You cannot watch stream 1.');
});

wss2.on('message', function error(ws, request) {
  ws.send('You reached the limit of 3 streams. You cannot watch stream 2.');
});

wss3.on('message', function error(ws, request) {
  ws.send('You reached the limit of 3 streams. You cannot watch stream 3.');
});

wss4.on('message', function error(ws, request) {
  ws.send('You reached the limit of 3 streams. You cannot watch stream 4.');
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
  const ip = request.socket.remoteAddress;

  map[ip] = map[ip] || [];

  if (pathname === '/stream1') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      if (map[ip].length < 3) {
        console.log(map[ip].length);
        wss1.emit('connection', ws, request);
        ws.send(`user: ${ip}`);
        map[ip].push('/stream1') || ['/stream1'];
        ws.send(`user is connected to: ${map[ip]}`);
      } else {
        wss1.emit('message', ws, request);
        wss1.close();
      }
    });
  } else if (pathname === '/stream2') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      if (map[ip].length < 3) {
        wss2.emit('connection', ws, request);
        map[ip].push('/stream2');
        ws.send(`user is connected to: ${map[ip]}`);
      } else {
        wss2.emit('message', ws, request);
        wss2.close();
      }
    });
  } else if (pathname === '/stream3') {
    wss3.handleUpgrade(request, socket, head, function done(ws) {
      if (map[ip].length < 3) {
        wss3.emit('connection', ws, request);
        map[ip].push('/stream3');
        ws.send(`user is connected to: ${map[ip]}`);
      } else {
        wss3.emit('message', ws, request);
        wss3.close();
      }
    });
  } else if (pathname === '/stream4') {
    wss4.handleUpgrade(request, socket, head, function done(ws) {
      if (map[ip].length < 3) {
        wss4.emit('connection', ws, request);
        map[ip].push('/stream4');
        ws.send(`user is connected to: ${map[ip]}`);
      } else {
        wss4.emit('message', ws, request);
        wss4.close();
      }
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);
