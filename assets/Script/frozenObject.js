var FrozenObject = {
    LEFT: Object.freeze('left'),
    RIGHT: Object.freeze('right'),
    UP: Object.freeze('up'),
    DOWN: Object.freeze('down'),


    FRAME_WIDTH: Object.freeze(960),
    FRAME_HEIGHT: Object.freeze(640),
    HORIZONTAL_LINE: Object.freeze(-160),


    STAND: Object.freeze('stand'),
    RUN: Object.freeze('run'),
    JUMP: Object.freeze('jump'),
    JUMPING: Object.freeze('jumping'),
    DROPPING: Object.freeze('dropping'),
    DROP: Object.freeze('drop'),
    ROLL: Object.freeze('roll'),

    BLOCK: Object.freeze('block'),
    CLSRNGATK1: Object.freeze('clsRngAtk1'),
    CLSRNGATK2: Object.freeze('clsRngAtk2'),
    CLSRNGATK3: Object.freeze('clsRngAtk3'),
    MIDRANGEATK1: Object.freeze('midRngAtk1'),
    MIDRANGEATK2: Object.freeze('midRngAtk2'),
    MIDRANGEATK3: Object.freeze('midRngAtk3'),
    LONGRANGEATK1: Object.freeze('longRngAtk1'),
    LONGRANGEATK2: Object.freeze('longRngAtk2'),
    LONGRANGEATK3: Object.freeze('longRngAtk3'),
    SKILL: Object.freeze('skill'),
    COUNTERATK: Object.freeze('counterAtk'),
    JUMPLIGHTATK: Object.freeze('jumpLightAtk'),
    JUMPHEAVYATK: Object.freeze('jumpHeavyAtk'),

    ATTACKED: Object.freeze('attacked'),
    ATTACKEDHARD: Object.freeze('attackedHard'),
    CATCHED: Object.freeze('catched'),
    DIE: Object.freeze('die'),


    STANDFLG: Object.freeze('standFlg'),
    RUNFLG: Object.freeze('runFlg'),
    BLOCKFLG: Object.freeze('blockFlg'),
    DOWNFLG: Object.freeze('downFlg'),
    ATTACKFLG: Object.freeze('attackFlg'),
    SKILLFLG: Object.freeze('skillFlg'),
    JUMPFLG: Object.freeze('jumpFlg'),
    ROLLFLG: Object.freeze('rollFlg'),
};

module.exports = FrozenObject;