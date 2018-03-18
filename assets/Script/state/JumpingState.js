var State = require('State');
var FrozenObj = require('FrozenObject');

var JumpingState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.JUMPING,
        }
    },

    actionHandler: function (player) {
        this.turn(player);
        if (player.ySpeed > 0) {
            switch (player.currentInput.name) {
                case FrozenObj.LEFTFLG:
                case FrozenObj.RIGHTFLG:
                    player.horMove(player.initXSpeed);
                    player.jumping();
                    break;
                default:
                    if (!(player.inputPool.leftFlg.currentState === FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
                        player.horMove(player.initXSpeed);
                    }
                    player.jumping();
                    break;
            }
        } else {
            player.ySpeed = 0;
            player.dropping();
            player.currentState = player.statePool.droppingState;
        }
        player.lastState = player.statePool.jumpingState;
    },
});

module.exports = JumpingState;