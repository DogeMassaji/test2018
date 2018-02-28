var frozenObj = require('frozenObject');

var Actor = cc.Class({
    extends: cc.Component,

    properties: {
        // 速度
        speed: 0,
        /**
         * 方向
         * @description "右"为true，"左"为false
         */
        toward: true,
        // 站立flag
        standFlg: false,
        // 跑动flag
        runFlg: false,
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
     * @function 转向并移动
     * @description 在动作进行期间可转向并移动
     */
    turnNMove: function () {
        var position = this.node.getPosition();

        if (this.toward) {
            this.node.scaleX = 1;
            if (position.x >= frozenObj.FRAME_WIDTH / 2) {
                this.xSpeed = 0;
            } else {
                this.xSpeed = this.speed;
            }
        } else {
            this.node.scaleX = -1;
            if (position.x <= -frozenObj.FRAME_WIDTH / 2) {
                this.speed = 0;
            } else {
                this.xSpeed = -this.speed;
            }
        }
    },

    run: function () {
        this.turnNMove();
        this.doAction(frozenObj.RUN);
        this.node.x += this.xSpeed;
    },

    stand: function () {
        this.doAction(frozenObj.STAND);
    },

    jump: function () {
        this.turnNMove();
        this.doAction(frozenObj.JUMP);
        this.node.x += this.xSpeed;
        this.node.y += this.ySpeed;
    },

    drop: function () {
        var position = this.node.getPosition();
        this.turnNMove();
        this.doAction(frozenObj.DROP);
        this.node.x += this.xSpeed;
        this.node.y -= this.speed;
    },

    roll: function () {
        // do nothing...
    },

    lightAttack: function () {
        this.dntTurnNDoAction(frozenObj.HIT_L);
    },

    heightAttack: function () {
        this.dntTurnNDoAction(frozenObj.HIT_H);
    },

    skill: function () {
        // do nothing...
    },

    hitten: function () {
        this.doAction(frozenObj.HITTEN);
    },

    lay: function () {
        // do nothing...
    },

    catched: function () {
        // do nothing...
    },

    die: function () {
        this.doAction(frozenObj.DIE);
    }
});

module.exports = Actor;