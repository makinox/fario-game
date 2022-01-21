export default function win() {
  return scene('win', (args) => {
    add([text('you win'), scale(1), pos(width() / 2, height() / 2)]);
  });
}
