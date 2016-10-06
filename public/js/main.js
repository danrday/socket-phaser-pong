'use strict'

let main = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    let player1 = game.add.sprite(100, 100, 'paddle');
    console.log('player1', player1);
    let player2 = game.add.sprite(200, 200, 'paddle');
    let ball = game.add.sprite(300, 300, 'ball');

    let cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    //movement
    // player.body.velocity.y = 0;
    // player.body.velocity.x = 0;
    //
    // if(cursors.up.isDown) {
    //   player.body.velocity.y -= 100;
    // }
    // else if(cursors.down.isDown) {
    //   player.body.velocity.y += 100;
    // }
  }
}
