import kaboom from 'kaboom';

import pipeTopRightSide from '/assets/pipe-top-right-side.png';
import pipeTopLeftSide from '/assets/pipe-top-left-side.png';
import blueEvilShroom from '/assets/blue-evil-shroom.png';
import marioStanding from '/assets/mario-standing.png';
import blueSurprise from '/assets/blue-surprise.png';
import evilShroom1 from '/assets/evil-shroom-1.png';
import pipeRight from '/assets/pipe-right.png';
import blueBrick from '/assets/blue-brick.png';
import blueBlock from '/assets/blue-block.png';
import blueSteel from '/assets/blue-steel.png';
import pipeLeft from '/assets/pipe-left.png';
import mushroom from '/assets/mushroom.png';
import question from '/assets/question.png';
import unboxed from '/assets/unboxed.png';
import brick from '/assets/brick.png';
import block from '/assets/block.png';
import coin from '/assets/coin.png';

kaboom({
  background: [158, 225, 255],
  font: 'sinko',
  scale: 1.3,
});

loadSprite('pipe-top-right-side', pipeTopRightSide);
loadSprite('pipe-top-left-side', pipeTopLeftSide);
loadSprite('blue-evil-shroom', blueEvilShroom);
loadSprite('mario-standing', marioStanding);
loadSprite('blue-surprise', blueSurprise);
loadSprite('evil-shroom-1', evilShroom1);
loadSprite('pipe-right', pipeRight);
loadSprite('blue-brick', blueBrick);
loadSprite('blue-block', blueBlock);
loadSprite('blue-steel', blueSteel);
loadSprite('pipe-left', pipeLeft);
loadSprite('mushroom', mushroom);
loadSprite('question', question);
loadSprite('unboxed', unboxed);
loadSprite('brick', brick);
loadSprite('block', block);
loadSprite('coin', coin);

layer('obj');
layer('ui');
layers(['obj', 'ui'], 'obj');

const SCORE = 0;
const MOVE_SPEED = 120;
const JUMP_FORCE = 500;

const map = [
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '       %  =*=%                        ',
  '                                      ',
  '                              -+      ',
  '                  ^  ^        ()      ',
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    xx',
];

const levelCfg = {
  width: 20,
  height: 20,
  '=': () => [sprite('block'), area(), solid()],
  x: () => [sprite('brick'), area(), solid()],
  $: () => [sprite('coin'), 'coin'],
  '%': () => [sprite('question'), area(), solid(), 'coin-surprise'],
  '*': () => [sprite('question'), area(), solid(), 'mushroom-surprise'],
  '}': () => [sprite('unboxed'), area(), solid()],
  '(': () => [sprite('pipe-left'), scale(0.5), area(), solid()],
  ')': () => [sprite('pipe-right'), scale(0.5), area(), solid()],
  '-': () => [sprite('pipe-top-left-side'), scale(0.5), area(), solid(), 'pipe'],
  '+': () => [sprite('pipe-top-right-side'), scale(0.5), area(), solid(), 'pipe'],
  '^': () => [sprite('evil-shroom-1'), area(), solid(), 'dangerous'],
  '#': () => [sprite('mushroom'), 'mushroom', body(), area()],
  '£': () => [sprite('blue-brick'), area(), solid(), scale(0.5)],
  z: () => [sprite('blue-block'), area(), solid(), scale(0.5)],
  '@': () => [sprite('blue-surprise'), area(), solid(), scale(0.5), 'coin-surprise'],
  '!': () => [sprite('blue-evil-shroom'), 'dangerous', scale(0.5)],
  s: () => [sprite('blue-steel'), area(), solid(), scale(0.5)],
};

const gameLevel = addLevel(map, levelCfg);

add([text('level 0'), pos(60, 6)]);

const scoreLabel = add([
  text('0'),
  pos(30, 6),
  layer('ui'),
  {
    value: '0',
  },
]);

const player = add([sprite('mario-standing'), pos(30, 0), body(), area(), big(), 'fario']);

function big() {
  let timer = 0;
  let isBig = false;

  return {
    update() {
      if (isBig) {
        timer -= dt();
        if (timer <= 0) {
          this.smallify();
        }
      }
    },
    isBig() {
      return isBig;
    },
    smallify() {
      this.scale = vec2(1);
      timer = 0;
      isBig = false;
    },
    biggify(time = 0) {
      this.scale = vec2(2);
      timer = time;
      isBig = true;
    },
  };
}

keyDown(['left', 'a'], () => {
  player.move(-MOVE_SPEED, 0);
});

keyDown(['right', 'd'], () => {
  player.move(MOVE_SPEED, 0);
});

keyDown('space', () => {
  if (player.isGrounded()) {
    player.jump(JUMP_FORCE);
  }
});

onCollide('fario', 'coin-surprise', (fari, box, colision) => {
  if (colision.isTop() && colision.target.is('coin-surprise')) {
    gameLevel.spawn('$', box.gridPos.sub(0, 1));
    destroy(box);
    gameLevel.spawn('}', box.gridPos.sub(0, 0));
  }
});

onCollide('fario', 'mushroom-surprise', (fari, box, colision) => {
  if (colision.isTop() && colision.target.is('mushroom-surprise')) {
    gameLevel.spawn('#', box.gridPos.sub(0, 1));
    destroy(box);
    gameLevel.spawn('}', box.gridPos.sub(0, 0));
  }
});

onCollide('fario', 'mushroom', (fari, box, colision) => {
  fari.biggify(6);
  destroy(box);
});

action('mushroom', (obj) => {
  obj.move(20, 0);
});
