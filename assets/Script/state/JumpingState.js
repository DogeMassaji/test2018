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
            switch (player.currentFlg) {
                case FrozenObj.RUNFLG:
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
                    player.currentState = player.stateObjs.droppingState;
                    break;
            }
        } else {
            player.dropping();
            player.currentState = player.stateObjs.droppingState;
        }
        player.lastState = player.stateObjs.jumpingState;
    },
});

module.exports = JumpingState;