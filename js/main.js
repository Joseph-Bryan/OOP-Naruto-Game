let root = document.getElementById("app");
root.style.position = "relative";
root.style.margin = "0 auto";
root.style.marginLeft = "20%";

let body = document.querySelector("body");
body.style.backgroundColor = "black";

startingPoint(root);

let startGame = () => {
  let gameEngine = new Engine(root);
  let keydownHandler = event => {
    if (event.code === "ArrowLeft") {
      gameEngine.player.moveLeft();
    }
    if (event.code === "ArrowRight") {
      gameEngine.player.moveRight();
    }
    if (event.code === "ArrowUp") {
      gameEngine.player.moveUp();
    }
    if (event.code === "ArrowDown") {
      gameEngine.player.moveDown();
    }
  };
  document.addEventListener("keydown", keydownHandler);
  gameEngine.gameLoop();
};
