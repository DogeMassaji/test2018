var State = require('State');
var FrozenObj = require('FrozenObject');

var DropState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.DROP,
        }
    },


    actionHandler: function (player) {
        if (!player.anim.getAnimationState(FrozenObj.DROP).isPlaying) {
            player.currentState = player.statePool.standState;
        }
        player.lastState = player.statePool.dropState;
    },
});

module.exports = DropState;