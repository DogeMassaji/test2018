var FrozenObject = {
    // Toward
    LEFT: Object.freeze('left'),
    RIGHT: Object.freeze('right'),
    UP: Object.freeze('up'),
    DOWN: Object.freeze('down'),


    FRAME_WIDTH: Object.freeze(960),
    FRAME_HEIGHT: Object.freeze(640),
    HORIZONTAL_LINE: Object.freeze(-160),


    // State
    STAND: Object.freeze('stand'),
    RUN: Object.freeze('run'),
    JUMP: Object.freeze('jump'),
    JUMPING: Object.freeze('jumping'),
    DROPPING: Object.freeze('dropping'),
    DROP: Object.freeze('drop'),
    ROLL: Object.freeze('roll'),

    LIGHTATK: Object.freeze('lightAtk'),
    HEAVYATK: Object.freeze('heavyAtk'),
    SKILL: Object.freeze('skill'),
    BLOCK: Object.freeze('block'),
    COUNTERATK: Object.freeze('counterAtk'),
    JUMPLIGHTATK: Object.freeze('jumpLightAtk'),
    JUMPHEAVYATK: Object.freeze('jumpHeavyAtk'),

    ATTACKED: Object.freeze('attacked'),
    ATTACKEDHARD: Object.freeze('attackedHard'),
    CATCHED: Object.freeze('catched'),
    DIE: Object.freeze('die'),


    // Input flag
    STANDFLG: Object.freeze('standFlg'),
    LEFTFLG: Object.freeze('leftFlg'),
    RIGHTFLG: Object.freeze('rightFlg'),
    UPFLG: Object.freeze('upFlg'),
    DOWNFLG: Object.freeze('downFlg'),
    JUMPFLG: Object.freeze('jumpFlg'),
    ROLLFLG: Object.freeze('rollFlg'),
    LIGHTATKFLG: Object.freeze('lightAtkFlg'),
    HEAVYATKFLG: Object.freeze('heavyAtkFlg'),
    SKILLFLG: Object.freeze('skillFlg'),
    BLOCKFLG: Object.freeze('blockFlg'),


    // Input state
    RELEASED: Object.freeze('released'),
    PRESSED: Object.freeze('pressed'),
    BEINGPRESSED: Object.freeze('beingPressed'),
};

module.exports = FrozenObject;