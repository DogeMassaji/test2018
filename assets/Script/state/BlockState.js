var State = require('State');
var FrozenObj = require('FrozenObject');

var BlockState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.BLOCK,
        }
    },


    actionHandler: function (player) {
        if (player.inputPool.blockFlg.currentState !== FrozenObj.RELEASED) {
            var speed;
            /* switch (player.currentInput.name) {
                case FrozenObj.LEFT_FLG:
                    player.xSpeed = -2;
                    player.block(player.xSpeed);
                    break;
                case FrozenObj.RIGHT_FLG:
                    player.xSpeed = 2;
                    player.block(player.xSpeed);
                    break;
                case FrozenObj.LIGHT_ATK_FLG:
                case FrozenObj.HEAVY_ATK_FLG:
                    break;
                default:
                    break;
            } */
            if (player.inputPool.lightAtkFlg.currentState === FrozenObj.PRESSED || player.inputPool.heavyAtkFlg.currentState === FrozenObj.PRESSED) {
                player.counterAtk();
                player.currentState = player.statePool.counterAtkState;

            } else {
                if (player.inputPool.rightFlg.currentState !== FrozenObj.RELEASED) {
                    player.xSpeed = 2;

                } else if (player.inputPool.leftFlg.currentState !== FrozenObj.RELEASED) {
                    player.xSpeed = -2;

                } else {
                    player.xSpeed = 0;
                }
                player.block(player.xSpeed);
            }
        } else {
            this.defaultState(player);
        }
        player.lastState = player.statePool.blockState;
    },
});

module.exports = BlockState;