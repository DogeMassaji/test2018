var Actor = require('Actor');
var frozenObj = require('frozenObject');

var Player = cc.Class({
    extends: Actor,

    onLoad: function () {
        this.initXSpeed = 5;
        this.initYSpeed = 8;
        this.accSpeed = 0.1;
        this.toward = true;

        this.currentState = frozenObj.STAND;
        this.lastState = frozenObj.STAND;

        this.currentFlg = frozenObj.STANDFLG;
        this.comboFlgs = [];

        this.standFlg = true;
        this.runFlg = false;
        this.jumpFlg = false;
        this.dropFlg = false;
        // 动画状态
        this.anim = this.getComponent(cc.Animation);
    },

    pushInFlgArr: function (flg) {
        if (this.comboFlgs.length == 10) {
            this.comboFlgs.shift();
        }
        this.comboFlgs.push(flg);
    },
});