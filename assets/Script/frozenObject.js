var frozenObject = {
    LEFT: Object.freeze('left'),
    RIGHT: Object.freeze('right'),
    UP: Object.freeze('up'),
    DOWN: Object.freeze('down'),

    FRAME_WIDTH: Object.freeze(960),
    FRAME_HEIGHT: Object.freeze(640),
    HORIZONTAL_LINE: Object.freeze(-160),

    ATTACK: Object.freeze('attack'),
    DEFEATED: Object.freeze('defeated'),
    DEFENSE: Object.freeze('defense'),
    HITTEN: Object.freeze('hitten'),
    RUN: Object.freeze('run'),
    SKILL: Object.freeze('skill'),
    STAND: Object.freeze('stand'),

    HIT_L: Object.freeze('hit_L'),
    COMBO: Object.freeze('combo'),
    CONNECT: Object.freeze('connect'),
    JUMP_N_HIT_L: Object.freeze('jump_n_hit_L'),
    JUMP_N_HIT_H: Object.freeze('jump_n_hit_H'),
    JUMP: Object.freeze('jump'),
    DROP: Object.freeze('drop'),
}

module.exports = frozenObject;