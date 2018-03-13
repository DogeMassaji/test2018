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
        switch (player.input.name) {
            case FrozenObj.LEFTFLG:
            case FrozenObj.RIGHTFLG:
                player.run(player.initXSpeed);
                player.currentState = player.statePool.runState;
                break;
            case FrozenObj.JUMPFLG:
                if (player.lastState !== player.statePool.dropState) {
                    player.jump();
                    player.currentState = player.statePool.jumpState;
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