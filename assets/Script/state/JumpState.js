var State = require('State');
var FrozenObj = require('FrozenObject');

var JumpState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.JUMP,
        }
    },

    actionHandler: function (player) {
        if (!player.anim.getAnimationState(FrozenObj.JUMP).isPlaying) {
            player.currentState = player.stateObjs.jumpingState;
            player.ySpeed = player.initYSpeed;
        }
        player.lastState = player.stateObjs.jumpState;
    },
});

module.exports = JumpState;