##### Installation:

1. npm i
2. nodemon index.js

##### Requirements:

Tested on Node in version v14.16.1

##### Usage:

To test API, connect with one of the four endpoints:

- ws://localhost:8080/stream1
- ws://localhost:8080/stream2
- ws://localhost:8080/stream3
- ws://localhost:8080/stream4

To do that, you need a client, or dedicated application, which is able to make websocket's specific requests, such as Firecamp.

Each of endpoitns simulates separate streams. The service has a limit of 3 concurrent connections per user. Therefore, if you will want to connect with fourth endpoint, your attempt will be rejected.
