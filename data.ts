{
  "name": "circuit-breaker-nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "orders": "node order-service/index.js"
  },
 
  "dependencies": {
    "@mollitia/prometheus": "0.0.8",
    "express": "^4.18.1",
    "mollitia": "0.0.8",
    "request": "^2.88.2"
  },

}
