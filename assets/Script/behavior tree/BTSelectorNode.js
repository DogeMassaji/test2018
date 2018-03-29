/*jshint esversion: 6 */
var BTNode = require('BTNode');
var FrozenObj = require('FrozenObject');

var BTSelectorNode = cc.Class({
    extends: BTNode,

    runNodes: function () {
        for (let child of this.children) {
            if (child.runNodes() !== FrozenObj.FAILURE) {
                this.status = child.runNodes();
                this.runningNode = child.runNodes() === FrozenObj.RUNNING ? child.runningNode : null;
                break;
            }
        }
        if (this.status === null) {
            this.status = FrozenObj.FAILURE;
        }
    },
});