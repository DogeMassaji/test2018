var State = require('State');
var FrozenObj = require('FrozenObject');

var StandState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.STAND,
        }
    },

    actionHandler: function (player) {
        this.turn(player);
        switch (player.currentInput.name) {
            case FrozenObj.LEFTFLG:
            case FrozenObj.RIGHTFLG:
                player.run(player.initXSpeed);
                player.currentState = player.statePool.runState;
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
            /* case FrozenObj.ATTACKFLG:
                playerAttack();
                break;
            case FrozenObj.BLOCKFLG:
                player.block();
                player.currentState = FrozenObj.BLOCK;
                break;
            case FrozenObj.SKILL:
                player.skill();
                player.currentState = FrozenObj.BLOCK;
                break; */
            default:
                this.defaultState(player);
                break;
        }
        player.lastState = player.statePool.standState;
    },
});

module.exports = StandState;