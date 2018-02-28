var Actor = require('Actor');

var Player = cc.Class({
    extends: Actor,

    onLoad: function () {
        this.speed = 5;
        this.toword = true;
        this.standFlg = true;
        this.runFlg = false;
        // 动画状态
        this.anim = this.getComponent(cc.Animation);
    },
});