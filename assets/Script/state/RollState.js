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
        if (player.attackState === FrozenObj.SHAKE_AFTER && player.currentInput === player.inputPool.lightAtkFlg) {
            player.comboFlg = true;
        }
        player.roll();
        player.lastState = player.statePool.rollState;
    },
});

module.exports = RollState;