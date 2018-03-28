var State = require('State');
var FrozenObj = require('FrozenObject');

var RollAtkState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.ROLL_ATK,
        }
    },

    actionHandler: function (player) {
        player.rollAtk();
        player.lastState = player.statePool.rollAtkState;
    },
});

module.exports = RollAtkState;