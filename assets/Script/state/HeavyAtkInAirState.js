var State = require('State');
var FrozenObj = require('FrozenObject');

var HeavyAtkInAirState = cc.Class({
    extends: State,

    properties: {
        name: {
            default: FrozenObj.HEAVY_ATK_IN_AIR,
        }
    },

    actionHandler: function (player) {
        var attackState = player.attackState;
        if (attackState === FrozenObj.ATTACKING) {
            if (player.anim.getAnimationState(FrozenObj.HEAVY_ATK_IN_AIR).isPlaying) {
                player.anim.pause(FrozenObj.HEAVY_ATK_IN_AIR);
                player.ySpeed = -player.initYSpeed;
            }
            if (player.node.y + player.ySpeed - player.accSpeed > FrozenObj.HORIZONTAL_LINE) {
                player.verMove();
            } else {
                player.node.y = FrozenObj.HORIZONTAL_LINE;
                player.anim.resume(FrozenObj.HEAVY_ATK_IN_AIR);
                player.attackState = FrozenObj.SHAKE_AFTER;
            }
        } else if (attackState === FrozenObj.SHAKE_AFTER) {
            if (player.toward === FrozenObj.LEFT) {
                player.node.x += 3;
            } else {
                player.node.x -= 3;
            }
        }

        player.lastState = player.statePool.heavyAtkInAirState;
    },
});

module.exports = HeavyAtkInAirState;