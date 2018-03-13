var FrozenObj = require('FrozenObject');

var Input = cc.Class({
    properties: {
        name: '',
        currentState: FrozenObj.RELEASED,
        lastState: FrozenObj.RELEASED,
        timer: null,
    },

    changeState: function (isPressed) {
        var ls = this.lastState;
        this.lastState = this.currentState;
        if (isPressed === true) {
            this.currentState = this.lastState === FrozenObj.RELEASED ? FrozenObj.PRESSED : FrozenObj.BEINGPRESSED;
        } else if (isPressed === false) {
            this.currentState = FrozenObj.RELEASED;
        }
    },
});

module.exports = Input;