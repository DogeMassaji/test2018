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
            if (player.inputPool.lightAtkFlg.currentState === FrozenObj.PRESSED) {
                player.lightAtkInAir();
                player.currentState = player.statePool.lightAtkInAirState;
            } else if (player.inputPool.heavyAtkFlg.currentState === FrozenObj.PRESSED) {
                player.heavyAtkInAir();
                player.currentState = player.statePool.heavyAtkInAirState;
            } else {
                if (!(player.inputPool.leftFlg.currentState === FrozenObj.RELEASED && player.inputPool.rightFlg.currentState === FrozenObj.RELEASED)) {
                    player.horMove(player.initXSpeed);
                }
                player.dropping();
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