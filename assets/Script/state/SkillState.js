var State = require('State');
var FrozenObj = require('FrozenObject');

var SkillState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.SKILL,
        }
    },

    actionHandler: function (player) {
        player.lastState = player.statePool.skillState;
    },
});

module.exports = SkillState;