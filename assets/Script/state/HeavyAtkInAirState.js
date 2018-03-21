var State = require('State');
var FrozenObj = require('FrozenObject');

var HeavyAtkInAirState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.HEAVY_ATK_IN_AIR,
        }
    },

    actionHandler: function (player) {
        if (player.y + player.ySpeed - player.accSpeed <= FrozenObj.HORIZONTAL_LINE) {
            player.node.y = FrozenObj.HORIZONTAL_LINE;
            player.attackState = FrozenObj.SHAKE_AFTER;
        }
        player.heavyAtkInAir();
        player.lastState = player.statePool.heavyAtkInAirState;
    },
});

module.exports = HeavyAtkInAirState;