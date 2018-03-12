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
            player.currentState = player.stateObjs.standState;
        }
        player.lastState = player.stateObjs.dropState;
    },
});

module.exports = DropState;