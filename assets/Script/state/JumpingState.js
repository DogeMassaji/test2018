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
        if (player.ySpeed > 0) {
            switch (player.input.name) {
                case FrozenObj.LEFTFLG:
                case FrozenObj.RIGHTFLG:
                    // 当jumpFlg关闭时，runFlg开启时，会继续向上跳，combo类动作应该用上其他flag判断动作执行
                    player.horMove(player.initXSpeed);
                    player.jumping();
                    break;
                case FrozenObj.JUMPFLG:
                    if (player.runLeftFlg === true | player.runRightFlg === true) {
                        player.horMove(player.initXSpeed);
                    }
                    player.jumping();
                    break;
                /* case FrozenObj.ATTACKFLG:
                    playerAttack();
                    break;
                case FrozenObj.BLOCKFLG:
                    break;
                case FrozenObj.SKILL:
                    break; */
                default:
                    player.ySpeed = 0;
                    player.dropping();
                    player.currentState = player.statePool.droppingState;
                    break;
            }
        } else {
            player.dropping();
            player.currentState = player.statePool.droppingState;
        }
        player.lastState = player.statePool.jumpingState;
    },
});

module.exports = JumpingState;