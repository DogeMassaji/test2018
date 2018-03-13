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
        if (player.node.y + player.ySpeed - player.accSpeed > FrozenObj.HORIZONTAL_LINE) {
            switch (player.input.name) {
                case FrozenObj.LEFTFLG:
                case FrozenObj.RIGHTFLG:
                    player.horMove(player.initXSpeed);
                    player.dropping();
                    break;
                /* case FrozenObj.JUMPFLG:
                    if (player.runFlg === true) {
                        player.horMove(player.initXSpeed);
                    }
                    player.dropping();
                    break; */
                /* case FrozenObj.ATTACKFLG:
                    playerAttack();
                    break;
                case FrozenObj.BLOCKFLG:
                    break;
                case FrozenObj.SKILL:
                    break; */
                default:
                    if (player.runLeftFlg === true | player.runRightFlg === true) {
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