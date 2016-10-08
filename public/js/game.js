"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('preloadState', preloadState)
game.state.add('menu', menu)
game.state.add('main', main);

game.state.start('preloadState');
