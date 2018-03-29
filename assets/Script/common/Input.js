/*jshint esversion: 6 */
var FrozenObj = require('FrozenObject');

var Input = cc.Class({
    properties: {
        name: '',
        currentState: FrozenObj.RELEASED,
        lastState: FrozenObj.RELEASED,
        timer: null,
    },

    changeState: function (isPressed) {
        let ls = this.lastState;
        this.lastState = this.currentState;
        if (isPressed) {
            this.currentState = this.lastState === FrozenObj.RELEASED ? FrozenObj.PRESSED : FrozenObj.BEING_PRESSED;
        } else {
            this.currentState = FrozenObj.RELEASED;
        }
    },
});

module.exports = Input;