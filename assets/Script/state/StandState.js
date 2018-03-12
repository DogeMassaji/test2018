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
        switch (player.currentFlg) {
            case FrozenObj.RUNFLG:
                player.run(player.initXSpeed);
                player.currentState = player.stateObjs.runState;
                break;
            case FrozenObj.JUMPFLG:
                if (player.lastState !== player.stateObjs.dropState) {
                    player.jump();
                    player.currentState = player.stateObjs.jumpState;
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
        player.lastState = player.stateObjs.standState;
    },
});

module.exports = StandState;