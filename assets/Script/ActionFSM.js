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
        cc.log(this.player);
        // 初始化键盘输入
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
                        self.standFlg = false;
                        break;
                    case cc.KEY.d:
                        self.toward = true;
                        self.runFlg = true;
                        self.standFlg = false;
                        break;
                }
            },
            onKeyReleased: function (keyCode, envet) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.runFlg = false;
                        self.standFlg = true;
                        break;
                    case cc.KEY.d:
                        self.runFlg = false;
                        self.standFlg = true;
                        break;
                }
            }
        }, self.node);
    },

    /**
     * 执行动作
     */
    actionExcute: function () {
        if (this.player.runFlg) {
            this.player.run();
        } else {
            this.player.stand();
        }
    }

});
