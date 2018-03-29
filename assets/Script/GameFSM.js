var FrozenObj = require('FrozenObject');

cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            default: null,
            type: cc.Node,
        },
        enemyNode: {
            default: null,
            type: cc.Prefab,
        },
    },

    onLoad: function () {
        this.player = this.playerNode.getComponent('Player');
        /* this.enemy = this.enemyNode.getComponent('Enemy'); */
    },

    start: function () {
    },

    update: function (dt) {
    },

});
