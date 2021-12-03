const net = require('net')
const crypto = require('crypto')

function createWebsocketKey (clientKey) {
  // https://tools.ietf.org/html/rfc6455#section-5.5.2
  const GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
  const sha1 = crypto.createHash('sha1')
  const hash = sha1.update(clientKey + GUID)
  return hash.digest('base64')
}

function dataNormailize (chunk) {
  const chunkString = chunk.toString('utf8')
  const headerArr = chunkString.split(/\r\n/)
  const line0 = headerArr.shift()
  const [ method, path, protocol ] = line0.split(/\s/) || []
  const headers = Object.fromEntries(
    headerArr.map(item => item.split(': '))
  )
  return {
    method, 
    path, 
    protocol,
    headers
  }
}

const server = net.createServer(socket => {
  
  socket.on('data', chunk => {
    const data = dataNormailize(chunk)
    const { Connection, Upgrade } = data.headers

    if (socket.handshaking) {
      // 服务端主动发消息 Hi, Client! l'm Server.
      let dataBuffer = Buffer.from(`Hi, Client! l'm Server.`)
      let payload_len = dataBuffer.length
      let assistData = []
      assistData.push(129)
      assistData.push(payload_len)
      let assistBuffer = Buffer.from(assistData)
      let message = Buffer.concat([assistBuffer, dataBuffer])
      console.log(message)
      socket.write(message)

    } else if (Connection === 'Upgrade' && Upgrade === 'websocket') {

      const { 'Sec-WebSocket-Key': secWebsocketKey, 'Sec-WebSocket-Version': secWebsocketVersion } = data.headers
      socket.write('HTTP/1.1 101 Switching Protocols\r\n')
      socket.write('Connection: Upgrade\r\n')
      socket.write('Upgrade: websocket\r\n')
      socket.write(`Sec-WebSocket-Accept: ${createWebsocketKey(secWebsocketKey)}\r\n`)
      socket.write(`Sec-WebSocket-Version: ${secWebsocketVersion}\r\n`)
      socket.write('\r\n')
      socket.handshaking = true

    } else {

      socket.destroy()
    }

  })

})


const port = 3666
server.on('listening', () => console.log(`
  listen on port ${port}...
  visit http://127.0.0.1:${port}
`))
server.on('error', err => console.log(`start fail: ${error}`))
server.listen(port)


