var State = require('State');
var FrozenObj = require('FrozenObject');

var RunState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.RUN,
        }
    },

    actionHandler: function (player) {
        switch (player.currentFlg) {
            case FrozenObj.RUNFLG:
                player.run(player.initXSpeed);
                break;
            case FrozenObj.JUMPFLG:
                player.jump();
                player.currentState = player.stateObjs.jumpState;
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
        player.lastState = player.stateObjs.runState;
    },
});

module.exports = RunState;