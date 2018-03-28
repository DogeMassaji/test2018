var State = require('State');
var FrozenObj = require('FrozenObject');

var LightAtk3State = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.LIGHT_ATK_3,
        }
    },

    actionHandler: function (player) {
        if (player.attackState == FrozenObj.SHAKE_AFTER && player.currentInput === player.inputPool.lightAtkFlg) {
            player.lightAtk3();
            player.comboFlg = true;
            player.currentState = player.statePool.lightAtk1State;
        }
        player.lightAtk3();
        player.lastState = player.statePool.lightAtk3State;
    },
});

module.exports = LightAtk3State;