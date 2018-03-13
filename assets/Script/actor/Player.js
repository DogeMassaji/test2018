var Actor = require('Actor');

var FrozenObj = require('FrozenObject');
var kbm = require('KeyBoardMap');

var StandState = require('StandState');
var RunState = require('RunState');
var JumpState = require('JumpState');
var JumpingState = require('JumpingState');
var DroppingState = require('DroppingState');
var DropState = require('DropState');

var Input = require('Input');

var Player = cc.Class({
    extends: Actor,

    properties: {

    },

    onLoad: function () {
        // 动画状态
        this.anim = this.getComponent(cc.Animation);
        // 初始化状态实例
        this.statePool = {
            'standState': new StandState(),
            'runState': new RunState(),
            'jumpState': new JumpState(),
            'jumpingState': new JumpingState(),
            'droppingState': new DroppingState(),
            'dropState': new DropState(),
        };
        //初始化输入实例
        this.inputPool = {
            'standFlg': new Input(),
            'leftFlg': new Input(),
            'rightFlg': new Input(),
            'upFlg': new Input(),
            'downFlg': new Input(),
            'jumpFlg': new Input(),
            'rollFlg': new Input(),
            'lightAtkFlg': new Input(),
            'heavyAtkFlg': new Input(),
            'skillFlg': new Input(),
            'blockFlg': new Input(),
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
        this.currentState = this.statePool.standState;
        // 初始化上一帧状态实例
        this.lastState = this.statePool.standState;

        for (var i in this.inputPool) {
            this.inputPool[i].name = i;
        }

        this.currentFlg = FrozenObj.STANDFLG;
        this.input = this.inputPool.standFlg;
        this.input.changeState(true);

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
                    case kbm.LEFT:
                        self.toward = FrozenObj.LEFT;
                        self.runLeftFlg = true;
                        //self.currentFlg = FrozenObj.RUNFLG;
                        self.input = self.inputPool.leftFlg;
                        break;
                    case kbm.RIGHT:
                        self.toward = FrozenObj.RIGHT;
                        self.runRightFlg = true;
                        //self.currentFlg = FrozenObj.RUNFLG;
                        self.input = self.inputPool.rightFlg;
                        break;
                    case kbm.UP:
                        break;
                    case kbm.DOWN:
                        break;
                    case kbm.LIGHTATK:
                        break;
                    case kbm.HEAVYATK:
                        break;
                    case kbm.SKILL:
                        break;
                    case kbm.BLOCK:
                        break;
                    case kbm.JUMP:
                        if (self.readyJump === true | self.currentState === self.statePool.jumpingState) {
                            self.jumpFlg = true;
                            //self.currentFlg = FrozenObj.JUMPFLG;
                            self.input = self.inputPool.jumpFlg;
                            self.readyJump = false;
                        } else {
                            //self.currentFlg = FrozenObj.STANDFLG;
                            self.input = self.inputPool.standFlg;
                        }
                        break;
                    case kbm.ROLL:
                        break;
                }
            },
            onKeyReleased: function (keyCode, envet) {
                switch (keyCode) {
                    case kbm.LEFT:
                        if (self.runRightFlg === true) {
                            self.toward = FrozenObj.RIGHT;
                        }
                        self.runLeftFlg = false;
                        //self.currentFlg = FrozenObj.STANDFLG;
                        self.input = self.inputPool.standFlg;
                        break;
                    case kbm.RIGHT:
                        if (self.runLeftFlg === true) {
                            self.toward = FrozenObj.LEFT;
                        }
                        self.runRightFlg = false;
                        //self.currentFlg = FrozenObj.STANDFLG;
                        self.input = self.inputPool.standFlg;
                        break;
                    case kbm.UP:
                        break;
                    case kbm.DOWN:
                        break;
                    case kbm.LIGHTATK:
                        break;
                    case kbm.HEAVYATK:
                        break;
                    case kbm.SKILL:
                        break;
                    case kbm.BLOCK:
                        break;
                    case kbm.JUMP:
                        self.jumpFlg = false;
                        //self.currentFlg = FrozenObj.DROPFLG;
                        self.input = self.inputPool.standFlg;
                        self.readyJump = true;
                        break;
                    case kbm.ROLL:
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