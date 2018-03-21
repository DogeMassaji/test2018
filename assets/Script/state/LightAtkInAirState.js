var State = require('State');
var FrozenObj = require('FrozenObject');

var LightAtkInAirState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.LIGHT_ATK_IN_AIR,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.lightAtkInAirState;
    },
});

module.exports = LightAtkInAirState;