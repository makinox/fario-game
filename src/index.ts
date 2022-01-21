import kaboom from 'kaboom';

import pipeTopRightSide from '/assets/pipe-top-right-side.png';
import pipeTopLeftSide from '/assets/pipe-top-left-side.png';
import blueEvilShroom from '/assets/blue-evil-shroom.png';
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
  // background: [0, 0, 0],
  scale: 1.5,
});

loadSprite('pipe-top-right-side', pipeTopRightSide);
loadSprite('pipe-top-left-side', pipeTopLeftSide);
loadSprite('blue-evil-shroom', blueEvilShroom);
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

const map = [
  '                                          ',
  '                                          ',
  '                                          ',
  '                                          ',
  '                                          ',
  '                                          ',
  '                                          ',
  '       %  =*=%                            ',
  '                                          ',
  '                                  -+      ',
  '                  ^  ^            ()      ',
  '====================================    ==',
];

const levelCfg = {
  width: 20,
  height: 20,
  '=': () => [sprite('block'), area(), solid()],
  x: () => [sprite('brick'), area(), solid()],
  $: () => [sprite('coin'), 'coin'],
  '%': () => [sprite('question'), 'coin-surprise', area(), solid()],
  '*': () => [sprite('question'), 'mushroom-surprise', area(), solid()],
  '}': () => [sprite('unboxed'), area(), solid()],
  '(': () => [sprite('pipe-left'), scale(0.5), area(), solid()],
  ')': () => [sprite('pipe-right'), scale(0.5), area(), solid()],
  '-': () => [sprite('pipe-top-left-side'), scale(0.5), area(), solid(), 'pipe'],
  '+': () => [sprite('pipe-top-right-side'), scale(0.5), area(), solid(), 'pipe'],
  '^': () => [sprite('evil-shroom-1'), area(), solid(), 'dangerous'],
  '#': () => [sprite('mushroom'), 'mushroom', body()],
  '£': () => [sprite('blue-brick'), area(), solid(), scale(0.5)],
  z: () => [sprite('blue-block'), area(), solid(), scale(0.5)],
  '@': () => [sprite('blue-surprise'), area(), solid(), scale(0.5), 'coin-surprise'],
  '!': () => [sprite('blue-evil-shroom'), 'dangerous', scale(0.5)],
  s: () => [sprite('blue-steel'), area(), solid(), scale(0.5)],
};

addLevel(map, levelCfg);
