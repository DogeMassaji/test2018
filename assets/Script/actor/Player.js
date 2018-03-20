var Actor = require('Actor');

var FrozenObj = require('FrozenObject');
var kbm = require('KeyBoardMap');

var StandState = require('StandState');
var RunState = require('RunState');
var JumpState = require('JumpState');
var JumpingState = require('JumpingState');
var DroppingState = require('DroppingState');
var DropState = require('DropState');
var RollState = require('RollState');

var LightAtkState = require('LightAtkState');
var HeavyAtkState = require('HeavyAtkState');
var SkillState = require('SkillState');
var BlockState = require('BlockState');
var CounterAtkState = require('CounterAtkState');

var Input = require('Input');

var Player = cc.Class({
    extends: Actor,

    properties: {

    },

    onLoad: function () {
        // 动画状态
        this.anim = this.getComponent(cc.Animation);
        //注册动画回调
        this.anim.getAnimationState('drop').on('finished', this.returnStand, this);
        this.anim.getAnimationState('roll').on('finished', this.returnStand, this);
        this.anim.getAnimationState('lightAtk1').on('finished', this.returnStand, this);
        this.anim.getAnimationState('heavyAtk1').on('finished', this.returnStand, this);
        this.anim.getAnimationState('skill').on('finished', this.returnStand, this);
        this.anim.getAnimationState('counterAtk').on('finished', this.returnStand, this);
        // 初始化状态实例
        this.statePool = {
            'standState': new StandState(),
            'runState': new RunState(),
            'jumpState': new JumpState(),
            'jumpingState': new JumpingState(),
            'droppingState': new DroppingState(),
            'dropState': new DropState(),
            'rollState': new RollState(),
            'lightAtkState': new LightAtkState(),
            'heavyAtkState': new HeavyAtkState(),
            'skillState': new SkillState(),
            'blockState': new BlockState(),
            'counterAtkState': new CounterAtkState(),
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
        this.currentInput = this.inputPool.standFlg;
        this.currentInput.changeState(true);

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
                        self.inputPool.leftFlg.changeState(true);
                        self.currentInput = self.inputPool.leftFlg;
                        break;
                    case kbm.RIGHT:
                        self.inputPool.rightFlg.changeState(true);
                        self.currentInput = self.inputPool.rightFlg;
                        break;
                    case kbm.UP:
                        break;
                    case kbm.DOWN:
                        break;
                    case kbm.JUMP:
                        self.inputPool.jumpFlg.changeState(true);
                        self.currentInput = self.inputPool.jumpFlg;
                        break;
                    case kbm.ROLL:
                        self.inputPool.rollFlg.changeState(true);
                        self.currentInput = self.inputPool.rollFlg;
                        break;
                    case kbm.LIGHTATK:
                        self.inputPool.lightAtkFlg.changeState(true);
                        self.currentInput = self.inputPool.lightAtkFlg;
                        break;
                    case kbm.HEAVYATK:
                        self.inputPool.heavyAtkFlg.changeState(true);
                        self.currentInput = self.inputPool.heavyAtkFlg;
                        break;
                    case kbm.SKILL:
                        self.inputPool.skillFlg.changeState(true);
                        self.currentInput = self.inputPool.skillFlg;
                        break;
                    case kbm.BLOCK:
                        self.inputPool.blockFlg.changeState(true);
                        self.currentInput = self.inputPool.blockFlg;
                        break;
                    default:
                        break;
                }
            },
            onKeyReleased: function (keyCode, envet) {
                switch (keyCode) {
                    case kbm.LEFT:
                        self.inputPool.leftFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.RIGHT:
                        self.inputPool.rightFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.UP:
                        break;
                    case kbm.DOWN:
                        break;
                    case kbm.JUMP:
                        self.inputPool.jumpFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.ROLL:
                        self.inputPool.rollFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.LIGHTATK:
                        self.inputPool.lightAtkFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.HEAVYATK:
                        self.inputPool.heavyAtkFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.SKILL:
                        self.inputPool.skillFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.BLOCK:
                        self.inputPool.blockFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    default:
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

    /**
     * 动画结束回调函数
     */
    returnStand: function () {
        this.currentState = this.statePool.standState;
    },
});