var FrozenObj = require('FrozenObject');

var ActionInFSM = {

    stand: function (input) {
        switch (input.curFlg) {
            case FrozenObj.RUNFLG:
                input.player.run();
                input.player.currentState = FrozenObj.RUN;
                break;
            case FrozenObj.JUMPFLG:
                input.player.jump();
                input.player.currentState = FrozenObj.JUMP;
                break;
            case FrozenObj.ATTACKFLG:
                input.playerAttack();
                break;
            case FrozenObj.BLOCKFLG:
                input.player.block();
                input.player.currentState = FrozenObj.BLOCK;
                break;
            case FrozenObj.SKILL:
                input.player.skill();
                input.player.currentState = FrozenObj.BLOCK;
                break;
            default:
                input.player.stand();
                break;
        }
        input.player.lastState = FrozenObj.STAND;
    },

    run: function (input) {
        switch (input.curFlg) {
            case FrozenObj.RUNFLG:
                input.player.run();
                break;
            case FrozenObj.JUMPFLG:
                input.player.jump();
                input.player.currentState = FrozenObj.JUMP;
                break;
            case FrozenObj.ATTACKFLG:
                input.playerAttack();
                break;
            case FrozenObj.BLOCKFLG:
                input.player.block();
                input.player.currentState = FrozenObj.BLOCK;
                break;
            case FrozenObj.SKILL:
                input.player.skill();
                input.player.currentState = FrozenObj.BLOCK;
                break;
            default:
                input.player.stand();
                input.player.currentState = FrozenObj.STAND;
                break;
        }
        input.player.lastState = FrozenObj.RUN;
    },

    jump: function (input) {
        /* switch (input.curFlg) {
            case FrozenObj.RUNFLG:
                // 当jumpFlg关闭时，runFlg开启时，会继续向上跳，combo类动作应该用上其他flag判断动作执行
                input.player.horMove();
                input.player.verMove();
                input.player.jump();
                break;
            case FrozenObj.JUMPFLG:
                input.player.verMove();
                input.player.jump();
                break;
            case FrozenObj.ATTACKFLG:
                input.playerAttack();
                break;
            case FrozenObj.BLOCKFLG:
                break;
            case FrozenObj.SKILL:
                break;
            default:
                input.player.ySpeed = 0;
                input.player.verMove();
                input.player.drop();
                input.player.currentState = FrozenObj.DROP;
                break;
        }
        if (input.player.currentState != FrozenObj.JUMP) {
            input.player.lastState = FrozenObj.JUMP;
        } */

        if (!input.player.anim.getAnimationState(FrozenObj.JUMP).isPlaying) {
            input.player.currentState = FrozenObj.JUMPING;
            input.player.lastState = FrozenObj.JUMP;
            input.player.ySpeed = input.player.initYSpeed;
        }
    },

    jumping: function (input) {
        cc.log(input.player.ySpeed);
        if (input.player.ySpeed > 0) {
            switch (input.curFlg) {
                case FrozenObj.RUNFLG:
                    // 当jumpFlg关闭时，runFlg开启时，会继续向上跳，combo类动作应该用上其他flag判断动作执行
                    input.player.horMove();
                    input.player.verMove();
                    input.player.jumping();
                    break;
                case FrozenObj.JUMPFLG:
                    input.player.verMove();
                    input.player.jumping();
                    break;
                case FrozenObj.ATTACKFLG:
                    input.playerAttack();
                    break;
                case FrozenObj.BLOCKFLG:
                    break;
                case FrozenObj.SKILL:
                    break;
                default:
                    cc.log(input.player.currentFlg);
                    input.player.ySpeed = 0;
                    input.player.verMove();
                    input.player.dropping();
                    input.player.currentState = FrozenObj.DROPPING;
                    break;
            }
        } else {
            input.player.verMove();
            input.player.dropping();
            input.player.currentState = FrozenObj.DROPPING;
        }
        if (input.player.currentState != FrozenObj.JUMPING) {
            input.player.lastState = FrozenObj.JUMPING;
        }
    },

    dropping: function (input) {
        if (input.player.node.y > FrozenObj.HORIZONTAL_LINE) {
            switch (input.curFlg) {
                case FrozenObj.RUNFLG:
                    input.player.horMove();
                    input.player.verMove();
                    input.player.dropping();
                    break;
                case FrozenObj.JUMPFLG:
                    input.player.verMove();
                    input.player.dropping();
                    break;
                case FrozenObj.ATTACKFLG:
                    input.playerAttack();
                    break;
                case FrozenObj.BLOCKFLG:
                    break;
                case FrozenObj.SKILL:
                    break;
                default:
                    input.player.verMove();
                    input.player.dropping();
                    break;
            }
        } else {
            input.player.drop();
            input.player.currentState = FrozenObj.DROP;
        }
        if (input.player.currentState != FrozenObj.DROPPING) {
            input.player.lastState = FrozenObj.DROPPING;
        }
    },

    drop: function (input) {
        /* if (input.player.node.y > FrozenObj.HORIZONTAL_LINE) {
            switch (input.curFlg) {
                case FrozenObj.RUNFLG:
                    input.player.horMove();
                    input.player.verMove();
                    input.player.drop();
                    input.player.currentState = FrozenObj.DROP;
                    break;
                case FrozenObj.JUMPFLG:
                    input.player.verMove();
                    input.player.drop();
                    input.player.currentState = FrozenObj.DROP;
                    break;
                case FrozenObj.ATTACKFLG:
                    input.playerAttack();
                    break;
                case FrozenObj.BLOCKFLG:
                    break;
                case FrozenObj.SKILL:
                    break;
                default:
                    input.player.verMove();
                    input.player.drop();
                    input.player.currentState = FrozenObj.DROP;
                    break;
            }
        } else {
            input.player.stand();
            input.player.currentState = FrozenObj.STAND;
        }
        if (input.player.currentState != FrozenObj.DROP) {
            input.player.lastState = FrozenObj.DROP;
        } */
        if (!input.player.anim.getAnimationState(FrozenObj.DROP).isPlaying) {
            input.player.currentState = FrozenObj.STAND;
            input.player.lastState = FrozenObj.DROP;
        }
    },
};

module.exports = ActionInFSM;