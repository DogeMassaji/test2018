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

        currentState: null,
        lastState: null,

        standFlg: false,
        runLeftFlg: false,
        runRightFLg: false,
        jumpFlg: false,
        dropFlg: false,

        inputFlg: {
            currentFlg: FrozenObj.STANDFLG,
            standFlg: false,
            runLeftFlg: false,
            runRightFlg: false,
            jumpFlg: false,
            dropFlg: false,
        },

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
    dntTurnNDoAction: function () {
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
        var position = this.node.getPosition();

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

    roll: function () {
        this.doAction(FrozenObj.ROLL);
    },

    block: function () {
        this.doAction(FrozenObj.BLOCK);
    },

    clsRngAtk1: function () {
        this.doAction(FrozenObj.CLSRNGATK1);
    },

    clsRngAtk2: function () {
        this.doAction(FrozenObj.CLSRNGATK2);
    },

    clsRngAtk3: function () {
        this.doAction(FrozenObj.CLSRNGATK3);
    },

    midRngAtk1: function () {
        this.doAction(FrozenObj.MIDRNGATK1);
    },

    midRngAtk2: function () {
        this.doAction(FrozenObj.MIDRNGATK2);
    },

    midRngAtk3: function () {
        this.doAction(FrozenObj.MIDRNGATK3);
    },

    skill: function () {
        this.doAction(FrozenObj.SKILL);
    },

    counterAtk: function () {
        this.doAction(FrozenObj.COUNTERATK);
    },

    catched: function () {
        this.doAction(FrozenObj.CATCHED);
    },

    die: function () {
        this.doAction(FrozenObj.DIE);
    }
});

module.exports = Actor;