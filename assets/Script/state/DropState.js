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
        player.lastState = player.statePool.dropState;
    },
});

module.exports = DropState;