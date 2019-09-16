class SlowEnemy extends Enemy {
  constructor(theRoot, enemySpot) {
    super(theRoot, enemySpot, "meteore.gif");
    this.speed = Math.random() / 2 + 0.1;
  }
}
