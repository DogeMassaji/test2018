var State = require('State');
var FrozenObj = require('FrozenObject');

var DroppingState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.DROPPING,
        }
    },

    actionHandler: function (player) {
        this.turn(player);
        if (player.node.y + player.ySpeed - player.accSpeed > FrozenObj.HORIZONTAL_LINE) {
            switch (player.currentInput.name) {
                case FrozenObj.LEFTFLG:
                case FrozenObj.RIGHTFLG:
                    player.horMove(player.initXSpeed);
                    player.dropping();
                    break;
                default:
                    if (!(player.inputPool.leftFlg.currentState === FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
                        player.horMove(player.initXSpeed);
                    }
                    player.dropping();
                    break;
            }
        } else {
            player.node.y = FrozenObj.HORIZONTAL_LINE;
            player.drop();
            player.currentState = player.statePool.dropState;
        }
        player.lastState = player.statePool.droppingState;
    },
});

module.exports = DroppingState;