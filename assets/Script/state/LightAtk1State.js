var State = require('State');
var FrozenObj = require('FrozenObject');

var LightAtk1State = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.LIGHT_ATK_1,
        }
    },

    actionHandler: function (player) {
        if (player.attackState == FrozenObj.SHAKE_AFTER && player.currentInput === player.inputPool.lightAtkFlg) {
            player.lightAtk2();
            player.comboFlg = true;
            player.currentState = player.statePool.lightAtk2State;
        }
        player.lightAtk1();
        player.lastState = player.statePool.lightAtk1State;
    },
});

module.exports = LightAtk1State;