export default function lose() {
  return scene('lose', (args) => {
    add([text(args), scale(1), pos(width() / 2, height() / 2)]);
  });
}
