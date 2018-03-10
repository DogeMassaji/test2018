var frozenObj = require('frozenObject');

var ActionInFSM = {

    stand: function (input) {
        switch (input.curFlg) {
            case frozenObj.RUNFLG:
                input.player.run();
                input.player.currentState = frozenObj.RUN;
                break;
            case frozenObj.JUMPFLG:
                input.player.jump();
                input.player.currentState = frozenObj.JUMP;
                break;
            case frozenObj.ATTACKFLG:
                input.playerAttack();
                break;
            case frozenObj.BLOCKFLG:
                input.player.block();
                input.player.currentState = frozenObj.BLOCK;
                break;
            case frozenObj.SKILL:
                input.player.skill();
                input.player.currentState = frozenObj.BLOCK;
                break;
            default:
                input.player.stand();
                break;
        }
        input.player.lastState = frozenObj.STAND;
    },

    run: function (input) {
        switch (input.curFlg) {
            case frozenObj.RUNFLG:
                input.player.run();
                break;
            case frozenObj.JUMPFLG:
                input.player.jump();
                input.player.currentState = frozenObj.JUMP;
                break;
            case frozenObj.ATTACKFLG:
                input.playerAttack();
                break;
            case frozenObj.BLOCKFLG:
                input.player.block();
                input.player.currentState = frozenObj.BLOCK;
                break;
            case frozenObj.SKILL:
                input.player.skill();
                input.player.currentState = frozenObj.BLOCK;
                break;
            default:
                input.player.stand();
                input.player.currentState = frozenObj.STAND;
                break;
        }
        input.player.lastState = frozenObj.RUN;
    },

    jump: function (input) {
        /* switch (input.curFlg) {
            case frozenObj.RUNFLG:
                // 当jumpFlg关闭时，runFlg开启时，会继续向上跳，combo类动作应该用上其他flag判断动作执行
                input.player.horMove();
                input.player.verMove();
                input.player.jump();
                break;
            case frozenObj.JUMPFLG:
                input.player.verMove();
                input.player.jump();
                break;
            case frozenObj.ATTACKFLG:
                input.playerAttack();
                break;
            case frozenObj.BLOCKFLG:
                break;
            case frozenObj.SKILL:
                break;
            default:
                input.player.ySpeed = 0;
                input.player.verMove();
                input.player.drop();
                input.player.currentState = frozenObj.DROP;
                break;
        }
        if (input.player.currentState != frozenObj.JUMP) {
            input.player.lastState = frozenObj.JUMP;
        } */

        if (!input.player.anim.getAnimationState(frozenObj.JUMP).isPlaying) {
            input.player.currentState = frozenObj.JUMPING;
            input.player.lastState = frozenObj.JUMP;
            input.player.ySpeed = input.player.initYSpeed;
        }
    },

    jumping: function (input) {
        cc.log(input.player.ySpeed);
        if (input.player.ySpeed > 0) {
            switch (input.curFlg) {
                case frozenObj.RUNFLG:
                    // 当jumpFlg关闭时，runFlg开启时，会继续向上跳，combo类动作应该用上其他flag判断动作执行
                    input.player.horMove();
                    input.player.verMove();
                    input.player.jumping();
                    break;
                case frozenObj.JUMPFLG:
                    input.player.verMove();
                    input.player.jumping();
                    break;
                case frozenObj.ATTACKFLG:
                    input.playerAttack();
                    break;
                case frozenObj.BLOCKFLG:
                    break;
                case frozenObj.SKILL:
                    break;
                default:
                    cc.log(input.player.currentFlg);
                    input.player.ySpeed = 0;
                    input.player.verMove();
                    input.player.dropping();
                    input.player.currentState = frozenObj.DROPPING;
                    break;
            }
        } else {
            input.player.verMove();
            input.player.dropping();
            input.player.currentState = frozenObj.DROPPING;
        }
        if (input.player.currentState != frozenObj.JUMPING) {
            input.player.lastState = frozenObj.JUMPING;
        }
    },

    dropping: function (input) {
        if (input.player.node.y > frozenObj.HORIZONTAL_LINE) {
            switch (input.curFlg) {
                case frozenObj.RUNFLG:
                    input.player.horMove();
                    input.player.verMove();
                    input.player.dropping();
                    break;
                case frozenObj.JUMPFLG:
                    input.player.verMove();
                    input.player.dropping();
                    break;
                case frozenObj.ATTACKFLG:
                    input.playerAttack();
                    break;
                case frozenObj.BLOCKFLG:
                    break;
                case frozenObj.SKILL:
                    break;
                default:
                    input.player.verMove();
                    input.player.dropping();
                    break;
            }
        } else {
            input.player.drop();
            input.player.currentState = frozenObj.DROP;
        }
        if (input.player.currentState != frozenObj.DROPPING) {
            input.player.lastState = frozenObj.DROPPING;
        }
    },

    drop: function (input) {
        /* if (input.player.node.y > frozenObj.HORIZONTAL_LINE) {
            switch (input.curFlg) {
                case frozenObj.RUNFLG:
                    input.player.horMove();
                    input.player.verMove();
                    input.player.drop();
                    input.player.currentState = frozenObj.DROP;
                    break;
                case frozenObj.JUMPFLG:
                    input.player.verMove();
                    input.player.drop();
                    input.player.currentState = frozenObj.DROP;
                    break;
                case frozenObj.ATTACKFLG:
                    input.playerAttack();
                    break;
                case frozenObj.BLOCKFLG:
                    break;
                case frozenObj.SKILL:
                    break;
                default:
                    input.player.verMove();
                    input.player.drop();
                    input.player.currentState = frozenObj.DROP;
                    break;
            }
        } else {
            input.player.stand();
            input.player.currentState = frozenObj.STAND;
        }
        if (input.player.currentState != frozenObj.DROP) {
            input.player.lastState = frozenObj.DROP;
        } */
        if (!input.player.anim.getAnimationState(frozenObj.DROP).isPlaying) {
            input.player.currentState = frozenObj.STAND;
            input.player.lastState = frozenObj.DROP;
        }
    },
};

module.exports = ActionInFSM;