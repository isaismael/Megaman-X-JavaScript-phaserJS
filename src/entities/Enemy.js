import collidable from "../mixins/collidable.js";

class Enemy extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Mixins
    Object.assign(this, collidable);

    this.init();
    this.initEvenst();
  }

  init() {
    this.gravity = 500;
    this.speed = 200;
    //
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true)
    //
    this.body.setOffset(0, 0)
    this.body.setSize(this.width, this.height)
    //
    this.setScale(1.5)
  }

  initEvenst() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time, delta) {
    this.setVelocityX(30);
  }

}

export default Enemy;