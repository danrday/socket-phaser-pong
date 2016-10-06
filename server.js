'use strict'

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const app = express()
const server = Server(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/pong'

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))
//
app.get('/game/new', (req, res) => {
  res.render('newgame')
  // Game.find().then(games => res.render('index', { games }))
})

app.get('/game/singleplayer', (req, res) => {
  res.render('singleplayer')
})

app.get('/game/twoplayer', (req, res) => {
  res.render('twoplayer')
})


mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
  server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
})

const Game = mongoose.model('game', {
  score: {
    player1: String,
    player2: String,
  },
  result: String,
})


io.on('connect', socket => {
  console.log("socket connected:", socket)
  socket.on('update coordinates', data => console.log("data:", data))
  socket.on('disconnect', () => console.log("DISCONNECTED:", socket))
})
