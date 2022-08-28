import Enemy from "./Enemy.js";
import initAnims from "./anims/crusherAnims.js"

class Crusher extends Enemy{

  constructor(scene, x, y) {
    super(scene, x, y, 'crusher');
    initAnims(scene.anims);
  }

  update(time, delta) {
    super.update(time, delta);
    this.play('crusheranims', true);
  }
}

export default Crusher;
