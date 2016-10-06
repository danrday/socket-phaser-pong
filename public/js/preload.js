'use strict'

let preloadState = {
  preload: function() {
    game.load.image('paddle', '../assets/paddle.png');
    game.load.image('ball', '../assets/ball.png');
    game.load.image('edge', '../assets/edge.png');
  },
  create: function() {
		game.state.start('main');
	}
}
