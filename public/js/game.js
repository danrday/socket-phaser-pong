"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('preload', preload);
game.state.add('main', main);
