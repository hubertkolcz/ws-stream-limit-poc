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

##### Next steps:

- Make the code more generic
- dynamic endpoints
- handling edge cases, i.e. with ping/pong implementation
- additional user authentication, based on device name/tokens
- in-store Redis/Memchaned database
- Refactor into TypeScript format
- Attaching loggers (Winston)
- Adding automated tests (Jest)
- Monitoring with PM2
- Moving the app to AWS
- Scale-out on AWS Cloud
- Monitoring API with API Gateway and CloudWatch metrics
- Load tests with Apache jMeter

##### Scaling Strategy:
- To make the API more usable, it should be stand together with client which will handle HTTP/s requests. Therefore, it could be easily deployed to an online service, such as Heroku. Alternatively, it could be directly developed with the use of AWS API Gataway's like service. Moreover, it would allow to use 'socket.io' library and its Namespaces, so making easier to generate dynamic API endpoints.

- For load balancing, there could be used ELB Approach, such as described here: https://dzone.com/articles/load-balancing-of-websocket-connections#:~:text=The%20server%20can%20handle%2065%2C536,network%20interfaces%20to%20a%20server.

- API Rate Limiting should also be implemented, such as in examples with the use of Bottleneck library: 
https://nordicapis.com/everything-you-need-to-know-about-api-rate-limiting/
another approach includes using Tyk library.

- For streaming itself, it could be used xdStreaming.
