var State = require('State');
var FrozenObj = require('FrozenObject');

var RunState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.RUN,
        }
    },

    actionHandler: function (player) {
        this.turn(player);
        switch (player.currentInput.name) {
            case FrozenObj.LEFTFLG:
            case FrozenObj.RIGHTFLG:
                player.run(player.initXSpeed);
                break;
            case FrozenObj.JUMPFLG:
                if (player.inputPool.jumpFlg.currentState === FrozenObj.PRESSED) {
                    player.jump();
                    player.currentState = player.statePool.jumpState;
                } else {
                    this.defaultState(player);
                }
                break;
            case FrozenObj.ROLLFLG:
                if (player.inputPool.rollFlg.currentState === FrozenObj.PRESSED) {
                    player.turn();
                    player.roll(player.xSpeed);
                    player.currentState = player.statePool.rollState;
                } else {
                    this.defaultState(player);
                }
                break;
            default:
                this.defaultState(player);
                break;
        }
        player.lastState = player.statePool.runState;
    },
});

module.exports = RunState;