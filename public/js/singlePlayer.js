'use strict'

let player1
let player2
let ball
let cursors
let topEdge
let bottomEdge
let ballX
let ballY


let globalData = null

// socket.on('newcoords', data => {
//   // modifiedData = data
//   // console.log("new coords data:", data)
//   // main.update(data)
//   globalData = data
// })


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
    console.log(game);
  },

  update: function() {

    // Object.keys(globalData).length === 0 && globalData.constructor === Object

    if ( globalData !== null ) {
      console.log("GLOBAL DATA:", globalData)
      console.log("TEST")
      // player1.body.x = globalData.player1_x
      player1.body.y = globalData.data.player1_y
      // player2.body.x = globalData.player2_x
      player2.body.y = globalData.data.player2_y
      ball.body.x = globalData.data.ball_x
      ball.body.y = globalData.data.ball_y
    }

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

    //movement
    player1.body.velocity.y = 0;
    player1.body.velocity.x = 0;

    if(cursors.up.isDown) {
      player1.body.velocity.y -= 250;
    }
    else if(cursors.down.isDown) {
      player1.body.velocity.y += 250;
    }
    //movement for p2 -- temp
    player2.body.velocity.y = 0;
    player2.body.velocity.x = 0;

    if(ball.body.y < player2.body.y) {
      player2.body.velocity.y -= 250;
    }
    else if(ball.body.y > player2.body.y) {
      player2.body.velocity.y += 250;
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

    // socket.emit('update coordinates', {
    //   player1_x : player1.body.x,
    //   player1_y: player1.body.y,
    //   player2_x: player2.body.x,
    //   player2_y: player2.body.y,
    //   ball_x: ball.body.x,
    //   ball_y: ball.body.y
    // });

  },
  render: function() {
    // game.debug.spriteInfo(ball, 32, 32);
  }
}
