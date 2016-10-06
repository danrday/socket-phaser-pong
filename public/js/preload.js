'use strict'

let preload = {
  preload: function() {
    game.load.image('paddle', './public/assets/paddle.png');
    game.load.image('ball', './public/assets/ball.png');
  },
  create: function() {
		game.state.start('main');
	}
}
