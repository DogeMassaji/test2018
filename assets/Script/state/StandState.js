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
        // 方向根据方向键发生变化
        this.turn(player);
        // 速度归零
        player.xSpeed = 0;
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
                    player.xSpeed = player.initXSpeed;
                    player.roll(this.xSpeed);
                    player.currentState = player.statePool.rollState;
                } else {
                    this.defaultState(player);
                }
                break;
            case FrozenObj.LIGHTATKFLG:
                if (player.inputPool.lightAtkFlg.currentState === FrozenObj.PRESSED) {
                    player.lightAtk1();
                    player.currentState = player.statePool.lightAtkState;
                } else {
                    this.defaultState(player);
                }
                break;
            case FrozenObj.HEAVYATKFLG:
                if (player.inputPool.heavyAtkFlg.currentState === FrozenObj.PRESSED) {
                    player.heavyAtk1();
                    player.currentState = player.statePool.heavyAtkState;
                } else {
                    this.defaultState(player);
                }
                break;
            case FrozenObj.SKILLFLG:
                if (player.inputPool.skillFlg.currentState === FrozenObj.PRESSED) {
                    player.skill();
                    player.currentState = player.statePool.skillState;
                } else {
                    this.defaultState(player);
                }
                break;
            case FrozenObj.BLOCKFLG:
                player.block(player.xSpeed);
                player.currentState = player.statePool.blockState;
                break;
            default:
                this.defaultState(player);
                break;
        }
        player.lastState = player.statePool.standState;
    },
});

module.exports = StandState;