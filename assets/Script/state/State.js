var FrozenObj = require('FrozenObject');

var State = cc.Class({

    actionHandler: function () { },

    defaultState: function (player) {
        if (!(player.inputPool.leftFlg.currentState === FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
            player.run(player.initXSpeed);
            player.currentState = player.statePool.runState;
        } else {
            player.stand();
            player.currentState = player.statePool.standState;
        }
    },

    turn: function (player) {
        if ((player.currentInput.name === FrozenObj.LEFTFLG) || (player.inputPool.leftFlg.currentState !== FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
            player.toward = FrozenObj.LEFT;
        } else if ((player.currentInput.name === FrozenObj.RIGHTFLG) || (player.inputPool.rightFlg.currentState !== FrozenObj.RELEASED && player.inputPool.leftFlg.currentState === FrozenObj.RELEASED)) {
            player.toward = FrozenObj.RIGHT;
        }
    },
});

module.exports = State;