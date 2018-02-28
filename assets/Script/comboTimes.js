cc.Class({
    extends: cc.Component,

    properties: {
        numbersAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
    },

    comboTimesSwitch: function (times) {
        if (times != null & times > 0) {
            this.getComponent(cc.Sprite).spriteFrame = this.numbersAtlas.getSpriteFrames()[times];
        } else {
            this.getComponent(cc.Sprite).spriteFrame = null;
        }
    },

    onLoad: function () {
    },

    update: function (dt) {

    },
});
