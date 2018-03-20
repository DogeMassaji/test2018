var State = require('State');
var FrozenObj = require('FrozenObject');

var CounterAtkState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.COUNTERATK,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.CounterAtkState;
    },
});

module.exports = CounterAtkState;