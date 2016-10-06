'use strict'

let preloadState = {
  preload: function() {
    game.load.image('paddle', '../assets/paddle.png');
    game.load.image('ball', '../assets/ball.png');
    console.log('preloaded');
  },
  create: function() {
		game.state.start('main');
    console.log('loading main');
	}
}
