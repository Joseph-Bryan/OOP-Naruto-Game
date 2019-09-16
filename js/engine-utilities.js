let nextEnemySpot = enemies => {
  let enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  let spotsTaken = [false, false, false, false, false];
  enemies.forEach(enemy => {
    spotsTaken[enemy.spot] = true;
  });
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemySpots);
  }
  return candidate;
};
let addBackground = root => {
  let bg = document.createElement("img");
  bg.src = "images/valleyoftheend.gif";
  bg.style.height = GAME_HEIGHT + "px";
  bg.style.width = GAME_WIDTH + "px";
  root.append(bg);
  let whiteBox = document.createElement("div");
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = GAME_HEIGHT + "px";
  whiteBox.style.height = ENEMY_HEIGHT + "px";
  whiteBox.style.width = GAME_WIDTH + "px";
  whiteBox.style.background = "black";
  root.append(whiteBox);
};

let startingPoint = root => {
  let initialBg = document.createElement("img");
  initialBg.src = "images/start.gif";
  initialBg.style.position = "absolute";
  initialBg.style.height = GAME_HEIGHT + "px";
  initialBg.style.width = GAME_WIDTH + "px";
  initialBg.style.top = "0px";
  root.append(initialBg);

  let startButton = document.createElement("button");
  startButton.type = "button";
  startButton.innerHTML = "START";
  startButton.style.height = "100px";
  startButton.style.width = "200px";
  startButton.style.position = "absolute";
  startButton.style.backgroundColor = "Transparent";
  startButton.style.border = "none";
  startButton.style.color = "#05e816";
  startButton.style.top = GAME_HEIGHT / 2 - 50 + "px";
  startButton.style.left = "348px";
  startButton.style.fontSize = "40px";
  startButton.style.cursor = "pointer";
  root.append(startButton);

  startButton.addEventListener("click", () => {
    let background = document.querySelector("img");
    let text = document.querySelectorAll("h1");
    text.forEach(elm => {
      elm.remove();
    });

    background.remove();
    startButton.remove();

    addMusic("fighting.mp3", root);

    startGame();
  });
  return startButton;
};

let addMusic = (fileName, root) => {
  let oldMusic = document.querySelector("embed");
  oldMusic.remove();

  let music = document.createElement("embed");
  music.src = fileName;
  music.setAttribute("loop", "true");
  music.setAttribute("hidden", "true");
  music.autostart = "true";
  root.appendChild(music);
};
