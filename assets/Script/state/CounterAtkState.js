var State = require('State');
var FrozenObj = require('FrozenObject');

var CounterAtkState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.COUNTER_ATK,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.counterAtkState;
    },
});

module.exports = CounterAtkState;