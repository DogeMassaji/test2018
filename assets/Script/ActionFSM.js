var FrozenObj = require('FrozenObject');
var actionInFSM = require('ActionInFSM');

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
        //this.inputHandler();
    },

    start: function () {
    },

    update: function (dt) {
    },

});
