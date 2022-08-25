class EnemyFly extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
      super(scene, x, y, 'enemyfly');
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.init();
      this.initEvenst();
    }
  
    init() {
      //this.gravity = 500;
      this.enemySpeed = 200;

      //this.body.setGravityY(this.gravity);
      this.setCollideWorldBounds(true);
  
      this.setOrigin(0.5, 1)

      this.scene.anims.create({
        key: 'enemie_idle',
        frames: this.scene.anims.generateFrameNumbers('enemyanims', {
          start: 0,
          end: 3,
        }),
        frameRate: 8,
        repeat: -1,
      })
    }
  
    initEvenst() {
      this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }
  
    update() {
      this.play('enemie_idle', true)
    }
}

export default EnemyFly;