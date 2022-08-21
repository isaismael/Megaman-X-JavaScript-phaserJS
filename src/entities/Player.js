class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvenst();
  }

  init() {
    this.gravity = 500;
    this.playerSpeed = 200;
    // Acá agregamos los inputs para los movimientos
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    //Animaciones Player
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('playeranims', {
        start: 0,
        end: 2,
      }),
      frameRate: 4,
      repeat: -1,
    })

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('playeranims', {
        start: 3,
        end: 9,
      }),
      frameRate: 5,
      repeat: 1,
    })

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('playeranims', {
        start: 11,
        end: 20,
      }),
      frameRate: 9,
      repeat: -1,
    })
    //Fin animaciones Player
  }

  initEvenst() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    const { left, right, space, up } = this.cursors;
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);

    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);

    } else {
      this.setVelocityX(0);
      this.anims.play('idle', true);
    }

    if ((space.isDown || up.isDown) && onFloor) {
      this.setVelocityY(-this.playerSpeed * 1.4)
    }

    onFloor ?
      this.body.velocity.x !== 0 ?
        this.play('run', true) : this.play('idle', true) :
      this.play('jump', true)
  }
}

export default Player;