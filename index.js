const WebSocket = require('ws')
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT })
wss.on('connection', ws => {
  console.log('New client connected!')
  ws.send('connection established')
  ws.on('close', () => console.log('Client has disconnected!'))
  ws.on('message', data => {
    sockserver.clients.forEach(client => {
      console.log(`distributing message: ${data}`)
      client.send(`${data}`)
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})