var Actor = require('Actor');
var FrozenObj = require('FrozenObject');
var StandState = require('StandState');
var RunState = require('RunState');
var JumpState = require('JumpState');
var JumpingState = require('JumpingState');
var DroppingState = require('DroppingState');
var DropState = require('DropState');

var Player = cc.Class({
    extends: Actor,

    onLoad: function () {
        // 动画状态
        this.anim = this.getComponent(cc.Animation);
        // 初始化状态实例
        this.stateObjs = {
            'standState': new StandState(),
            'runState': new RunState(),
            'jumpState': new JumpState(),
            'jumpingState': new JumpingState(),
            'droppingState': new DroppingState(),
            'dropState': new DropState(),
        };
        // 初始化键盘输入
        this.inputHandler();
    },

    start: function () {
        this.initXSpeed = 5;
        this.initYSpeed = 8;
        this.accSpeed = 0.1;
        this.toward = FrozenObj.RIGHT;


        // 初始化当前状态实例
        this.currentState = this.stateObjs.standState;
        // 初始化上一帧状态实例
        this.lastState = this.stateObjs.standState;

        this.currentFlg = FrozenObj.STANDFLG;

        this.standFlg = true;
        this.runLeftFlg = false;
        this.runRightFlg = false;
        this.jumpFlg = false;
        this.dropFlg = false;

        this.readyJump = true;
    },

    update: function (dt) {
        this.stateHandler();
    },

    inputHandler: function () {
        var self = this;
        // 键盘监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.toward = FrozenObj.LEFT;
                        self.runLeftFlg = true;
                        self.currentFlg = FrozenObj.RUNFLG;
                        break;
                    case cc.KEY.d:
                        self.toward = FrozenObj.RIGHT;
                        self.runRightFlg = true;
                        self.currentFlg = FrozenObj.RUNFLG;
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
                        if (self.readyJump === true | self.currentState === self.stateObjs.jumpingState) {
                            self.jumpFlg = true;
                            self.currentFlg = FrozenObj.JUMPFLG;
                            self.readyJump = false;
                        } else {
                            self.currentFlg = FrozenObj.STANDFLG;
                        }
                        break;
                    case cc.KEY.shift:
                        break;
                }
            },
            onKeyReleased: function (keyCode, envet) {
                switch (keyCode) {
                    case cc.KEY.a:
                        if (self.runRightFlg === true) {
                            self.toward = FrozenObj.RIGHT;
                        }
                        self.runLeftFlg = false;
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                    case cc.KEY.d:
                        if (self.runLeftFlg === true) {
                            self.toward = FrozenObj.LEFT;
                        }
                        self.runRightFlg = false;
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                    case cc.KEY.w:
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                    case cc.KEY.s:
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                    case cc.KEY.j:
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                    case cc.KEY.i:
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                    case cc.KEY.space:
                        self.jumpFlg = false;
                        self.currentFlg = FrozenObj.DROPFLG;
                        self.readyJump = true;
                        break;
                    case cc.KEY.shift:
                        self.currentFlg = FrozenObj.STANDFLG;
                        break;
                }
            }
        }, self.node);
    },

    pushInFlgArr: function (flg) {
        if (this.comboFlgs.length == 10) {
            this.comboFlgs.shift();
        }
        this.comboFlgs.push(flg);
    },

    stateHandler: function () {
        this.currentState.actionHandler(this);
    },
});