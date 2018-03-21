var State = require('State');
var FrozenObj = require('FrozenObject');

var HeavyAtkState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.HEAVY_ATK,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.heavyAtkState;
    },
});

module.exports = HeavyAtkState;