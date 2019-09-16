class Engine {
  gameLoop = () => {
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);
    });
    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });

    let speedTimer = Math.floor(new Date() / 1000) - this.speedTimer;

    while (this.enemies.length < MAX_ENEMIES) {
      let spot = nextEnemySpot(this.enemies);

      let num = Math.floor(Math.random() * 2);
      let enemy;
      if (num === 0) {
        enemy = new FastEnemy(this.root, spot);
      } else {
        enemy = new SlowEnemy(this.root, spot);
      }

      if (speedTimer < 5) {
        enemy.speed = enemy.speed * 0.5;
      } else if (speedTimer >= 5 && speedTimer < 10) {
        enemy.speed = enemy.speed * 1;
      } else {
        enemy.speed = enemy.speed * 1.25;
      }

      this.enemies.push(enemy);
    }

    // Checking if the player is dead
    if (this.isPlayerDead()) {
      this.removeAllImages();
      this.removeScoreDiv();

      addMusic("defeated.mp3", this.root);

      let restart = startingPoint(this.root);
      restart.innerHTML = "RETRY";

      let gameover = document.createElement("h1");
      gameover.style.position = "absolute";
      gameover.style.color = "#05e816";
      gameover.style.top = "140px";
      gameover.style.left = "360px";
      gameover.innerHTML = "DEFEATED";
      this.root.append(gameover);

      let pastScore = document.createElement("h1");
      pastScore.style.position = "absolute";
      pastScore.style.color = "#05e816";
      pastScore.style.left = "320px";
      pastScore.style.top = "180px";
      pastScore.innerHTML = "Your score was " + this.score;
      this.root.append(pastScore);

      return;
    }

    //increase score
    this.scoreDiv.update(this.score++);

    setTimeout(this.gameLoop, 20);

    //increase enemies every 10 seconds
    let timeElapsed = Math.floor(new Date() / 1000) - this.startLife;
    if (timeElapsed === 10 && MAX_ENEMIES < 5) {
      MAX_ENEMIES++;
      this.startLife = Math.floor(new Date() / 1000);
    }

    // if (timeElapsed === 5) {
    //   this.enemies.forEach(enemy => {
    //     enemy.speed = enemy.speed * SPEEDMULT;
    //     SPEEDMULT++;
    //   });
    // }
  };
  // checking if the player is dead and prompting "game Over"
  isPlayerDead = () => {
    let answer = false;
    let playerSpot = this.player.x / PLAYER_WIDTH;
    this.enemies.forEach(enemy => {
      if (
        enemy.spot === playerSpot &&
        enemy.y + ENEMY_HEIGHT > this.player.y &&
        enemy.y + ENEMY_HEIGHT < this.player.y + PLAYER_HEIGHT
      ) {
        answer = true;
      }
    });

    return answer;
  };

  removeAllImages = () => {
    let images = document.getElementsByTagName("img");
    let l = images.length;
    for (let i = 0; i < l; i++) {
      images[0].parentNode.removeChild(images[0]);
    }
  };

  removeScoreDiv = () => {
    this.scoreDiv.domElement.remove();
  };

  constructor(theRoot) {
    this.root = theRoot;
    this.score = 0;
    this.player = new Player(this.root);
    this.enemies = [];
    this.scoreDiv = new Text(this.root, 800, 0);
    this.startLife = Math.floor(new Date() / 1000);
    this.speedTimer = Math.floor(new Date() / 1000);
    addBackground(this.root);
  }
}
