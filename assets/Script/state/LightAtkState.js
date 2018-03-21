var State = require('State');
var FrozenObj = require('FrozenObject');

var LightAtkState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.LIGHT_ATK,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.lightAtkState;
    },
});

module.exports = LightAtkState;