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

app.get('/', (req, res) => {
  Game.find({ gameType: 'multiple' })
  .then(games => res.render('index', { games }))

})

//
app.get('/game/new', (req, res) => {
  res.render('newgame')
})

app.get('/game/singleplayer', (req, res) => {
  Game.create({ gameType: 'single' })
  .then(game => res.redirect(`/game/${game._id}`))
})

app.get('/game/twoplayer', (req, res) => {
  Game.create({ gameType: 'multiple', gameDisplayId: Math.floor(Math.random() * (1000 - 0 + 1)) + 0 })
  .then(game => res.redirect(`/game/${game._id}`))
})

app.get('/game/clone', (req, res) => {
  res.render('serverclone')
})

app.get('/game/:id', (req, res) => {
  console.log("Test req.url", req.params.id);
  Game.findOne({ _id: req.params.id })
  .then((game) => {
    if (game.gameType === 'single') {
      res.render('singlePlayer');
    } else {
      res.render('multiplayer');
    }
  });
})


mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
  server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
})

const Game = mongoose.model('game', {
  score: {
    player1: {
      type: Number,
      default: 0
    },
    player2: {
      type: Number,
      default: 0
    },
  },
  result: String,
  player1: String,
  player2: String,
  gameType: String,
  gameDisplayId: String
})


const attemptToJoinGameAsPlayer = (game, socket) => {
  if (hasTwoPlayers(game)) {
    //SO THIS RETURN KILLS THE REST OF THE .THENS?
    return game
  }

  if (hasZeroPlayers(game)) {
    game.player1 = socket.id
  } else if (game.player1 && !game.player2) {
    // player1 already connected and player2 is available
    game.player2 = socket.id
  }

  return game
}

const hasTwoPlayers = game => !!(game.player1 && game.player2)
const hasZeroPlayers = game => !game.player1 && !game.player2

io.on('connect', socket => {
  const id = socket.handshake.headers.referer.split('/').slice(-1)[0]

  Game.findById(id)
  .then(game => attemptToJoinGameAsPlayer(game, socket))
  .then(game => game.save())
  .then(game => {
    socket.gameId = game._id
    socket.player1Id = game.player1
    socket.player2Id = game.player2
    socket.join(game._id)
    io.to(game._id).emit('player joined', game)
  })
  .catch(err => {
    socket.emit('error', err)
    console.error(err)
  })

  console.log(`Socket connected: ${socket.id}`)

  socket.on('start room game', (data) => {
    console.log("Start room game", data);
    if (data) {
      io.to(socket.gameId).emit('start game', true)
    }
  });

  socket.on('update coordinates', data => {
    //Determine which player moved
    io.to(socket.gameId).emit('new coords', data );
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    // handleDisconnect(socket)
  })
})

const handleDisconnect = socket => {
  Game
    .findById(socket.gameId)
    .then(game => {
      if (!game.result && (socket.id === game.player1 || socket.id === game.player2)) {
        game.result = 'Disconnect'
      }
      //WHAT DOES THIS RETURN DO???
      return game.save()
    })
    .then(g => io.to(g._id).emit('player disconnected', g))
    .catch(console.error)
}
