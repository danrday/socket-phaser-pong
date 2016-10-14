'use strict'

let player1
let player2
let ball
let cursors
let topEdge
let bottomEdge
let ballX
let ballY

let globalData = {}

let player1_velocity;


const determinePlayer = function( currentGame, socket, player1, player2 ) {
  if ( currentGame.player1 === socket.id ) {
    return {
      player1_x : player1.body.x,
      player1_y: player1.body.y,
      player1_velocity: player1.body.velocity.y
    }
  } else if ( currentGame.player2 === socket.id ) {
    return {
      player2_x: player2.body.x,
      player2_y: player2.body.y,
      player2_velocity: player2.body.velocity.y
      // ball_x: ball.body.x,
      // ball_y: ball.body.y
    }
  }
}


socket.on('new coords', data => {
  globalData = data
})


//lag stuff



let player1Moving = false;
let player2Moving = false;

let opponentVelocity = 0;

socket.on('serverBallData', data => {
  if ( currentGame.player2 === socket.id ) {
    ball.body.x = data.x
    ball.body.y = data.y
    ball.body.velocity.x = data.xv
    ball.body.velocity.y = data.yv
  }
})


socket.on('player1Change', data=> {
  // console.log('player1data', data)
  if (currentGame.player2 === socket.id) {
    opponentVelocity = data.player1_velocity
    player1.body.x = globalData.player1_x
    player1.body.y = globalData.player1_y
  }
  player1Moving = !player1Moving
  // console.log('player1Moving', player1Moving)
})

socket.on('player2Change', data=> {
    console.log('player2data', data)
  if (currentGame.player1 === socket.id) {
    opponentVelocity = data.player2_velocity
    player2.body.x = globalData.player2_x
    player2.body.y = globalData.player2_y
  }
    console.log('player2Moving', player2Moving)
    player2Moving = !player2Moving
})


//lag stuff


let upKeyPress = false
let downKeyPress = false




// let upKeyRelease = false
// let downKeyRelease = false


let main = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //define bodies and enable physics
    player1 = game.add.sprite(20, 100, 'paddle');
    game.physics.arcade.enable(player1); // enable physics
    player1.body.immovable = true; //disable movement
    player2 = game.add.sprite(765, 200, 'paddle');
    game.physics.arcade.enable(player2); // enable physics
    player2.body.immovable = true; //disable movement
    ball = game.add.sprite(390, 300, 'ball');
    game.physics.arcade.enable(ball); // enable physics
    topEdge = game.add.sprite(0, 5, 'edge');
    game.physics.arcade.enable(topEdge); // enable physics
    topEdge.body.immovable = true; //disable movement
    bottomEdge = game.add.sprite(0, 580, 'edge');
    game.physics.arcade.enable(bottomEdge); // enable physics
    bottomEdge.body.immovable = true; //disable movement

    // start moving ball
    let direction = () => {
      if (Math.random() >= 0.5) {
        return -1
      } else {
        return 1
      }
    }
    ballX = (Math.floor(Math.random() * (1 + 150 - 50)) + 50) * direction()
    ballY = (Math.floor(Math.random() * (1 + 150 - 50)) + 50) * direction()
    ball.body.velocity.setTo(ballX, ballY)
    ball.body.bounce.set(1);


    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {


    if ( currentGame.player1 === socket.id ) {

    let setBallData = function() {
      return {
        x : ball.body.x,
        y : ball.body.y,
        xv : ball.body.velocity.x,
        yv : ball.body.velocity.y
      }
    }

    let ballData = setBallData()

    let emitBallData = function() {
      console.log("EMIT BALL DATA", ballData)
      socket.emit('ballData', ballData)
    }

    emitBallData()

    // setInterval(emitBallData, 1000)

    }


    // console.log('player1Moving', player1Moving)
    // console.log('player2Moving', player2Moving)

    // if ( Object.keys(globalData).length === 0 && globalData.constructor === Object ) {
    // } else {
      // if (globalData.player1_y) {
      //   // console.log("Player one coordinates set");
      //   player1.body.x = globalData.player1_x
      //   player1.body.y = globalData.player1_y
      // } else if (globalData.player2_y) {
      //   // console.log("Player two coordinates set");
      //   player2.body.x = globalData.player2_x
      //   player2.body.y = globalData.player2_y
      //   ball.body.x = globalData.ball_x
      //   ball.body.y = globalData.ball_y
      // }
    // }

    // if (player1Moving) {
    //   player1.body.x = globalData.player1_x
    //   player1.body.y = globalData.player1_y
    //   player1.body.velocity.y = globalData.player1_velocity
    // } else if (player2Moving) {
    //   player2.body.x = globalData.player2_x
    //   player2.body.y = globalData.player2_y
    //   player2.body.velocity.y = globalData.player2_velocity
    // }


    let accelBall = () => {
      let accel = 0.1
      if (ball.body.velocity.x > 0){
        ball.body.velocity.x += accel
      } else if (ball.body.velocity.x < 0){
        ball.body.velocity.x -= accel
      }
      if (ball.body.velocity.y > 0){
        ball.body.velocity.y += accel
      } else if (ball.body.velocity.y < 0){
        ball.body.velocity.y -= accel
      }
    }
    accelBall()

    let data = determinePlayer(currentGame, socket, player1, player2);




    //




    //

    //movement
    player1.body.velocity.y = 0;
    player1.body.velocity.x = 0;

    //movement for p2 -- temp
    player2.body.velocity.y = 0;
    player2.body.velocity.x = 0;


    if ( currentGame.player1 === socket.id ) {

      player2.body.velocity.y = opponentVelocity

      if(cursors.up.isDown) {
        if(upKeyPress === false) {
          player1.body.velocity.y -= 250
          data.player1_velocity -= 250
          socket.emit('player1Move', data);
          // setBallData();
          // socket.emit('ballData', ballData);
          upKeyPress = true
        } else {
          player1.body.velocity.y -= 250;
        }
      } else {
        if (upKeyPress === true)
        data.player1_velocity = 0
        socket.emit('player1Move', data);
        // setBallData();
        // socket.emit('ballData', ballData);
        upKeyPress = false
      }

      if(cursors.down.isDown) {
        if(downKeyPress === false) {
          player1.body.velocity.y += 250;
          socket.emit('player1Move', data);
          downKeyPress = true
        } else {
          player1.body.velocity.y += 250;
        }
      } else {
        if (downKeyPress === true)
        data.player1_velocity = 0
        socket.emit('player1Move', data);
        downKeyPress = false
      }



    }
    else if ( currentGame.player2 === socket.id ) {

      player1.body.velocity.y = opponentVelocity

      if(cursors.up.isDown) {
        if(upKeyPress === false) {
          player2.body.velocity.y -= 250;
          data.player1_velocity -=250
          socket.emit('player2Move', data);
          upKeyPress = true
        } else {
          player2.body.velocity.y -= 250;
        }
      } else {
        if (upKeyPress === true)
        data.player2_velocity = 0
        socket.emit('player2Move', data);
        upKeyPress = false
      }

      if (cursors.down.isDown) {
        if(downKeyPress === false) {
          player2.body.velocity.y += 250;
          socket.emit('player2Move', data);
          downKeyPress = true
        } else {
        player2.body.velocity.y += 250;
      }
    } else {
      if (downKeyPress === true)
      data.player2_velocity = 0
      socket.emit('player2Move', data);
      downKeyPress = false
    }

    }


    //player collision
    game.physics.arcade.collide(player1, topEdge);
    game.physics.arcade.collide(player1, bottomEdge);
    game.physics.arcade.collide(player2, topEdge);
    game.physics.arcade.collide(player2, bottomEdge);

    //ball collision
    game.physics.arcade.collide(ball, topEdge);
    game.physics.arcade.collide(ball, bottomEdge);
    game.physics.arcade.collide(ball, player1);
    game.physics.arcade.collide(ball, player2);

    //limit paddle range
    if (player1.body.y < 20) {
      player1.body.y = 20
    } else if (player1.body.y > 499) {
      player1.body.y = 499
    }
    if (player2.body.y < 20) {
      player2.body.y = 20
    } else if (player2.body.y > 499) {
      player2.body.y = 499
    }

    //Store the coordinates of the active players to emit to the server

  },
  render: function() {
    // game.debug.spriteInfo(ball, 32, 32);
  }

  //


}


// if ( currentGame.player1 === socket.id ) {
//
// let setBallData = function() {
//   return {
//     x : ball.body.x,
//     y : ball.body.y,
//     xv : ball.body.velocity.x,
//     yv : ball.body.velocity.y
//   }
// }
//
// let ballData = setBallData()
//
// let emitBallData = function() {
//   console.log("EMIT BALL DATA", ballData)
//   socket.emit('ballData', ballData)
// }
//


// setInterval(emitBallData, 1000)
//
// }



// let refresh = function () {
//   let data = determinePlayer(currentGame, socket, player1, player2);
//   console.log("REFRESH")
//
//   // ball.body.x = globalData.ball_x
//   // ball.body.y = globalData.ball_y
//   socket.emit('update coordinates', data);
// }
//
//
// setInterval(refresh, 1000)
