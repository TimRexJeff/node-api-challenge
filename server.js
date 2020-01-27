const express = require('express')
const actionRouter = require('./actions/actionRouter.js')
const projectRouter = require('./projects/projectRouter.js')

const server = express()

server.use(logger)
server.use(express.json())
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's Sprint!</h2>`)
})

//custom middleware

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  console.log(`[${timestamp}] ${req.method} to ${req.originalUrl}`)

  next()
}

module.exports = server