var common = {
    adjustPerspective: function (map, player) {
        map.node.position = player.node.position;
        cc.log(world.node.position);
    },
}

module.exports = common;