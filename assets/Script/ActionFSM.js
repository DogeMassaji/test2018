var frozenObj = require('frozenObject');
var actionInFSM = require('ActionInFSM');

cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad: function () {
        this.player = this.playerNode.getComponent('Player');
        this.inputExcute();
    },

    start: function () {

    },

    update: function (dt) {
        this.actionExcute();
    },

    /**
     * 键盘输入
     */
    inputExcute: function () {
        var self = this.player;
        // 键盘监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.toward = false;
                        self.runFlg = true;
                        self.currentFlg = frozenObj.RUNFLG;
                        break;
                    case cc.KEY.d:
                        self.toward = true;
                        self.runFlg = true;
                        self.currentFlg = frozenObj.RUNFLG;
                        break;
                    case cc.KEY.w:
                        break;
                    case cc.KEY.s:
                        break;
                    case cc.KEY.j:
                        break;
                    case cc.KEY.i:
                        break;
                    case cc.KEY.space:
                        self.jumpFlg = true;
                        self.currentFlg = frozenObj.JUMPFLG;
                        break;
                    case cc.KEY.shift:
                        break;
                }
            },
            onKeyReleased: function (keyCode, envet) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.runFlg = false;
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                    case cc.KEY.d:
                        self.runFlg = false;
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                    case cc.KEY.w:
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                    case cc.KEY.s:
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                    case cc.KEY.j:
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                    case cc.KEY.i:
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                    case cc.KEY.space:
                        self.jumpFlg = false;
                        self.currentFlg = frozenObj.DROPFLG;
                        break;
                    case cc.KEY.shift:
                        self.currentFlg = frozenObj.STANDFLG;
                        break;
                }
            }
        }, self.node);
    },

    /**
     * 执行动作
     */
    actionExcute: function () {
        /* if (this.player.runFlg) {
            this.player.run();
        } else {
            this.player.stand();
        } */
        // 根据状态以及输入指令判断动作
        var state = this.player.currentState;
        var curFlg = this.player.currentFlg;
        var input = {
            player: this.player,
            curFlg: curFlg
        };
        switch (state) {
            case frozenObj.STAND:
                actionInFSM.stand(input);
                break;
            case frozenObj.RUN:
                actionInFSM.run(input);
                break;
            case frozenObj.JUMP:
                actionInFSM.jump(input);
                break;
            case frozenObj.JUMPING:
                actionInFSM.jumping(input);
                break;
            case frozenObj.DROPPING:
                actionInFSM.dropping(input);
                break;
            case frozenObj.DROP:
                actionInFSM.drop(input);
                break;
        }
    },

    playerAttack: function () {
        this.player.clsRngAtk1();
        this.player.currentState = frozenObj.CLSRNGATK1;
    },
});
