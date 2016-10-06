'use strict'

let main = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    let player1 = game.add.sprite(100, 100, 'paddle');
    let player2 = game.add.sprite(200, 200, 'paddle');
    let ball = game.add.sprite(300, 300, 'ball');

    let cursors = game.input.keyboard.createCursorKeys();
  }
}
