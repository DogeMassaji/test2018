var State = require('State');
var FrozenObj = require('FrozenObject');

var HeavyAtk1State = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.HEAVY_ATK_1,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.heavyAtk1State;
    },
});

module.exports = HeavyAtk1State;