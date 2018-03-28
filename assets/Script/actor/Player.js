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

var LightAtk1State = require('LightAtk1State');
var LightAtk2State = require('LightAtk2State');
var LightAtk3State = require('LightAtk3State');
var HeavyAtk1State = require('HeavyAtk1State');
var SkillState = require('SkillState');
var BlockState = require('BlockState');
var RollAtkState = require('RollAtkState');
var CounterAtkState = require('CounterAtkState');
var LightAtkInAirState = require('LightAtkInAirState');
var HeavyAtkInAirState = require('HeavyAtkInAirState');

var Input = require('Input');

var Player = cc.Class({
    extends: Actor,

    properties: {

    },
    //做完一次性动作回归状态应该根据输入池的状态来判断
    //不能全部都回归stand
    //比如在攻击期间按住block持续到攻击结束后，此时应该会归到block
    onLoad: function () {
        // 动画状态
        this.anim = this.getComponent(cc.Animation);
        //注册动画回调
        this.anim.getAnimationState(FrozenObj.DROP).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.ROLL).on('finished', this.returnDefaultOfRoll, this);
        this.anim.getAnimationState(FrozenObj.LIGHT_ATK_1).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.LIGHT_ATK_2).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.LIGHT_ATK_3).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.HEAVY_ATK_1).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.SKILL).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.COUNTER_ATK).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.LIGHT_ATK_IN_AIR).on('finished', this.returnDropping, this);
        this.anim.getAnimationState(FrozenObj.HEAVY_ATK_IN_AIR).on('finished', this.returnDefault, this);
        this.anim.getAnimationState(FrozenObj.ROLL_ATK).on('finished', this.returnDefault, this);
        // 初始化状态实例
        this.statePool = {
            'standState': new StandState(),
            'runState': new RunState(),
            'jumpState': new JumpState(),
            'jumpingState': new JumpingState(),
            'droppingState': new DroppingState(),
            'dropState': new DropState(),
            'rollState': new RollState(),
            'lightAtk1State': new LightAtk1State(),
            'lightAtk2State': new LightAtk2State(),
            'lightAtk3State': new LightAtk3State(),
            'heavyAtk1State': new HeavyAtk1State(),
            'skillState': new SkillState(),
            'blockState': new BlockState(),
            'counterAtkState': new CounterAtkState(),
            'rollAtkState': new RollAtkState(),
            'lightAtkInAirState': new LightAtkInAirState(),
            'heavyAtkInAirState': new HeavyAtkInAirState(),
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

        this.attackState = FrozenObj.NOT_ATTACKING;

        this.comboFlg = false;

        for (var i in this.inputPool) {
            this.inputPool[i].name = i;
        }

        this.currentFlg = FrozenObj.STAND_FLG;
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
                    case kbm.LIGHT_ATK:
                        self.inputPool.lightAtkFlg.changeState(true);
                        self.currentInput = self.inputPool.lightAtkFlg;
                        break;
                    case kbm.HEAVY_ATK:
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
                    case kbm.LIGHT_ATK:
                        self.inputPool.lightAtkFlg.changeState(false);
                        self.currentInput = self.inputPool.standFlg;
                        break;
                    case kbm.HEAVY_ATK:
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
     * 回归default状态
     */
    returnDefault: function () {
        /* this.currentState = this.statePool.standState; */
        this.statePool.standState.defaultState(this);
        this.attackState = FrozenObj.NOT_ATTACKING;
        this.comboFlg = false;
    },

    returnDefaultOfRoll: function () {
        if (this.comboFlg) {
            this.currentState = this.statePool.rollAtkState;
        } else {
            this.returnDefault();
        }
    },

    /**
     * 动画结束回调函数
     * 回归dropping状态
     */
    returnDropping: function () {
        this.currentState = this.statePool.droppingState;
    },

    /**
     * 角色攻击回调函数
     */
    shakeOfAttack: function (state) {
        if (state === FrozenObj.SHAKE_BEFORE) {
            this.attackState = FrozenObj.SHAKE_BEFORE;
            this.comboFlg = false;
        } else if (state === FrozenObj.ATTACKING) {
            this.attackState = FrozenObj.ATTACKING;
        } else if (state == FrozenObj.SHAKE_AFTER) {
            this.attackState = FrozenObj.SHAKE_AFTER;
        } else if (state == FrozenObj.NOT_ATTACKING) {
            this.attackState = FrozenObj.NOT_ATTACKING;
        }
    }
});