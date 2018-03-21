var FrozenObj = require('FrozenObject');

var State = cc.Class({

    actionHandler: function () { },

    defaultState: function (player) {
        if (player.inputPool.blockFlg.currentState !== FrozenObj.RELEASED) {
            player.xSpeed = 0;
            player.block(player.xSpeed);
            player.currentState = player.statePool.blockState;
        } else if (!(player.inputPool.leftFlg.currentState === FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
            player.run(player.initXSpeed);
            player.currentState = player.statePool.runState;
        } else {
            player.xSpeed = 0;
            player.stand();
            player.currentState = player.statePool.standState;
        }
    },

    turn: function (player) {
        if ((player.currentInput.name === FrozenObj.LEFT_FLG) || (player.inputPool.leftFlg.currentState !== FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
            player.toward = FrozenObj.LEFT;
        } else if ((player.currentInput.name === FrozenObj.RIGHT_FLG) || (player.inputPool.rightFlg.currentState !== FrozenObj.RELEASED && player.inputPool.leftFlg.currentState === FrozenObj.RELEASED)) {
            player.toward = FrozenObj.RIGHT;
        }
    },
});

module.exports = State;