class FastEnemy extends Enemy {
  constructor(theRoot, enemySpot) {
    super(theRoot, enemySpot, "madara.gif");
    this.speed = Math.random() / 2 + 0.5;
  }
}
