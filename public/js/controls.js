'use strict'

let main = {
  update: function() {
    //movement
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;

    if(cursors.up.isDown) {
      player.body.velocity.y -= 100;
    }
    else if(cursors.down.isDown) {
      player.body.velocity.y += 100;
    }
  }
}
