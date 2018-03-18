var State = require('State');
var FrozenObj = require('FrozenObject');

var RollState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.ROLL,
        }
    },

    actionHandler: function (player) {
        player.roll(player.xSpeed);
        player.lastState = player.statePool.rollState;
    },
});

module.exports = RollState;