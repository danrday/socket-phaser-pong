'use strict'

let preload = {
  preload: function() {
    game.load.image('paddle', '');
    game.load.image('ball', '');
  },
  create: function() {
		game.state.start('main');
	}
}
