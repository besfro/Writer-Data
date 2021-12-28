const fs = require('fs')
const path = require('path')
const axios = require('axios')
const express = require('express')

const app = express()

const port = 3100
const BIG_FILE_PATH = './file.png'
const SMALL_FILE_PATH = './file2.png'
const TRANSFER_TYPE_STREAM = 'stream'
const TRANSFER_TYPE_BUFFER = 'buffer'

app.use(require('express-status-monitor')())

app.get('/download', (req, res) => {
  const url = req.query.path
  fs.stat(url, (err, stat) => {
    const fileType = url.match(/^\.\/\w+\.(\w+)$/)[1]
    res.setHeader('content-disposition', `file-${Date.now()}.${fileType}`)
    res.setHeader('content-length', stat.size)
    fs.createReadStream(url).pipe(res)
  })
})

function getRemoteResource (res, path, responseType = TRANSFER_TYPE_STREAM) {
  axios.get(`http://127.0.0.1:${port}/download?path=${path}`, {
    responseType,
    withCredentials: true
  })  
  .then(response => {
    const disposition = response.headers["content-disposition"]
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', disposition)
    res.setHeader('Content-Length', response.headers['content-length'])
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (responseType === TRANSFER_TYPE_BUFFER) {
      res.end(response.data)
    } else if (responseType === TRANSFER_TYPE_STREAM) {
      response.data.pipe(res)
    } else {
      res.send({ message: 'use wrong response type' })
    }
  })
}

app.get('/api/export', (req, res) => {
  const { fileType, transferType } = req.query

  const path = {
    0: SMALL_FILE_PATH,
    1: BIG_FILE_PATH
  }[fileType] || SMALL_FILE_PATH

  const type = {
    0: TRANSFER_TYPE_STREAM,
    1: TRANSFER_TYPE_BUFFER
  }[transferType] || TRANSFER_TYPE_STREAM

  getRemoteResource(res, path, type)
})


app.get('/mul-export', (req, res) => {
  res.sendFile(path.join(process.cwd(), './mul-export.html'))
})

app.get('/upload', (req, res) => {
  res.sendFile(path.join(process.cwd(), './upload.html'))
})


app.listen(port)
console.log(`listen on http://127.0.0.1:${port}`)