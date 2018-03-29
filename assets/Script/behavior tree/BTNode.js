var BTNode = cc.Class({
    properties: {
        status: null,
        name: null,
        parent: null,
        children: [],
        runningNode: null,
    },
});

module.exports = BTNode;