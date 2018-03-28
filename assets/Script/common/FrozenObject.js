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

    LIGHT_ATK_1: Object.freeze('lightAtk1'),
    LIGHT_ATK_2: Object.freeze('lightAtk2'),
    LIGHT_ATK_3: Object.freeze('lightAtk3'),
    HEAVY_ATK_1: Object.freeze('heavyAtk1'),
    SKILL: Object.freeze('skill'),
    BLOCK: Object.freeze('block'),
    COUNTER_ATK: Object.freeze('counterAtk'),
    ROLL_ATK: Object.freeze('rollAtk'),
    LIGHT_ATK_IN_AIR: Object.freeze('lightAtkInAir'),
    HEAVY_ATK_IN_AIR: Object.freeze('heavyAtkInAir'),

    ATTACKED: Object.freeze('attacked'),
    ATTACKEDHARD: Object.freeze('attackedHard'),
    CATCHED: Object.freeze('catched'),
    DIE: Object.freeze('die'),


    // Input flag
    STAND_FLG: Object.freeze('standFlg'),
    LEFT_FLG: Object.freeze('leftFlg'),
    RIGHT_FLG: Object.freeze('rightFlg'),
    UP_FLG: Object.freeze('upFlg'),
    DOWN_FLG: Object.freeze('downFlg'),
    JUMP_FLG: Object.freeze('jumpFlg'),
    ROLL_FLG: Object.freeze('rollFlg'),
    LIGHT_ATK_FLG: Object.freeze('lightAtkFlg'),
    HEAVY_ATK_FLG: Object.freeze('heavyAtkFlg'),
    SKILL_FLG: Object.freeze('skillFlg'),
    BLOCK_FLG: Object.freeze('blockFlg'),


    // Input state
    RELEASED: Object.freeze('released'),
    PRESSED: Object.freeze('pressed'),
    BEING_PRESSED: Object.freeze('beingPressed'),


    // Attack state
    SHAKE_BEFORE: Object.freeze('shakeBefore'),
    ATTACKING: Object.freeze('attacking'),
    SHAKE_AFTER: Object.freeze('shakeAfter'),
    NOT_ATTACKING: Object.freeze('notAttacking'),
};

module.exports = FrozenObject;