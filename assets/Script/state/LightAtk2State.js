var State = require('State');
var FrozenObj = require('FrozenObject');

var LightAtk2State = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.LIGHT_ATK_2,
        }
    },

    actionHandler: function (player) {
        if (player.attackState == FrozenObj.SHAKE_AFTER && player.currentInput === player.inputPool.lightAtkFlg) {
            player.lightAtk3();
            player.comboFlg = true;
            player.currentState = player.statePool.lightAtk3State;
        }
        player.lightAtk2();
        player.lastState = player.statePool.lightAtk2State;
    },
});

module.exports = LightAtk2State;