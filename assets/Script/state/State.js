var frozenObj = require('FrozenObject');

var State = cc.Class({

    actionHandler: function (input) { },

    defaultState: function (player) {
        if (player.runLeftFlg === true | player.runRightFlg === true) {
            player.run(player.initXSpeed);
            player.currentState = player.stateObjs.runState;
        } else {
            player.stand();
            player.currentState = player.stateObjs.standState;
        }
    },
});

module.exports = State;