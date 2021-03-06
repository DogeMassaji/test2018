/*jshint esversion: 6 */
var FrozenObj = require('FrozenObject');

var Actor = cc.Class({
    extends: cc.Component,

    properties: {
        // 初始水平方向速度
        initXSpeed: 0,
        // 初始垂直方向速度
        initYSpeed: 0,
        // 水平方向速度
        xSpeed: 0,
        // 垂直方向速度
        ySpeed: 0,
        // 加速度
        accSpeed: 0,

        // 方向
        toward: FrozenObj.RIGHT,

        statePool: null,

        currentState: null,
        lastState: null,

        inputPool: null,

        currentInput: null,

        attackState: null,

        comboFlg: false,

        // 动画组件
        anim: null,
    },

    /**
     * @function 透明化
     * @description 对Node作透明化处理
     * @param {Number} opcity
     */
    visible: function (opcity) {
        this.node.opacity = opcity;
    },

    /**
     * @function 执行动作
     * @description 仅执行动作
     * @param {String} action
     */
    doAction: function (action, isTurn) {
        if (!this.anim.getAnimationState(action).isPlaying) {
            this.anim.play(action);
        }
    },

    /**
     * @function 不转向执行动作
     * @description 在动作进行期间不转向并执行动作
     */
    dntTurnNDoAction: function (action) {
        if (!this.anim.getAnimationState(action).isPlaying) {
            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
            }
            this.anim.play(action);
        }
    },

    /**
     * @function 水平方向上转向并移动
     * @description 在动作进行期间水平方向上可转向并移动
     */
    horMove: function (speed) {
        let position = this.node.getPosition();

        if (this.toward === FrozenObj.RIGHT) {
            this.node.scaleX = 1;
            if (position.x >= FrozenObj.FRAME_WIDTH / 2) {
                this.xSpeed = 0;
            } else {
                this.xSpeed = speed;
            }
        } else if (this.toward === FrozenObj.LEFT) {
            this.node.scaleX = -1;
            if (position.x <= -FrozenObj.FRAME_WIDTH / 2) {
                this.xSpeed = 0;
            } else {
                this.xSpeed = -speed;
            }
        }

        this.node.x += this.xSpeed;
    },

    /**
     * @function 垂直方向移动
     * @description 在动作进行期间垂直方向上可转向并移动
     */
    verMove: function () {
        this.ySpeed = (this.ySpeed * 10 - this.accSpeed * 10) / 10;
        this.node.y = (this.node.y * 10 + this.ySpeed * 10) / 10;
    },

    /* turn: function () {
        if (this.toward === FrozenObj.RIGHT) {
            this.xSpeed = this.initXSpeed;
        } else if (this.toward === FrozenObj.LEFT) {
            this.xSpeed = -this.initXSpeed;
        }
    }, */
    run: function (speed) {
        this.horMove(speed);
        this.doAction(FrozenObj.RUN);
    },

    stand: function () {
        this.doAction(FrozenObj.STAND);
    },

    jump: function () {
        this.doAction(FrozenObj.JUMP);
    },

    jumping: function () {
        this.verMove();
        this.doAction(FrozenObj.JUMPING);
    },

    dropping: function () {
        this.verMove();
        this.doAction(FrozenObj.DROPPING);
    },

    drop: function () {
        this.doAction(FrozenObj.DROP);
    },

    roll: function (speed) {
        if (!this.anim.getAnimationState('roll').isPlaying) {
            this.anim.play('roll');

            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
                this.xSpeed = speed;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
                this.xSpeed = -speed;
            }
        }
        this.node.x += this.xSpeed;
    },

    block: function (speed) {
        this.doAction(FrozenObj.BLOCK);
        this.node.x += speed;
    },

    lightAtk1: function () {
        if (!this.anim.getAnimationState('lightAtk1').isPlaying) {
            this.anim.play('lightAtk1');
            let offset = 30;
            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
                this.node.x += offset;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
                this.node.x -= offset;
            }
        }
    },

    lightAtk2: function () {
        if (!this.anim.getAnimationState('lightAtk2').isPlaying) {
            this.anim.play('lightAtk2');
            let offset = 10;
            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
                this.node.x += offset;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
                this.node.x -= offset;
            }
        }
    },

    lightAtk3: function () {
        if (!this.anim.getAnimationState('lightAtk3').isPlaying) {
            this.anim.play('lightAtk3');
            let offset = 10;
            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
                this.node.x += offset;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
                this.node.x -= offset;
            }
        }
    },

    clsRngAtk2: function () {
        this.doAction(FrozenObj.CLSRNGATK2);
    },

    clsRngAtk3: function () {
        this.doAction(FrozenObj.CLSRNGATK3);
    },

    heavyAtk1: function () {
        if (!this.anim.getAnimationState('heavyAtk1').isPlaying) {
            this.anim.play('heavyAtk1');
            let offset = 30;
            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
                this.node.x += offset;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
                this.node.x -= offset;
            }
        }
    },

    midRngAtk2: function () {
        this.doAction(FrozenObj.MIDRNGATK2);
    },

    midRngAtk3: function () {
        this.doAction(FrozenObj.MIDRNGATK3);
    },

    skill: function () {
        if (!this.anim.getAnimationState('skill').isPlaying) {
            this.anim.play('skill');
            let offset = 30;
            if (this.toward === FrozenObj.RIGHT) {
                this.node.scaleX = 1;
                this.node.x += offset;
            } else if (this.toward === FrozenObj.LEFT) {
                this.node.scaleX = -1;
                this.node.x -= offset;
            }
        }
    },

    counterAtk: function () {
        this.doAction(FrozenObj.COUNTER_ATK);
    },

    rollAtk: function () {
        this.doAction(FrozenObj.ROLL_ATK);
    },

    lightAtkInAir: function () {
        this.doAction(FrozenObj.LIGHT_ATK_IN_AIR);
    },

    heavyAtkInAir: function () {
        this.doAction(FrozenObj.HEAVY_ATK_IN_AIR);
    },

    catched: function () {
        this.doAction(FrozenObj.CATCHED);
    },

    die: function () {
        this.doAction(FrozenObj.DIE);
    }
});

module.exports = Actor;