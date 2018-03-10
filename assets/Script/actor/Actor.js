var frozenObj = require('frozenObject');

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
        /**
         * 方向
         * @description "右"为true，"左"为false
         */
        toward: true,

        currentState: null,
        lastState: null,

        standFlg: false,
        runFlg: false,
        jumpFlg: false,
        dropFlg: false,

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
            if (this.toward) {
                this.node.scaleX = 1;
            } else {
                this.node.scaleX = -1;
            }
            this.anim.play(action);
        }
    },

    /**
     * @function 水平方向上转向并移动
     * @description 在动作进行期间水平方向上可转向并移动
     */
    horMove: function () {
        var position = this.node.getPosition();

        if (this.toward) {
            this.node.scaleX = 1;
            if (position.x >= frozenObj.FRAME_WIDTH / 2) {
                this.xSpeed = 0;
            } else {
                this.xSpeed = this.initXSpeed;
            }
        } else {
            this.node.scaleX = -1;
            if (position.x <= -frozenObj.FRAME_WIDTH / 2) {
                this.xSpeed = 0;
            } else {
                this.xSpeed = -this.initXSpeed;
            }
        }

        this.node.x += this.xSpeed;
    },

    /**
     * @function 垂直方向移动
     * @description 在动作进行期间垂直方向上可转向并移动
     */
    verMove: function () {
        this.ySpeed -= this.accSpeed;
        this.node.y += this.ySpeed;
    },

    run: function () {
        this.horMove();
        this.doAction(frozenObj.RUN);
    },

    stand: function () {
        this.doAction(frozenObj.STAND);
        this.xSpeed = 0;
        this.ySpeed = 0;
    },

    jump: function () {
        this.doAction(frozenObj.JUMP);
    },

    jumping: function () {
        this.doAction(frozenObj.JUMPING);
    },

    dropping: function () {
        this.doAction(frozenObj.DROPPING);
    },

    drop: function () {
        this.doAction(frozenObj.DROP);
    },

    roll: function () {
        this.doAction(frozenObj.ROLL);
    },

    block: function () {
        this.doAction(frozenObj.BLOCK);
    },

    clsRngAtk1: function () {
        this.doAction(frozenObj.CLSRNGATK1);
    },

    clsRngAtk2: function () {
        this.doAction(frozenObj.CLSRNGATK2);
    },

    clsRngAtk3: function () {
        this.doAction(frozenObj.CLSRNGATK3);
    },

    midRngAtk1: function () {
        this.doAction(frozenObj.MIDRNGATK1);
    },

    midRngAtk2: function () {
        this.doAction(frozenObj.MIDRNGATK2);
    },

    midRngAtk3: function () {
        this.doAction(frozenObj.MIDRNGATK3);
    },

    skill: function () {
        this.doAction(frozenObj.SKILL);
    },

    counterAtk: function () {
        this.doAction(frozenObj.COUNTERATK);
    },

    catched: function () {
        this.doAction(frozenObj.CATCHED);
    },

    die: function () {
        this.doAction(frozenObj.DIE);
    }
});

module.exports = Actor;