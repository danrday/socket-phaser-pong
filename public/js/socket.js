'use strict'

const socket = io();


//listener

socket.on('connect', () => console.log("user connected:", socket))
