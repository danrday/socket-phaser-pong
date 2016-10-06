"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('preloadState', preloadState);
console.log('preloadState added');
game.state.add('main', main);
console.log('main added');

game.state.start('preloadState');
