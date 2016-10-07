'use strict'

const socket = io();
let currentGame;


//listener

socket.on('connect', () => {
  console.log(`User connected ${socket.id}`);
});
socket.on('player joined', (game) => {
  console.log("Player joined room", game._id);
  currentGame = game;
});
